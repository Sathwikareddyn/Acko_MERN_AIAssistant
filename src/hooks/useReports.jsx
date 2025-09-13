import { useState } from 'react';
import axios from 'axios';

export const useReports = () => {
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
            
            // Update the reports state with the new URL
            setReports(prevReports => [...prevReports, url]);
        } catch (err) {
            console.error("Error generating report:", err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Return the state and the functions needed by your components
    return { reports, isLoading, error, generateReport };
};