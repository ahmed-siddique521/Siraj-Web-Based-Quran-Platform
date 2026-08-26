const surahList = {
    "fatiha": 1,
    "al fatiha": 1,
    "alfatiha": 1,

    "baqarah": 2,
    "baqara": 2,
    "baqrah": 2,
    "baqra": 2,
    "al baqarah": 2,
    "al baqara": 2,

    "imran": 3,
    "imraan": 3,
    "al imran": 3,
    "al imraan": 3,
    "aal imran": 3,
    "aal e imran": 3,

    "nisa": 4,
    "nisah": 4,
    "nisaa": 4,
    "an nisa": 4,
    "an nisaa": 4,

    "maidah": 5,
    "maida": 5,
    "maida": 5,
    "al maidah": 5,
    "al maida": 5,

    "anam": 6,
    "anaam": 6,
    "al anam": 6,
    "al anaam": 6,

    "araf": 7,
    "araaf": 7,
    "al araf": 7,
    "al araaf": 7,

    "anfal": 8,
    "al anfal": 8,

    "tawbah": 9,
    "taubah": 9,
    "toba": 9,
    "at tawbah": 9,

    "yunus": 10,
    "younus": 10,
    "younis": 10,
    "yunis": 10,

    "hud": 11,

    "yusuf": 12,
    "yoosuf": 12,
    "yousuf": 12,

    "rad": 13,
    "raad": 13,
    "ar rad": 13,
    "ar raad": 13,

    "ibrahim": 14,
    "ibraheem": 14,
    "ibrahim": 14,

    "hijr": 15,
    "hijar": 15,
    "al hijr": 15,

    "nahl": 16,
    "an nahl": 16,

    "isra": 17,
    "al isra": 17,
    "bani israel": 17,
    "bani israeel": 17,

    "kahf": 18,
    "kaahf": 18,
    "kahaf": 18,
    "al kahf": 18,

    "maryam": 19,
    "mariam": 19,

    "taha": 20,
    "ta ha": 20,
    "taaha": 20,

    "anbiya": 21,
    "anbiyaa": 21,
    "al anbiya": 21,

    "hajj": 22,
    "haj": 22,
    "al hajj": 22,

    "muminun": 23,
    "muminoon": 23,
    "mominoon": 23,
    "mominun": 23,
    "al muminun": 23,

    "nur": 24,
    "noor": 24,
    "an nur": 24,
    "an noor": 24,

    "furqan": 25,
    "furqaan": 25,
    "al furqan": 25,

    "shuara": 26,
    "shoara": 26,
    "ash shuara": 26,

    "naml": 27,
    "an naml": 27,

    "qasas": 28,
    "qasas": 28,
    "al qasas": 28,

    "ankabut": 29,
    "ankaboot": 29,
    "al ankabut": 29,

    "rum": 30,
    "room": 30,
    "ar rum": 30,

    "luqman": 31,
    "lokman": 31,

    "sajdah": 32,
    "sajda": 32,
    "as sajdah": 32,

    "ahzab": 33,
    "ahzaab": 33,
    "al ahzab": 33,

    "saba": 34,
    "sabaa": 34,

    "fatir": 35,
    "faatir": 35,

    "yaseen": 36,
    "yasin": 36,
    "ya seen": 36,
    "ya sin": 36,
    "yaaseen": 36,
    "yaasin": 36,
    "yasin": 36,

    "saffat": 37,
    "as saffat": 37,

    "sad": 38,
    "saad": 38,

    "zumar": 39,
    "az zumar": 39,

    "ghafir": 40,
    "gaafir": 40,
    "momin": 40,
    "mumin": 40,
    "al mumin": 40,

    "fussilat": 41,
    "fussilat": 41,

    "shura": 42,
    "ash shura": 42,

    "zukhruf": 43,
    "zukhraf": 43,

    "dukhan": 44,
    "ad dukhan": 44,

    "jathiyah": 45,
    "jasiya": 45,

    "ahqaf": 46,
    "ahqaaf": 46,

    "muhammad": 47,
    "mohammad": 47,

    "fath": 48,
    "al fath": 48,

    "hujurat": 49,
    "hujraat": 49,

    "qaf": 50,
    "qaaf": 50,

    "dhariyat": 51,
    "zariyat": 51,
    "dhariyaat": 51,

    "tur": 52,
    "toor": 52,

    "najm": 53,

    "qamar": 54,

    "rahman": 55,
    "rehman": 55,
    "rahmaan": 55,
    "rehmaan": 55,
    "ar rahman": 55,
    "ar rehman": 55,
    "ar rahmaan": 55,
    "ar rehmaan": 55,

    "waqiah": 56,
    "waqia": 56,
    "waqiya": 56,
    "waqiah": 56,

    "hadid": 57,
    "hadeed": 57,

    "mujadilah": 58,
    "mujadila": 58,

    "hashr": 59,
    "al hashr": 59,

    "mumtahanah": 60,
    "mumtahina": 60,

    "saff": 61,
    "as saff": 61,

    "jumuah": 62,
    "jummah": 62,
    "jumma": 62,
    "juma": 62,

    "munafiqun": 63,
    "munafiqoon": 63,

    "taghabun": 64,
    "taghaabun": 64,

    "talaq": 65,
    "talaaq": 65,

    "tahrim": 66,
    "tahreem": 66,

    "mulk": 67,
    "al mulk": 67,

    "qalam": 68,

    "haqqah": 69,
    "haqqa": 69,

    "maarij": 70,
    "marij": 70,

    "nuh": 71,
    "nooh": 71,

    "jinn": 72,
    "jin": 72,

    "muzzammil": 73,
    "muzammil": 73,

    "muddaththir": 74,
    "mudassir": 74,
    "muddassir": 74,

    "qiyamah": 75,
    "qiyama": 75,
    "qiyamat": 75,

    "insan": 76,
    "insaan": 76,

    "mursalat": 77,

    "naba": 78,
    "nabae": 78,

    "naziat": 79,
    "naziyat": 79,

    "abasa": 80,
    "abasa": 80,

    "takwir": 81,

    "infitar": 82,

    "mutaffifin": 83,

    "inshiqaq": 84,

    "buruj": 85,
    "burooj": 85,

    "tariq": 86,
    "taariq": 86,

    "ala": 87,
    "aala": 87,

    "ghashiyah": 88,
    "ghashia": 88,

    "fajr": 89,

    "balad": 90,

    "shams": 91,

    "layl": 92,
    "lail": 92,
    "leil": 92,

    "duha": 93,
    "doha": 93,

    "sharh": 94,
    "inshirah": 94,
    "alam nashrah": 94,

    "tin": 95,

    "alaq": 96,
    "alaq": 96,

    "qadr": 97,
    "qadar": 97,

    "bayyinah": 98,
    "bayyinah": 98,

    "zalzalah": 99,
    "zalzala": 99,

    "adiyat": 100,

    "qariah": 101,
    "qariyah": 101,

    "takathur": 102,
    "takasur": 102,

    "asr": 103,

    "humazah": 104,
    "humaza": 104,

    "fil": 105,
    "feel": 105,

    "quraish": 106,
    "quraysh": 106,

    "maun": 107,
    "maooun": 107,

    "kawthar": 108,
    "kausar": 108,
    "kousar": 108,

    "kafirun": 109,
    "kaafiroon": 109,
    "kafiroon": 109,

    "nasr": 110,

    "masad": 111,
    "lahab": 111,
    "tabbat": 111,

    "ikhlas": 112,
    "ikhlaas": 112,

    "falaq": 113,
    "falaq": 113,

    "nas": 114,
    "naas": 114,
    "naas": 114,
    "an nas": 114,
    "an naas": 114,
    "annas": 114
};


function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/[?,.!]/g, " ")
        .replace(/[-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}


function normalizeSurahName(name) {
    return name
        .toLowerCase()
        .replace(/[-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}


function parseCommand(command) {

    const text = normalizeText(command);

    let surah = null;
    let surahName = null;
    let startAyah = null;
    let endAyah = null;
    let type = null;
    let onwards = false;


    // =========================================
    // REMOVE COMMAND WORDS
    // =========================================

    const cleanedText = text
        .replace(/\bsurah\b/g, " ")
        .replace(/\bsurat\b/g, " ")
        .replace(/\bquran\b/g, " ")
        .replace(/\bthe\b/g, " ")
        .replace(/\s+/g, " ")
        .trim();


    // =========================================
    // SURAH DETECTION
    // =========================================

    const sortedSurahs =
        Object.keys(surahList).sort(
            (a, b) => b.length - a.length
        );


    for (const name of sortedSurahs) {

        const normalizedName =
            normalizeSurahName(name);

        const escapedName =
            normalizedName.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

        const nameRegex =
            new RegExp(
                `(^|\\s)${escapedName}(?=\\s|$)`,
                "i"
            );

        if (
            nameRegex.test(cleanedText)
        ) {

            surah = surahList[name];
            surahName = name;

            break;
        }
    }


    // =========================================
    // SPECIAL SPEECH RECOGNITION FIXES
    // =========================================

    if (!surah) {

        const compactText =
            cleanedText.replace(/\s+/g, "");

        if (
            compactText.includes("annas") ||
            compactText.includes("alnas")
        ) {
            surah = 114;
            surahName = "nas";
        }

        else if (
            compactText.includes("naas")
        ) {
            surah = 114;
            surahName = "naas";
        }

        else if (
            compactText.includes("nass")
        ) {
            surah = 114;
            surahName = "nas";
        }
    }


    if (!surah) {

        return {
            type: null,
            surah: null,
            surahName: null,
            startAyah: null,
            endAyah: null,
            onwards: false,
            originalCommand: command
        };
    }


    // =========================================
    // COMMON WORDS
    // =========================================

    const ayahWord =
        "(?:ayah|ayat|aayat|aayaat|ayaat|verse|verses|ayaton)";

    const numberWord =
        "(?:number|no|num|number ki|number wali)?";


    // =========================================
    // RANGE
    // =========================================

    let match = text.match(
        new RegExp(
            `${ayahWord}\\s*(?:${numberWord}\\s*)?(\\d+)\\s*(?:to|through|until|till|se|say|-)\\s*(?:${ayahWord}\\s*)?(\\d+)`
        )
    );


    if (match) {

        startAyah = parseInt(match[1]);
        endAyah = parseInt(match[2]);

        if (endAyah >= startAyah) {
            type = "RANGE";
        }
    }


    // =========================================
    // AND
    // =========================================

    if (!type) {

        match = text.match(
            new RegExp(
                `${ayahWord}\\s*(?:${numberWord}\\s*)?(\\d+)\\s*(?:and|aur|or)\\s*(?:${ayahWord}\\s*)?(\\d+)`
            )
        );


        if (match) {

            startAyah = parseInt(match[1]);
            endAyah = parseInt(match[2]);

            if (endAyah >= startAyah) {
                type = "RANGE";
            }
        }
    }


    // =========================================
    // MULTIPLE CONSECUTIVE AYAT
    // =========================================

    if (!type) {

        match = text.match(
            new RegExp(
                `${ayahWord}\\s*(?:${numberWord}\\s*)?(\\d+(?:\\s+\\d+)+)`
            )
        );


        if (match) {

            const numbers =
                match[1]
                    .trim()
                    .split(/\s+/)
                    .map(Number);


            if (numbers.length >= 2) {

                startAyah = numbers[0];

                endAyah =
                    numbers[numbers.length - 1];

                if (endAyah >= startAyah) {
                    type = "RANGE";
                }
            }
        }
    }


    // =========================================
    // ONWARDS
    // =========================================

    if (!type) {

        match = text.match(
            new RegExp(
                `${ayahWord}\\s*(?:${numberWord}\\s*)?(\\d+)\\s*(?:se|say)?\\s*(?:aage|agay|aagay|baad|onwards|onward|forward)`
            )
        );


        if (match) {

            startAyah = parseInt(match[1]);
            endAyah = null;

            type = "ONWARDS";
            onwards = true;
        }
    }


    // =========================================
    // FROM / STARTING
    // =========================================

    if (!type) {

        match = text.match(
            new RegExp(
                `${ayahWord}\\s*(?:${numberWord}\\s*)?(\\d+)\\s*(?:se\\s*)?(?:shuru|start|begin)`
            )
        );


        if (!match) {

            match = text.match(
                /(?:from|starting from|beginning from)\s+(?:ayah|ayat|verse)?\s*(?:number|no)?\s*(\d+)/
            );
        }


        if (match) {

            startAyah = parseInt(match[1]);
            endAyah = null;

            type = "ONWARDS";
            onwards = true;
        }
    }


    // =========================================
    // UNTIL
    // =========================================

    if (!type) {

        match = text.match(
            /(?:until|till|up to|up till)\s+(?:ayah|ayat|verse)?\s*(?:number|no|num)?\s*(\d+)/
        );


        if (match) {

            startAyah = 1;
            endAyah = parseInt(match[1]);

            type = "UNTIL";
        }
    }


    // =========================================
    // FROM X TO Y
    // =========================================

    if (!type) {

        match = text.match(
            /from\s+(?:ayah|ayat|verse)?\s*(?:number|no|num)?\s*(\d+)\s*(?:to|through|-)\s*(?:ayah|ayat|verse)?\s*(?:number|no|num)?\s*(\d+)/
        );


        if (match) {

            startAyah = parseInt(match[1]);
            endAyah = parseInt(match[2]);

            if (endAyah >= startAyah) {
                type = "RANGE";
            }
        }
    }


    // =========================================
    // AYAH X OF SURAH Y
    // =========================================

    if (!type) {

        match = text.match(
            new RegExp(
                `${ayahWord}\\s*(?:number|no|num)?\\s*(\\d+)\\s+(?:of|ki|ka)\\s+`
            )
        );


        if (match) {

            startAyah = parseInt(match[1]);
            endAyah = startAyah;

            type = "SINGLE";
        }
    }


    // =========================================
    // ROMAN URDU
    // =========================================

    if (!type) {

        match = text.match(
            new RegExp(
                `(?:ki|ka)\\s+${ayahWord}\\s*(?:${numberWord}\\s*)?(\\d+)`
            )
        );


        if (!match) {

            match = text.match(
                new RegExp(
                    `(?:ki|ka)\\s+(\\d+)\\s*(?:number|no|num)?\\s*${ayahWord}`
                )
            );
        }


        if (match) {

            startAyah = parseInt(match[1]);
            endAyah = startAyah;

            type = "SINGLE";
        }
    }


    // =========================================
    // STANDARD SINGLE AYAH
    // =========================================

    if (!type) {

        match = text.match(
            new RegExp(
                `${ayahWord}\\s*(?:${numberWord}\\s*)?(\\d+)`
            )
        );


        if (match) {

            startAyah = parseInt(match[1]);
            endAyah = startAyah;

            type = "SINGLE";
        }
    }


    // =========================================
    // WHOLE SURAH
    // =========================================

    if (!type) {

        type = "WHOLE_SURAH";

        startAyah = 1;
        endAyah = null;
    }


    console.log(
        "FINAL PARSED COMMAND:",
        {
            type,
            surah,
            surahName,
            startAyah,
            endAyah,
            onwards
        }
    );


    return {
        type,
        surah,
        surahName,
        startAyah,
        endAyah,
        onwards,
        originalCommand: command
    };
}


export default parseCommand;