import { useState } from "react";

function VoiceButton({ onResult }) {
    const [listening, setListening] = useState(false);

    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert(
                "Speech recognition is not supported in this browser. Please use Google Chrome."
            );
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setListening(true);
        };

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;

            console.log("User said:", text);

            onResult(text);
        };

        recognition.onerror = (event) => {
            console.log("Speech recognition error:", event.error);
            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.start();
    };

    return (
        <button onClick={startListening}>
            {listening ? "🎙️ Listening..." : "🎤 Speak"}
        </button>
    );
}

export default VoiceButton;