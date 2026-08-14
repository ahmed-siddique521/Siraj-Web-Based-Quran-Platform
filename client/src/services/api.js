import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

export const getVerse = async (surah, ayah) => {
    const response = await API.post("/quran/verse", {
        surah,
        ayah
    });

    return response.data;
};