const axios = require("axios");

const getVerse = async (req, res) => {
    try {
        const { surah, ayah } = req.body;

        if (!surah || !ayah) {
            return res.status(400).json({
                success: false,
                message: "Surah and ayah are required"
            });
        }

        const surahNumber = Number(surah);
        const ayahNumber = Number(ayah);

        if (
            !Number.isInteger(surahNumber) ||
            surahNumber < 1 ||
            surahNumber > 114
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid Surah number"
            });
        }

        if (
            !Number.isInteger(ayahNumber) ||
            ayahNumber < 1
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid Ayah number"
            });
        }

        const response = await axios.get(
            `https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/quran-uthmani`
        );

        const data = response.data.data;

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Verse not found"
            });
        }

        const audioUrl =
            `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${data.number}.mp3`;

        res.json({
            success: true,
            data: {
                surah: data.surah.number,
                surahName: data.surah.englishName,
                surahArabicName: data.surah.name,
                ayah: data.numberInSurah,
                globalAyahNumber: data.number,
                arabicText: data.text,
                audioUrl
            }
        });

    } catch (error) {
        console.error(
            "Quran API Error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            success: false,
            message: "Unable to retrieve Quran verse"
        });
    }
};

module.exports = {
    getVerse
};