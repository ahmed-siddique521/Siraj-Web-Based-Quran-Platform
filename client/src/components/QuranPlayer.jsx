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

        audio.src = verses[currentIndex].audioUrl;

        audio.play().catch((error) => {
            console.log(
                "Automatic playback blocked:",
                error
            );
        });

    }, [verses, currentIndex]);

    const handleEnded = () => {
        if (currentIndex < verses.length - 1) {
            setCurrentIndex((previous) => previous + 1);
        }
    };

    if (!verses || verses.length === 0) {
        return null;
    }

    const currentVerse = verses[currentIndex];

    return (
        <div className="quran-player">

            <h3>
                Playing Ayah {currentVerse.ayah}
            </h3>

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