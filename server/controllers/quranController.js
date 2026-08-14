const axios = require("axios");

const getVerse = async (req, res) => {
    try {
        const {
            surah,
            startAyah,
            endAyah
        } = req.body;

        if (!surah || !startAyah) {
            return res.status(400).json({
                success: false,
                message: "Surah and starting ayah are required"
            });
        }

        const surahNumber = Number(surah);
        const start = Number(startAyah);
        const end = endAyah ? Number(endAyah) : null;

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
            !Number.isInteger(start) ||
            start < 1
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid starting ayah"
            });
        }

        if (
            end !== null &&
            (!Number.isInteger(end) || end < start)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid ending ayah"
            });
        }

        const response = await axios.get(
            `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani`
        );

        const editions = response.data.data;

        if (!editions || !Array.isArray(editions)) {
            return res.status(404).json({
                success: false,
                message: "Surah data not found"
            });
        }

        const surahData = editions[0];

        if (!surahData || !surahData.ayahs) {
            return res.status(404).json({
                success: false,
                message: "Surah ayahs not found"
            });
        }

        const selectedAyahs = surahData.ayahs.filter(
            (ayah) =>
                ayah.numberInSurah >= start &&
                (end === null || ayah.numberInSurah <= end)
        );

        if (selectedAyahs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Ayah not found"
            });
        }

        const verses = selectedAyahs.map((ayah) => ({
            ayah: ayah.numberInSurah,
            globalAyahNumber: ayah.number,
            arabicText: ayah.text,
            audioUrl:
                `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3`
        }));

        res.json({
            success: true,
            data: {
                surah: surahData.number,
                surahName: surahData.englishName,
                surahArabicName: surahData.name,
                startAyah: start,
                endAyah: end || selectedAyahs[selectedAyahs.length - 1].numberInSurah,
                verses
            }
        });

    } catch (error) {
        console.error(
            "Quran API Error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            success: false,
            message: "Unable to retrieve Quran verses"
        });
    }
};

module.exports = {
    getVerse
};