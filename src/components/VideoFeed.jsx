import Mic from "../images/Mic.jsx";
import Video from "../images/Video.jsx";
import MicOff from "../images/MicOff.jsx";
import VideoOff from "../images/VideoOff.jsx";

const VideoFeed = ({ participant, isLocal, onToggleAudio, onToggleVideo, streamRef }) => {
    return (
        <div className={`relative bg-gray-900 rounded-xl overflow-hidden aspect-video transition-all duration-300 ${participant.isSpeaking ? 'ring-4 ring-blue-500' : ''}`}>
            {isLocal ? (
                <video
                    ref={streamRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                <div className="absolute inset-0 bg-gray-800 text-white flex items-center justify-center text-3xl font-bold">
                    {participant.name.charAt(0)}
                </div>
            )}
            <div className="absolute top-2 left-2 bg-gray-800 bg-opacity-50 text-white text-sm px-2 py-1 rounded-full">{participant.name} ({participant.role})</div>
            <div className="absolute bottom-2 right-2 flex gap-2">
                <button
                    onClick={() => onToggleAudio(participant.id)}
                    className="p-2 rounded-full bg-gray-800 bg-opacity-70 text-white hover:bg-opacity-100 transition-all duration-200"
                >
                    {participant.isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5 text-red-500" />}
                </button>
                <button
                    onClick={() => onToggleVideo(participant.id)}
                    className="p-2 rounded-full bg-gray-800 bg-opacity-70 text-white hover:bg-opacity-100 transition-all duration-200"
                >
                    {participant.isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5 text-red-500" />}
                </button>
            </div>
        </div>
    );
};

export default VideoFeed;