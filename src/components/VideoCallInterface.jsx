import { useEffect, useRef } from "react";
import Mic from "../images/Mic.jsx";
import MicOff from "../images/MicOff.jsx";
import PhoneOff from "../images/PhoneOff.jsx";
import Video from "../images/Video.jsx";
import VideoOff from "../images/VideoOff.jsx";
import VideoFeed from "./VideoFeed.jsx";
/**
        * Renders the video call interface with participant video feeds and controls.
        */
const VideoCallInterface = ({ participants, onToggleAudio, onToggleVideo, onEndCall }) => {
    const localVideoRef = useRef(null);
    const localStreamRef = useRef(null);

    useEffect(() => {
        // Get user media and attach to local video element
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            })
            .catch(error => {
                console.error("Error accessing media devices.", error);
            });
    }, []);

    // Find the doctor and patient participants
    const doctor = participants.find(p => p.role === 'doctor');
    const patient = participants.find(p => p.role === 'patient');

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-full flex flex-col">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <VideoFeed participant={doctor} isLocal={true} onToggleAudio={onToggleAudio} onToggleVideo={onToggleVideo} streamRef={localVideoRef} />
                <VideoFeed participant={patient} isLocal={false} onToggleAudio={onToggleAudio} onToggleVideo={onToggleVideo} streamRef={localStreamRef} />
            </div>
            <div className="mt-4 flex justify-center">
                <button
                    onClick={onEndCall}
                    className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors duration-200"
                >
                    <PhoneOff className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};


        
export default VideoCallInterface;