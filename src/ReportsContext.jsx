import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Create the context
const ReportsContext = createContext();

// Create the provider component
export const ReportsProvider = ({ children }) => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateReport = async (transcript) => {
        setIsLoading(true);
        setError(null);
        try {
            const jsonData = JSON.stringify(transcript);
            const response = await axios.post(
                "https://faaa56a6ddc6.ngrok-free.app/evaluate_json",
                jsonData,
                {
                    responseType: 'blob',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer YOUR_TOKEN_HERE',
                    },
                }
            );
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            setReports(prevReports => [...prevReports, url]);
        } catch (err) {
            console.error("Error generating report:", err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    // The value provided by the context
    const value = { reports, isLoading, error, generateReport };

    return (
        <ReportsContext.Provider value={value}>
            {children}
        </ReportsContext.Provider>
    );
};

// Create a custom hook to easily consume the context
export const useReports = () => {
    const context = useContext(ReportsContext);
    if (!context) {
        throw new Error('useReports must be used within a ReportsProvider');
    }
    return context;
};