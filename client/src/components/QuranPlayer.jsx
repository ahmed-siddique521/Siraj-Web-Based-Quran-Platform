import { useEffect, useRef, useState } from "react";

function QuranPlayer({ verses, onPlaybackChange }) {

    const audioRef = useRef(null);

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [isPlaying, setIsPlaying] =
        useState(false);


    // =========================================
    // RESET WHEN NEW VERSES ARRIVE
    // =========================================

    useEffect(() => {

        setCurrentIndex(0);

    }, [verses]);


    // =========================================
    // PLAY CURRENT AYAH
    // =========================================

    useEffect(() => {

        if (!verses || verses.length === 0) {
            return;
        }


        const audio =
            audioRef.current;

        if (!audio) {
            return;
        }


        const currentVerse =
            verses[currentIndex];


        if (!currentVerse) {
            return;
        }


        const audioUrl =
            `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${currentVerse.globalAyahNumber}.mp3`;


        console.log(
            "================================="
        );

        console.log(
            "QARI: Mishary Rashid Alafasy"
        );

        console.log(
            "CURRENT INDEX:",
            currentIndex
        );

        console.log(
            "AYAH:",
            currentVerse.ayah
        );

        console.log(
            "GLOBAL AYAH:",
            currentVerse.globalAyahNumber
        );

        console.log(
            "AUDIO URL:",
            audioUrl
        );

        console.log(
            "================================="
        );


        audio.pause();

        audio.src = audioUrl;

        audio.load();


        const handleCanPlay = async () => {

            try {

                await audio.play();

                setIsPlaying(true);

                onPlaybackChange(true);

                console.log(
                    "PLAYING AYAH:",
                    currentVerse.ayah
                );

            } catch (error) {

                console.error(
                    "AUDIO PLAY ERROR:",
                    error
                );

                setIsPlaying(false);

                onPlaybackChange(false);
            }
        };


        const handleError = () => {

            console.error(
                "AUDIO SOURCE ERROR:",
                audio.error
            );

            setIsPlaying(false);

            onPlaybackChange(false);
        };


        audio.addEventListener(
            "canplay",
            handleCanPlay
        );

        audio.addEventListener(
            "error",
            handleError
        );


        return () => {

            audio.removeEventListener(
                "canplay",
                handleCanPlay
            );

            audio.removeEventListener(
                "error",
                handleError
            );

        };

    }, [
        verses,
        currentIndex,
        onPlaybackChange
    ]);


    // =========================================
    // AYAH FINISHED
    // =========================================

    const handleEnded = () => {

        console.log(
            "AYAH FINISHED:",
            verses[currentIndex]?.ayah
        );


        if (
            currentIndex <
            verses.length - 1
        ) {

            const nextIndex =
                currentIndex + 1;


            console.log(
                "MOVING TO NEXT AYAH:",
                verses[nextIndex]?.ayah
            );


            setCurrentIndex(
                nextIndex
            );

        } else {

            console.log(
                "================================="
            );

            console.log(
                "QURAN RECITATION FINISHED"
            );

            console.log(
                "================================="
            );


            setIsPlaying(false);

            onPlaybackChange(false);
        }
    };


    // =========================================
    // NO VERSES
    // =========================================

    if (
        !verses ||
        verses.length === 0
    ) {
        return null;
    }


    const currentVerse =
        verses[currentIndex];


    return (
        <div className="quran-player">

            <h3>
                Now Playing
            </h3>


            <p>
                Qari: Mishary Rashid Alafasy
            </p>


            <p>
                Ayah: {currentVerse.ayah}
            </p>


            <audio
                ref={audioRef}
                controls
                onEnded={handleEnded}
            />


            <p>
                {currentIndex + 1} of{" "}
                {verses.length}
            </p>

        </div>
    );
}

export default QuranPlayer;