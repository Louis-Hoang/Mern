import React, { createContext, useContext, useState } from "react";

// Create a context for your global state
const UserStateContext = createContext();

// Create a provider component that will wrap your app
export const UserStateProvider = ({ children }) => {
    const [userState, setUserState] = useState(false);

    return (
        <UserStateContext.Provider value={{ userState, setUserState }}>
            {children}
        </UserStateContext.Provider>
    );
};

// Custom hook to easily access the global state anywhere in your app
export const useUserState = () => {
    const context = useContext(UserStateContext);
    if (!context) {
        throw new Error("useUserState must be used within a UserStateProvider");
    }
    return context;
};
