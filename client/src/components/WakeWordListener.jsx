import { useEffect, useRef, useState } from "react";

function WakeWordListener({ onCommand, isBusy }) {
    const recognitionRef = useRef(null);
    const shouldListenRef = useRef(true);
    const restartingRef = useRef(false);
    const commandModeRef = useRef(false);

    const [status, setStatus] = useState(
        'Listening for "Hello Siraj"...'
    );

    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setStatus(
                "Voice recognition is not supported in this browser."
            );
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
            setIsListening(true);
            restartingRef.current = false;

            if (!commandModeRef.current && !isBusy) {
                setStatus(
                    'Listening for "Hello Siraj"...'
                );
            }

            console.log("Speech recognition started");
        };

        recognition.onresult = (event) => {
            const result =
                event.results[event.results.length - 1];

            const transcript =
                result[0].transcript
                    .trim()
                    .toLowerCase();

            console.log("Heard:", transcript);

            // Ignore everything while Quran is playing
            if (isBusy || commandModeRef.current) {
                return;
            }

            // Wake word detected
            if (transcript.includes("hello siraj")) {
                console.log("HELLO SIRAJ DETECTED");

                commandModeRef.current = true;

                setStatus(
                    "🔵 Hello Siraj detected — looking for Quran command..."
                );

                // Stop wake-word recognition
                shouldListenRef.current = false;

                try {
                    recognition.stop();
                } catch (error) {
                    console.log(error);
                }

                // Extract command if it was spoken
                // together with the wake word
                const command = transcript
                    .replace("hello siraj", "")
                    .trim();

                if (command) {
                    console.log(
                        "Command spoken with wake word:",
                        command
                    );

                    onCommand(command);
                } else {
                    // Command will be spoken after wake word
                    listenForCommand(SpeechRecognition);
                }
            }
        };

        recognition.onerror = (event) => {
            console.log(
                "Speech recognition error:",
                event.error
            );

            if (event.error === "not-allowed") {
                shouldListenRef.current = false;

                setStatus(
                    "Microphone permission is required."
                );
            }
        };

        recognition.onend = () => {
            setIsListening(false);

            console.log("Speech recognition ended");

            if (
                shouldListenRef.current &&
                !commandModeRef.current &&
                !isBusy &&
                !restartingRef.current
            ) {
                restartingRef.current = true;

                setTimeout(() => {
                    try {
                        recognition.start();
                    } catch (error) {
                        console.log(
                            "Recognition restart error:",
                            error
                        );

                        restartingRef.current = false;
                    }
                }, 500);
            }
        };

        recognitionRef.current = recognition;

        // Start automatically
        try {
            recognition.start();
        } catch (error) {
            console.log(
                "Initial recognition error:",
                error
            );
        }

        return () => {
            shouldListenRef.current = false;

            try {
                recognition.stop();
            } catch (error) {
                console.log(error);
            }
        };
    }, [onCommand, isBusy]);

    const listenForCommand = (SpeechRecognition) => {
        const commandRecognition =
            new SpeechRecognition();

        commandRecognition.continuous = false;
        commandRecognition.interimResults = false;
        commandRecognition.lang = "en-US";

        commandRecognition.onstart = () => {
            setStatus(
                "🎤 Looking for Quran command..."
            );

            console.log(
                "Listening for Quran command..."
            );
        };

        commandRecognition.onresult = (event) => {
            const transcript =
                event.results[0][0].transcript
                    .trim();

            console.log(
                "Quran command detected:",
                transcript
            );

            setStatus(
                "⏳ Quran command received..."
            );

            // Send command to App
            onCommand(transcript);
        };

        commandRecognition.onerror = (event) => {
            console.log(
                "Command recognition error:",
                event.error
            );

            commandModeRef.current = false;

            setStatus(
                'Listening for "Hello Siraj"...'
            );

            startWakeWordRecognition();
        };

        commandRecognition.onend = () => {
            console.log(
                "Quran command recognition ended"
            );
        };

        try {
            commandRecognition.start();
        } catch (error) {
            console.log(
                "Command recognition start error:",
                error
            );
        }
    };

    const startWakeWordRecognition = () => {
        if (!recognitionRef.current) {
            return;
        }

        if (isBusy) {
            return;
        }

        commandModeRef.current = false;
        shouldListenRef.current = true;

        setStatus(
            'Listening for "Hello Siraj"...'
        );

        try {
            recognitionRef.current.start();
        } catch (error) {
            console.log(
                "Wake word restart error:",
                error
            );
        }
    };

    // When Quran playback finishes
    useEffect(() => {
        if (!isBusy) {
            startWakeWordRecognition();
        }
    }, [isBusy]);

    return (
        <div className="wake-word">

            <p>
                {status}
            </p>

        </div>
    );
}

export default WakeWordListener;