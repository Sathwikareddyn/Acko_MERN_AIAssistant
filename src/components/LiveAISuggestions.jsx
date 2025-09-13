import { useEffect, useState } from "react";
import Loader from "./Loader";

const LiveAISuggestions = ({ questions, isGenerating, onUseQuestion, liveTranscription, currentSpeaker }) => {
            const [isEmergency, setIsEmergency] = useState(false);

            useEffect(() => {
                const lowerCaseText = liveTranscription.toLowerCase();
                const emergencyKeywords = ['emergency', 'critical', '911', 'help', 'code blue', 'heart attack'];
                const detected = emergencyKeywords.some(keyword => lowerCaseText.includes(keyword));
                setIsEmergency(detected);
            }, [liveTranscription]);

            return (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Suggestions</h3>
                    <div className="space-y-4">
                        {isEmergency && (
                            <div className="bg-red-100 p-4 rounded-lg flex items-center justify-between animate-pulse">
                                <span className="text-red-700 font-medium">Emergency detected!</span>
                                <button className="text-xs text-red-500 hover:text-red-600 font-bold" onClick={() => { console.log("Emergency alert triggered!"); }}>
                                    ACTIVATE PROTOCOL
                                </button>
                            </div>
                        )}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="text-sm font-semibold text-blue-800 mb-2">Suggested Questions</h4>
                            {isGenerating ? (
                                <Loader />
                            ) : (
                                <ul className="space-y-2 text-sm">
                                    {questions.length > 0 ? questions.map((q, index) => (
                                        <li key={index} className="p-2 bg-white rounded-lg border border-blue-200 flex items-start">
                                            <span className="flex-1 text-gray-700">{q}</span>
                                            <button
                                                onClick={() => onUseQuestion(q)}
                                                className="ml-2 flex-shrink-0 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors"
                                            >
                                                Use
                                            </button>
                                        </li>
                                    )) : (
                                        <p className="text-gray-500 italic">No questions generated yet.</p>
                                    )}
                                </ul>
                            )}
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h4 className="text-sm font-semibold text-gray-800 mb-2">Live Transcript Snippet</h4>
                            <p className="text-gray-600 text-sm italic">
                                <span className="font-bold text-gray-900">{currentSpeaker}:</span> {liveTranscription}...
                            </p>
                        </div>
                    </div>
                </div>
            );
        };

export default LiveAISuggestions;