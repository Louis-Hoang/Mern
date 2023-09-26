import * as React from "react";
import * as ReactDOM from "react-dom/client";
// import { UserStateProvider } from "./contexts/UserContext/UserContext";
import App from "./App.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
        {/* <UserStateProvider></UserStateProvider> */}
    </React.StrictMode>
);
