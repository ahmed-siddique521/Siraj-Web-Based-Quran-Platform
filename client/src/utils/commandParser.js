const surahList = {
    "fatiha": 1,
    "al fatiha": 1,
    "baqarah": 2,
    "al baqarah": 2,
    "imran": 3,
    "al imran": 3,
    "nisa": 4,
    "an nisa": 4,
    "maidah": 5,
    "al maidah": 5,
    "anam": 6,
    "al anam": 6,
    "araf": 7,
    "al araf": 7,
    "anfal": 8,
    "al anfal": 8,
    "tawbah": 9,
    "at tawbah": 9,
    "yunus": 10,
    "hud": 11,
    "yusuf": 12,
    "ar rad": 13,
    "ibrahim": 14,
    "al hijr": 15,
    "nahl": 16,
    "al nahl": 16,
    "isra": 17,
    "al isra": 17,
    "kahf": 18,
    "al kahf": 18,
    "maryam": 19,
    "ta ha": 20,
    "anbiya": 21,
    "al anbiya": 21,
    "hajj": 22,
    "al hajj": 22,
    "muminun": 23,
    "al muminun": 23,
    "nur": 24,
    "an nur": 24,
    "furqan": 25,
    "al furqan": 25,
    "shuara": 26,
    "ash shuara": 26,
    "naml": 27,
    "an naml": 27,
    "qasas": 28,
    "al qasas": 28,
    "ankabut": 29,
    "al ankabut": 29,
    "rum": 30,
    "ar rum": 30,
    "luqman": 31,
    "as sajdah": 32,
    "ahzab": 33,
    "al ahzab": 33,
    "saba": 34,
    "fatir": 35,
    "ya seen": 36,
    "yaseen": 36,
    "as saffat": 37,
    "sad": 38,
    "az zumar": 39,
    "ghafir": 40,
    "fussilat": 41,
    "ash shura": 42,
    "zukhruf": 43,
    "ad dukhan": 44,
    "jathiyah": 45,
    "ahqaf": 46,
    "muhammad": 47,
    "fath": 48,
    "hujurat": 49,
    "qaf": 50,
    "dhariyat": 51,
    "tur": 52,
    "najm": 53,
    "qamar": 54,
    "rahman": 55,
    "ar rahman": 55,
    "waqiah": 56,
    "hadid": 57,
    "mujadilah": 58,
    "hashr": 59,
    "mumtahanah": 60,
    "saff": 61,
    "jumuah": 62,
    "munafiqun": 63,
    "taghabun": 64,
    "talaq": 65,
    "tahrim": 66,
    "mulk": 67,
    "al mulk": 67,
    "qalam": 68,
    "haqqah": 69,
    "maarij": 70,
    "nuh": 71,
    "jinn": 72,
    "muzzammil": 73,
    "muddaththir": 74,
    "qiyamah": 75,
    "insan": 76,
    "mursalat": 77,
    "naba": 78,
    "naziat": 79,
    "abasa": 80,
    "takwir": 81,
    "infitar": 82,
    "mutaffifin": 83,
    "inshiqaq": 84,
    "buruj": 85,
    "tariq": 86,
    "ala": 87,
    "ghashiyah": 88,
    "fajr": 89,
    "balad": 90,
    "shams": 91,
    "layl": 92,
    "duha": 93,
    "sharh": 94,
    "tin": 95,
    "alaq": 96,
    "qadr": 97,
    "bayyinah": 98,
    "zalzalah": 99,
    "adiyat": 100,
    "qariah": 101,
    "takathur": 102,
    "asr": 103,
    "humazah": 104,
    "fil": 105,
    "quraish": 106,
    "maun": 107,
    "kawthar": 108,
    "kafirun": 109,
    "nasr": 110,
    "masad": 111,
    "ikhlas": 112,
    "falaq": 113,
    "nas": 114
};

function parseCommand(command) {
    const text = command.toLowerCase().trim();

    let surah = null;
    let ayah = null;

    for (const name in surahList) {
        if (text.includes(name)) {
            surah = surahList[name];
            break;
        }
    }

    const ayahMatch = text.match(
        /(?:verse|ayah|ayat|aayat)\s*(\d+)/
    );

    if (ayahMatch) {
        ayah = parseInt(ayahMatch[1]);
    }

    if (!ayah) {
        const numberMatch = text.match(/\b(\d+)\b/);

        if (numberMatch) {
            ayah = parseInt(numberMatch[1]);
        }
    }

    return {
        surah,
        ayah,
        originalCommand: command
    };
}

export default parseCommand;