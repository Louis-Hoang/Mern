import * as React from "react";
// import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; //use .min for production
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./assets/index.css";
import Navbar from "./layout/Navbar";

// import Root from "./pages/Root";

// import {
//     Root,
//     ErrorHandler,
//     Register,
//     Login,
//     Content,
//     UserInfo,
// } from "./pages";

import * as page from "./pages";
// import ErrorHandler from "./pages/ErrorHandler";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Content from "./pages/Content";
// import UserInfo from "./pages/UserInfo";

import ProtectedRoute from "./utils/ProtectedRoutes";

import { useState } from "react";
import { isLoggedIn, fetchUserData } from "./apis/UserAPI";

const App = () => {
    const [userState, setUserState] = useState(async () => {
        const res = await isLoggedIn();
        return setUserState({
            login: res.status,
            username: res.username,
            id: res.id,
        });
    });

    const handleLoginState = (bool, username, id) => {
        const newState = {
            ...userState,
            login: bool,
            username: username,
            id: id,
        };
        setUserState(newState);
    };

    const fetchUser = async (thumbSize) => {
        if (userState.id) {
            const res = await fetchUserData(userState.id, thumbSize);
            return res;
        }
        return null;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navbar status={userState} change={handleLoginState} />,
            loader: () => fetchUser(50),
            children: [
                {
                    path: "/", // yes, again
                    element: <page.Root />,
                    errorElement: <page.ErrorHandler />,
                },
                {
                    path: "/register",
                    element: <page.Register change={handleLoginState} />,
                },
                {
                    path: "/login",
                    element: <page.Login change={handleLoginState} />,
                },
                {
                    path: "/content",
                    element: (
                        <ProtectedRoute>
                            <page.Content />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/:username",
                    element: (
                        <ProtectedRoute>
                            <page.UserInfo user={userState} />
                        </ProtectedRoute>
                    ),
                    loader: () => fetchUser(200),
                },
            ],
        },
    ]);

    return (
        <RouterProvider router={router}>
            <Outlet />
        </RouterProvider>
    );
};

export default App;
