
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });

    const [expiresAt, setExpiresAt] = useState(() => {
        const stored = localStorage.getItem('expiresAt');
        return stored ? parseInt(stored, 10) : null;
    });

    useEffect(() => {
        if (!expiresAt) return;

        const now = Date.now();
        const remaining = expiresAt - now;

        if (remaining <= 0) {
            logout();
            return;
        }

        const timer = setTimeout(logout, remaining);
        return () => clearTimeout(timer);
    }, [expiresAt]);

    const login = (userData) => {
        const expiry = Date.now() + 30 * 60 * 1000; // 30 min
        setUser(userData);
        setExpiresAt(expiry);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('expiresAt', expiry.toString());
    };

    const logout = () => {
        setUser(null);
        setExpiresAt(null);
        localStorage.removeItem('user');
        localStorage.removeItem('expiresAt');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, expiresAt }}>
            {children}
        </AuthContext.Provider>
    );
};
