import React, { createContext, useState } from 'react';

const ContextToken = createContext();

const ContextTokenProvider = ({ children }) => {
    const [tokenContext, setTokenContext] = useState("");

    return (
        <ContextToken.Provider value={{ tokenContext, setTokenContext }}>
            {children}
        </ContextToken.Provider>
    );
};

export { ContextToken, ContextTokenProvider };