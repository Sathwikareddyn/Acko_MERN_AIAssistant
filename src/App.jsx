import React, { useEffect, useState } from "react";
import useVoiceTranscription from "./hooks/useVoiceTranscription";
import useAIQuestionGenerator from "./hooks/useAIQuestionGenerator";
import VideoCallInterface from "./components/VideoCallInterface";
import LiveTranscription from "./components/LiveTranscription";
import LiveAISuggestions from "./components/LiveAISuggestions";
import { mockParticipants } from "./mockData/mockParticipants";
import PatientInfo from "./components/PatientInfo";
import { mockPatient } from "./mockData/mockPatient";
import Stethoscope from "./images/Stethoscope";
import Users from "./images/Users";
import Calendar from "./images/Calendar";
import Clock from "./images/Clock";
            
const App = () => {
    const [sessionStatus, setSessionStatus] = useState('active');
            const [participants, setParticipants] = useState(mockParticipants);
            const [sessionStartTime] = useState(new Date());

            const {
                isRecording,
                transcript,
                liveTranscription,
                currentSpeaker,
                startRecording,
                stopRecording,
            } = useVoiceTranscription(participants);

            const { aiQuestions, isGenerating } = useAIQuestionGenerator(transcript);

            const handleEndCall = () => {
                stopRecording();
                setSessionStatus('completed');
            };

            const handleToggleAudio = (participantId) => {
                setParticipants(prev => prev.map(p =>
                    p.id === participantId ? { ...p, isAudioEnabled: !p.isAudioEnabled } : p
                ));
            };

            const handleToggleVideo = (participantId) => {
                setParticipants(prev => prev.map(p =>
                    p.id === participantId ? { ...p, isVideoEnabled: !p.isVideoEnabled } : p
                ));
            };

            const handleUseQuestion = (question) => {
                console.log('Using suggested question:', question);
            };

            const formatSessionDuration = () => {
                const now = new Date();
                const duration = Math.floor((now.getTime() - sessionStartTime.getTime()) / 1000 / 60);
                return `${duration} minutes`;
            };

            useEffect(() => {
                setParticipants(prev => prev.map(p => ({
                    ...p,
                    isSpeaking: p.name === currentSpeaker
                })));
            }, [currentSpeaker]);

            useEffect(() => {
                if (sessionStatus === 'active' && !isRecording) {
                    startRecording();
                }
            }, [sessionStatus, isRecording, startRecording]);

            return (
                <div className="min-h-screen bg-gray-50">
                    {/* Header */}
                    <div className="bg-white shadow-sm border-b border-gray-200">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center gap-3">
                                    <Stethoscope className="w-8 h-8 text-blue-600" />
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">MedConsult Live</h1>
                                        <p className="text-sm text-gray-600">AI-Powered Video Consultation Platform</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        <span>{participants.length} participants</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{sessionStartTime.toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>Duration: {formatSessionDuration()}</span>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        sessionStatus === 'active' ? 'bg-green-100 text-green-700' :
                                        sessionStatus === 'emergency' ? 'bg-red-100 text-red-700' :
                                        sessionStatus === 'connecting' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {sessionStatus.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[calc(100vh-140px)]">
                            {/* Left Column - Patient Info */}
                            <div className="lg:col-span-1">
                                <PatientInfo patient={mockPatient} />
                            </div>

                            {/* Middle Column - Video Call & Transcription */}
                            <div className="lg:col-span-2 flex flex-col space-y-6">
                                <VideoCallInterface
                                    participants={participants}
                                    onToggleAudio={handleToggleAudio}
                                    onToggleVideo={handleToggleVideo}
                                    onEndCall={handleEndCall}
                                />
                                <LiveTranscription
                                    transcript={transcript}
                                    liveTranscription={liveTranscription}
                                    currentSpeaker={currentSpeaker}
                                    isRecording={isRecording}
                                />
                            </div>

                            {/* Right Column - Live AI Suggestions */}
                            <div className="lg:col-span-1">
                                <LiveAISuggestions
                                    questions={aiQuestions}
                                    isGenerating={isGenerating}
                                    onUseQuestion={handleUseQuestion}
                                    liveTranscription={liveTranscription}
                                    currentSpeaker={currentSpeaker}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Emergency Alert Overlay */}
                    {sessionStatus === 'emergency' && (
                        <div className="fixed inset-0 bg-red-900 bg-opacity-75 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-2xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                                        <Stethoscope className="w-6 h-6 text-red-600 animate-pulse" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">EMERGENCY ALERT</h3>
                                        <p className="text-sm text-gray-600">Critical medical situation detected</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 mb-4">
                                    Emergency protocols activated. Medical team has been notified and emergency services contacted.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setSessionStatus('active')}
                                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                    >
                                        Acknowledge
                                    </button>
                                    <button
                                        onClick={handleEndCall}
                                        className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                    >
                                        End Call
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        };

export default App;