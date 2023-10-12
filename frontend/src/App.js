import * as React from "react";
// import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; //use .min for production
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./assets/index.css";

import { Navbar } from "./layout/Navbar";

import * as page from "./pages";
import { ProtectedRoutes } from "./utils";

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

    // const fetchUser = async (thumbSize) => {
    //     if (userState.id) {
    //         const res = await fetchUserData(userState.id, thumbSize);
    //         return res;
    //     }
    //     return null;
    // };

    const fetchUser = (thumbSize) => {
        //currying function
        return async () => {
            if (userState.id) {
                const res = await fetchUserData(userState.id, thumbSize);
                return res;
            }
            return null;
        };
    };
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navbar status={userState} change={handleLoginState} />,
            loader: fetchUser(50),
            children: [
                {
                    path: "/", // yes, again
                    element: <page.Root />,
                    errorElement: <page.ErrorHandler />,
                },
                {
                    path: "/register",
                    element: !userState.login ? (
                        <page.Register change={handleLoginState} />
                    ) : (
                        <Navigate to="/content" replace={true} />
                    ),
                },
                {
                    path: "/login",
                    element: !userState.login ? (
                        <page.Login change={handleLoginState} />
                    ) : (
                        <Navigate to="/content" replace={true} />
                    ),
                },
                {
                    path: "/content",
                    element: (
                        <ProtectedRoutes>
                            <page.Content />
                        </ProtectedRoutes>
                    ),
                },
                {
                    path: "/:username",
                    element: (
                        <ProtectedRoutes>
                            <page.UserInfo user={userState} />
                        </ProtectedRoutes>
                    ),
                    loader: fetchUser(200),
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
