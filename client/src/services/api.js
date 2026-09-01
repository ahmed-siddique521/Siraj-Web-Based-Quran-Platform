
import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const getVerse = async (
    surah,
    startAyah,
    endAyah
) => {
    const response = await API.post("/quran/verse", {
        surah,
        startAyah,
        endAyah
    });

    return response.data;
};
