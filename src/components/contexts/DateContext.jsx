import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';

// Crear el contexto
const DateContext = createContext();

// Proveedor del contexto
export const DateProvider = ({ children }) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setDate(new Date());
    }, []);

    const updateDate = (newDate) => {
        setDate(newDate);
    };

    return (
        <DateContext.Provider value={{ date, updateDate }}>
            {children}
        </DateContext.Provider>
    );
};

// Hook para usar el contexto
export const useDate = () => {
    return useContext(DateContext);
};