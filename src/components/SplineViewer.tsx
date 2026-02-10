import React, { useRef, useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { Volume2, VolumeX } from "lucide-react";

export default function SplineViewer() {
    const spline = useRef<any>(null);
    const [isMuted, setIsMuted] = useState(false);

    function onLoad(splineApp: any) {
        spline.current = splineApp;
        console.log("Spline loaded", splineApp);
    }

    // Brute-force mute: Find all audio/video elements created by Spline and mute them
    useEffect(() => {
        const muteAllMedia = () => {
            const mediaElements = document.querySelectorAll("audio, video");
            mediaElements.forEach((el) => {
                // Type assertion to treat Element as HTMLMediaElement
                (el as HTMLMediaElement).muted = isMuted;
            });
        };

        // Run immediately when state changes
        muteAllMedia();

        // Also set up a MutationObserver to catch any new audio elements Spline might add later
        const observer = new MutationObserver(() => {
            muteAllMedia();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [isMuted]);

    function toggleAudio() {
        setIsMuted(!isMuted);
    }

    return (
        <div className="relative w-full h-screen">
            <Spline
                scene="https://prod.spline.design/VG3XFeiaQtFZaSOq/scene.splinecode"
                onLoad={onLoad}
                className="w-full h-full"
            />
            <button
                onClick={toggleAudio}
                className="absolute bottom-4 right-4 p-3 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full backdrop-blur-sm transition-all z-10"
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
        </div>
    );
}
