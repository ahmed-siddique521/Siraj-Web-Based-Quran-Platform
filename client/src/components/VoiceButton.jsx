import { useRef, useState } from "react";

function VoiceButton({ onResult }) {
    const [listening, setListening] = useState(false);

    const recognitionRef = useRef(null);

    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert(
                "Speech recognition is not supported in this browser."
            );
            return;
        }

        const recognition =
            new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognitionRef.current = recognition;

        recognition.onstart = () => {
            setListening(true);

            // Play recording-start sound
            const sound = new Audio(
                "/sounds/recording-start.mp3"
            );

            sound.volume = 0.7;

            sound.play().catch((error) => {
                console.log(
                    "Sound playback error:",
                    error
                );
            });

            console.log(
                "Voice recording started"
            );
        };

        recognition.onresult = (event) => {
            const transcript =
                event.results[0][0].transcript;

            console.log(
                "Voice command:",
                transcript
            );

            onResult(transcript);
        };

        recognition.onerror = (event) => {
            console.log(
                "Speech recognition error:",
                event.error
            );

            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);

            console.log(
                "Voice recording ended"
            );
        };

        try {
            recognition.start();
        } catch (error) {
            console.log(
                "Recognition start error:",
                error
            );
        }
    };

    return (
        <button
            className={`voice-button ${listening ? "listening" : ""
                }`}
            onClick={startListening}
        >
            {listening
                ? "🎙️ Listening..."
                : "🎙️ Speak"}
        </button>
    );
}

export default VoiceButton;