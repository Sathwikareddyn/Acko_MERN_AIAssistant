import React, { useRef, useState } from "react";
import { mockSentences } from "../mockData/mockSentences";
const useVoiceTranscription = (participants) => {
            const [isRecording, setIsRecording] = useState(false);
            const [transcript, setTranscript] = useState([]);
            const [liveTranscription, setLiveTranscription] = useState('');
            const [currentSpeaker, setCurrentSpeaker] = useState(participants[0].name);
            const intervalRef = useRef(null);
            const sentenceIndexRef = useRef(0);

            const startRecording = () => {
                if (isRecording) return;
                setIsRecording(true);
                const interval = setInterval(() => {
                    if (sentenceIndexRef.current >= mockSentences.length) {
                        setTranscript(prev => [...prev, { speaker: "Dr. Michael Chen", text: "This is the end of the mock conversation. I'm stopping the recording now." }]);
                        stopRecording();
                        return;
                    }
                    const nextSentence = mockSentences[sentenceIndexRef.current];
                    setCurrentSpeaker(nextSentence.speaker);
                    setLiveTranscription(nextSentence.text.substring(0, Math.floor(Math.random() * (nextSentence.text.length - 5) + 5)));
                    if (Math.random() > 0.6) {
                        setTranscript(prev => [...prev, nextSentence]);
                        sentenceIndexRef.current++;
                        setLiveTranscription('');
                    }
                }, 1000);
                intervalRef.current = interval;
            };

            const stopRecording = () => {
                if (!isRecording) return;
                clearInterval(intervalRef.current);
                setIsRecording(false);
                setLiveTranscription('');
            };

            return { isRecording, transcript, liveTranscription, currentSpeaker, startRecording, stopRecording };
        };

export default useVoiceTranscription;