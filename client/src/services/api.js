import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
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