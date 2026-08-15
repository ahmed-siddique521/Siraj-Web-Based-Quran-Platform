import { useEffect, useRef, useState } from "react";

function WakeWordListener({ onCommand, isBusy }) {
    const recognitionRef = useRef(null);

    const commandRecognitionRef = useRef(null);

    const shouldListenRef = useRef(true);

    const isRunningRef = useRef(false);

    const commandModeRef = useRef(false);

    const restartingRef = useRef(false);

    const isBusyRef = useRef(isBusy);

    const onCommandRef = useRef(onCommand);

    const restartTimerRef = useRef(null);

    const [status, setStatus] = useState(
        'Listening for "Siraj"...'
    );

    const [isListening, setIsListening] =
        useState(false);


    // =========================================
    // KEEP LATEST VALUES IN REFS
    // =========================================

    useEffect(() => {
        isBusyRef.current = isBusy;
    }, [isBusy]);


    useEffect(() => {
        onCommandRef.current = onCommand;
    }, [onCommand]);


    // =========================================
    // MAIN SPEECH RECOGNITION
    // =========================================

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


        const recognition =
            new SpeechRecognition();


        recognition.continuous = true;

        recognition.interimResults = false;

        recognition.lang = "en-US";


        recognitionRef.current =
            recognition;


        // =====================================
        // START
        // =====================================

        recognition.onstart = () => {

            isRunningRef.current = true;

            restartingRef.current = false;

            setIsListening(true);


            if (
                !commandModeRef.current &&
                !isBusyRef.current
            ) {

                setStatus(
                    'Listening for "Siraj"...'
                );
            }


            console.log(
                "WAKE WORD RECOGNITION STARTED"
            );
        };


        // =====================================
        // RESULT
        // =====================================

        recognition.onresult = (event) => {

            const result =
                event.results[
                event.results.length - 1
                ];


            if (!result) {
                return;
            }


            const transcript =
                result[0].transcript
                    .trim()
                    .toLowerCase();


            console.log(
                "Heard:",
                transcript
            );


            // ---------------------------------
            // Ignore while busy
            // ---------------------------------

            if (
                isBusyRef.current ||
                commandModeRef.current
            ) {

                return;
            }


            // ---------------------------------
            // Detect Siraj
            // ---------------------------------

            if (
                transcript.includes("siraj")
            ) {

                console.log(
                    "SIRAJ DETECTED"
                );


                commandModeRef.current =
                    true;


                shouldListenRef.current =
                    false;


                setStatus(
                    "🔵 Siraj detected — looking for Quran command..."
                );


                // Stop wake word recognition

                if (
                    isRunningRef.current
                ) {

                    try {

                        recognition.stop();

                    } catch (error) {

                        console.log(
                            "Wake word stop error:",
                            error
                        );
                    }
                }


                // ---------------------------------
                // Check if command was spoken
                // together with Siraj
                // ---------------------------------

                const command =
                    transcript
                        .replace(
                            "siraj",
                            ""
                        )
                        .trim();


                if (command) {

                    console.log(
                        "Command spoken with wake word:",
                        command
                    );


                    onCommandRef.current(
                        command
                    );

                } else {

                    // User will speak command
                    // after Siraj

                    startCommandRecognition(
                        SpeechRecognition
                    );
                }
            }
        };


        // =====================================
        // ERROR
        // =====================================

        recognition.onerror = (event) => {

            console.log(
                "Wake word recognition error:",
                event.error
            );


            isRunningRef.current =
                false;


            setIsListening(false);


            // Permission denied

            if (
                event.error ===
                "not-allowed"
            ) {

                shouldListenRef.current =
                    false;


                setStatus(
                    "Microphone permission is required."
                );


                return;
            }


            // Ignore normal speech recognition
            // errors and allow automatic restart

            if (
                event.error ===
                "aborted"
            ) {

                return;
            }
        };


        // =====================================
        // END
        // =====================================

        recognition.onend = () => {

            isRunningRef.current =
                false;


            setIsListening(false);


            console.log(
                "Wake word recognition ended"
            );


            // Do NOT restart if:

            // 1. Quran is playing
            // 2. Command mode is active
            // 3. We intentionally stopped it

            if (
                !shouldListenRef.current ||
                commandModeRef.current ||
                isBusyRef.current
            ) {

                console.log(
                    "Wake word recognition will NOT restart"
                );

                return;
            }


            restartWakeWord();
        };


        // =====================================
        // INITIAL START
        // =====================================

        shouldListenRef.current =
            true;


        commandModeRef.current =
            false;


        // Give browser microphone a moment

        restartTimerRef.current =
            setTimeout(() => {

                startWakeWord();

            }, 500);


        // =====================================
        // CLEANUP
        // =====================================

        return () => {

            shouldListenRef.current =
                false;


            isRunningRef.current =
                false;


            if (
                restartTimerRef.current
            ) {

                clearTimeout(
                    restartTimerRef.current
                );

            }


            if (
                commandRecognitionRef.current
            ) {

                try {

                    commandRecognitionRef.current.stop();

                } catch (error) { }

                commandRecognitionRef.current =
                    null;
            }


            try {

                recognition.stop();

            } catch (error) { }


            recognitionRef.current =
                null;
        };

    }, []);


    // =========================================
    // START WAKE WORD
    // =========================================

    const startWakeWord = () => {

        const recognition =
            recognitionRef.current;


        if (!recognition) {
            return;
        }


        if (
            !shouldListenRef.current
        ) {

            return;
        }


        if (
            commandModeRef.current
        ) {

            return;
        }


        if (
            isBusyRef.current
        ) {

            return;
        }


        if (
            isRunningRef.current
        ) {

            return;
        }


        try {

            console.log(
                "Starting wake word recognition..."
            );


            recognition.start();

        } catch (error) {

            console.log(
                "Wake word start error:",
                error
            );


            isRunningRef.current =
                false;


            // Retry if browser rejected
            // because recognition was not ready

            restartWakeWord();
        }
    };


    // =========================================
    // AUTOMATIC RESTART
    // =========================================

    const restartWakeWord = () => {

        if (
            restartingRef.current
        ) {

            return;
        }


        if (
            !shouldListenRef.current ||
            commandModeRef.current ||
            isBusyRef.current
        ) {

            return;
        }


        restartingRef.current =
            true;


        restartTimerRef.current =
            setTimeout(() => {

                restartingRef.current =
                    false;


                startWakeWord();

            }, 700);
    };


    // =========================================
    // COMMAND RECOGNITION
    // =========================================

    const startCommandRecognition =
        (SpeechRecognition) => {

            console.log(
                "Starting Quran command recognition..."
            );


            // Make sure an old command listener
            // isn't still active

            if (
                commandRecognitionRef.current
            ) {

                try {

                    commandRecognitionRef.current.stop();

                } catch (error) { }

            }


            const commandRecognition =
                new SpeechRecognition();


            commandRecognition.continuous =
                false;


            commandRecognition.interimResults =
                false;


            commandRecognition.lang =
                "en-US";


            commandRecognitionRef.current =
                commandRecognition;


            commandRecognition.onstart =
                () => {

                    setStatus(
                        "🎤 Looking for Quran command..."
                    );


                    console.log(
                        "Quran command recognition started"
                    );
                };


            commandRecognition.onresult =
                (event) => {

                    const transcript =
                        event.results[0][0]
                            .transcript
                            .trim();


                    console.log(
                        "Quran command detected:",
                        transcript
                    );


                    setStatus(
                        "⏳ Quran command received..."
                    );


                    // Send command to App

                    onCommandRef.current(
                        transcript
                    );
                };


            commandRecognition.onerror =
                (event) => {

                    console.log(
                        "Quran command recognition error:",
                        event.error
                    );


                    commandModeRef.current =
                        false;


                    commandRecognitionRef.current =
                        null;


                    setStatus(
                        'Listening for "Siraj"...'
                    );


                    shouldListenRef.current =
                        true;


                    restartWakeWord();
                };


            commandRecognition.onend =
                () => {

                    console.log(
                        "Quran command recognition ended"
                    );


                    commandRecognitionRef.current =
                        null;


                    // If command was successfully
                    // sent, App will become busy
                    // once verses are fetched.

                    if (
                        !isBusyRef.current
                    ) {

                        commandModeRef.current =
                            false;


                        shouldListenRef.current =
                            true;


                        setStatus(
                            'Listening for "Siraj"...'
                        );


                        restartWakeWord();
                    }
                };


            try {

                commandRecognition.start();

            } catch (error) {

                console.log(
                    "Command recognition start error:",
                    error
                );


                commandModeRef.current =
                    false;


                shouldListenRef.current =
                    true;


                restartWakeWord();
            }
        };


    // =========================================
    // HANDLE BUSY STATE
    // =========================================

    useEffect(() => {

        isBusyRef.current =
            isBusy;


        if (isBusy) {

            console.log(
                "Quran is playing — disabling wake word"
            );


            shouldListenRef.current =
                false;


            commandModeRef.current =
                false;


            // Stop wake recognition

            if (
                recognitionRef.current &&
                isRunningRef.current
            ) {

                try {

                    recognitionRef.current.stop();

                } catch (error) { }

            }


            // Stop command recognition

            if (
                commandRecognitionRef.current
            ) {

                try {

                    commandRecognitionRef.current.stop();

                } catch (error) { }

            }


            setStatus(
                "🔊 Reciting Quran..."
            );


        } else {

            // Quran finished

            console.log(
                "Quran finished — activating Siraj"
            );


            commandModeRef.current =
                false;


            shouldListenRef.current =
                true;


            setStatus(
                'Listening for "Siraj"...'
            );


            restartWakeWord();
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