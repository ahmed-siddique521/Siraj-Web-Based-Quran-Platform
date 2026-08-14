import { useEffect, useRef, useState } from "react";
import VoiceButton from "./components/VoiceButton";
import parseCommand from "./utils/commandParser";
import { getVerse } from "./services/api";

function App() {
  const [command, setCommand] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const audioRef = useRef(null);

  const handleVoiceResult = async (text) => {
    setCommand(text);
    setError("");
    setResult(null);

    const parsedCommand = parseCommand(text);

    if (!parsedCommand.surah || !parsedCommand.ayah) {
      setError(
        "Please say a valid Surah and Ayah number."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await getVerse(
        parsedCommand.surah,
        parsedCommand.ayah
      );

      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error(error);

      setError(
        "Could not retrieve the Quran verse."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!result?.audioUrl || !audioRef.current) {
      return;
    }

    audioRef.current.src = result.audioUrl;

    audioRef.current
      .play()
      .catch((error) => {
        console.log(
          "Automatic playback was blocked:",
          error
        );
      });
  }, [result]);

  return (
    <div className="app">

      <h1>Voice Quran</h1>

      <p>
        Speak the Surah and Ayah you want to listen to.
      </p>

      <VoiceButton
        onResult={handleVoiceResult}
      />

      {command && (
        <div>
          <h2>You said:</h2>

          <p>
            {command}
          </p>
        </div>
      )}

      {loading && (
        <p>
          Getting Quran verse...
        </p>
      )}

      {error && (
        <p>
          {error}
        </p>
      )}

      {result && (
        <div className="verse">

          <h2>
            {result.surahName}
          </h2>

          <p>
            Ayah {result.ayah}
          </p>

          <div className="arabic">
            {result.arabicText}
          </div>

          <audio
            ref={audioRef}
            controls
          >
            Your browser does not support audio.
          </audio>

        </div>
      )}

    </div>
  );
}

export default App;