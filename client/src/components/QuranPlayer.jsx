import { useEffect, useRef, useState } from "react";

function QuranPlayer({ verses }) {
    const audioRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setCurrentIndex(0);
    }, [verses]);

    useEffect(() => {
        if (!verses || verses.length === 0) {
            return;
        }

        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        const currentVerse = verses[currentIndex];

        if (!currentVerse) {
            return;
        }

        const audioUrl =
            `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${currentVerse.globalAyahNumber}.mp3`;

        console.log("QARI: Mishary Rashid Alafasy");
        console.log("GLOBAL AYAH:", currentVerse.globalAyahNumber);
        console.log("AUDIO URL:", audioUrl);

        audio.src = audioUrl;

        audio.load();

        audio.oncanplay = () => {
            audio.play()
                .then(() => {
                    console.log("AUDIO PLAYING");
                })
                .catch((error) => {
                    console.log("AUDIO PLAY ERROR:", error);
                });
        };

        return () => {
            audio.oncanplay = null;
        };

    }, [verses, currentIndex]);

    const handleEnded = () => {
        if (currentIndex < verses.length - 1) {
            setCurrentIndex(
                (previous) => previous + 1
            );
        }
    };

    if (!verses || verses.length === 0) {
        return null;
    }

    const currentVerse = verses[currentIndex];

    return (
        <div className="quran-player">

            <h3>Now Playing</h3>

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
                {currentIndex + 1} of {verses.length}
            </p>

        </div>
    );
}

export default QuranPlayer;