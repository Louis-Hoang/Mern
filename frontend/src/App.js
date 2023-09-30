import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"; //use .min for production
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./assets/index.css";
import Navbar from "./components/Navbar";
import Root from "./pages/Root/Root";
import ErrorPage from "./pages/ErrorHandler/error-page";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Content from "./pages/Content/Content";
import UserInfo from "./pages/UserInfo/UserInfo";
import ProtectedRoute from "./utils/ProtectedRoutes/ProtectedRoutes";

import { useState } from "react";
import { isLoggedIn } from "./apis/UserAPI";

const App = () => {
    const [userState, setUserState] = useState(async () => {
        const res = await isLoggedIn();
        return setUserState({ username: res.username, login: res.status });
    });

    const handleState = (bool, credential) => {
        const newState = { ...userState, login: bool, username: credential };
        setUserState(newState);
    };
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navbar status={userState} change={handleState} />,
            children: [
                {
                    path: "/", // yes, again
                    element: <Root />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "/register",
                    element: <Register />,
                },
                {
                    path: "/login",
                    element: <Login change={handleState} />,
                },
                {
                    path: "/content",
                    element: (
                        <ProtectedRoute>
                            <Content />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/:username",
                    element: (
                        <ProtectedRoute>
                            <UserInfo />
                        </ProtectedRoute>
                    ),
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
