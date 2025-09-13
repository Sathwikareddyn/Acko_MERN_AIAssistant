import React, { useEffect, useRef, useState } from "react";
import { mockSentences } from "../mockData/mockSentences";
const useVoiceTranscription = (participants) => {
           
            const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState([]);
    const [liveTranscription, setLiveTranscription] = useState('');
    const [currentSpeaker, setCurrentSpeaker] = useState(participants[0].name);
    const recognitionRef = useRef(null);
    const isInterim = useRef(false);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("Web Speech API is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            console.log('Voice recognition started.');
            setIsRecording(true);
        };

        recognition.onend = () => {
            console.log('Voice recognition ended.');
            setIsRecording(false);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            setIsRecording(false);
        };

        recognition.onresult = (event) => {
            let finalTranscript = '';
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const result = event.results[i];
                if (result.isFinal) {
                    finalTranscript += result[0].transcript;
                } else {
                    interimTranscript += result[0].transcript;
                }
            }

            if (finalTranscript) {
                console.log('Final result received:', finalTranscript);
                // Assign to local user if they are speaking
                const user = participants.find(p => p.role === 'doctor');
                setTranscript(prev => [...prev, { speaker: user.name, text: finalTranscript }]);
            }
            if (interimTranscript) {
                console.log('Interim result received:', interimTranscript);
                setLiveTranscription(interimTranscript);
                const user = participants.find(p => p.role === 'doctor');
                setCurrentSpeaker(user.name);
            }
        };
        
        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [participants]);

    const startRecording = () => {
        if (recognitionRef.current && !isRecording) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error("Error starting recognition:", e);
            }
        }
    };

    const stopRecording = () => {
        if (recognitionRef.current && isRecording) {
            recognitionRef.current.stop();
        }
    };



            return { isRecording, transcript, liveTranscription, currentSpeaker, startRecording, stopRecording };
        };

export default useVoiceTranscription;