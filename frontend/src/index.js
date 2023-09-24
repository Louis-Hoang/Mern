import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css"; //use .min for production
import "bootstrap/dist/js/bootstrap.bundle.js";

import NavbarComp from "./components/Navbar";
import Root from "./pages/Root/Root";
import ErrorPage from "./pages/ErrorHandler/error-page";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Content from "./pages/Content/Content";

import ProtectedRoute from "./utils/ProtectedRoutes/ProtectedRoutes";
const router = createBrowserRouter([
    {
        path: "/*",
        element: <Root />,
        errorElement: <ErrorPage />,
        // children: [
        //     {
        //         path: "contacts/:contactId",
        //         element: <Contact />,
        //     },
        // ],
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/content",
        element: (
            <ProtectedRoute>
                <Content />
            </ProtectedRoute>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <NavbarComp />
        <RouterProvider router={router} />
    </React.StrictMode>
);
