import { useState } from "react";
import VoiceButton from "./components/VoiceButton";
import QuranPlayer from "./components/QuranPlayer";
import parseCommand from "./utils/commandParser";
import { getVerse } from "./services/api";

function App() {
  const [command, setCommand] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVoiceResult = async (text) => {
    setCommand(text);
    setError("");
    setResult(null);

    const parsedCommand = parseCommand(text);

    console.log("Parsed command:", parsedCommand);

    if (
      !parsedCommand.surah ||
      !parsedCommand.startAyah
    ) {
      setError(
        "Please say a valid Surah and Ayah number."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await getVerse(
        parsedCommand.surah,
        parsedCommand.startAyah,
        parsedCommand.endAyah
      );

      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.message);
      }

    } catch (error) {
      console.error(error);

      setError(
        "Could not retrieve the Quran verses."
      );
    } finally {
      setLoading(false);
    }
  };

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

          <p>{command}</p>
        </div>
      )}

      {loading && (
        <p>
          Getting Quran verses...
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
            Ayah {result.startAyah}
            {result.endAyah !== result.startAyah &&
              ` - ${result.endAyah}`}
          </p>

          {result.verses.map((verse) => (
            <div
              key={verse.ayah}
              className="ayah"
            >
              <p>
                Ayah {verse.ayah}
              </p>

              <div className="arabic">
                {verse.arabicText}
              </div>
            </div>
          ))}

          <QuranPlayer
            verses={result.verses}
          />

        </div>
      )}

    </div>
  );
}

export default App;