/**
        * Displays the live and completed transcription of the call.
        */
        const LiveTranscription = ({ transcript, liveTranscription, currentSpeaker, isRecording }) => (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Transcription</h3>
                <div className="h-48 overflow-y-auto text-sm text-gray-700 space-y-2">
                    {transcript.map((line, index) => (
                        <div key={index} className="text-sm text-gray-700">
                            <span className="font-bold text-blue-600 mr-1">{line.speaker}:</span>
                            <span>{line.text}</span>
                        </div>
                    ))}
                    {isRecording && liveTranscription && (
                        <div className="text-sm text-gray-500 animate-pulse">
                            <span className="font-bold text-gray-800 mr-1">{currentSpeaker}:</span>
                            <span>{liveTranscription}...</span>
                        </div>
                    )}
                </div>
            </div>
        );

export default LiveTranscription;