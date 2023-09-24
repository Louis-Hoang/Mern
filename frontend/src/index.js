import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/index.css";
import Root from "./routes/root";
import ErrorPage from "./pages/ErrorHandler/error-page";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Content from "./pages/Content/Content";
import Contact from "./routes/contact";
import ProtectedRoute from "./utils/ProtectedRoutes/ProtectedRoutes";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "contacts/:contactId",
                element: <Contact />,
            },
        ],
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
        <RouterProvider router={router} />
    </React.StrictMode>
);
