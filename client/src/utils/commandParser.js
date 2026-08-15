const surahList = {
    "fatiha": 1,
    "al fatiha": 1,

    "baqarah": 2,
    "baqara": 2,
    "al baqarah": 2,
    "al baqara": 2,

    "imran": 3,
    "al imran": 3,
    "aal imran": 3,

    "nisa": 4,
    "an nisa": 4,

    "maidah": 5,
    "maida": 5,
    "al maidah": 5,
    "al maida": 5,

    "anam": 6,
    "al anam": 6,

    "araf": 7,
    "al araf": 7,

    "anfal": 8,
    "al anfal": 8,

    "tawbah": 9,
    "taubah": 9,
    "at tawbah": 9,

    "yunus": 10,
    "younus": 10,

    "hud": 11,

    "yusuf": 12,
    "yoosuf": 12,

    "ar rad": 13,
    "rad": 13,
    "ar raad": 13,

    "ibrahim": 14,

    "al hijr": 15,
    "hijr": 15,

    "nahl": 16,
    "an nahl": 16,

    "isra": 17,
    "al isra": 17,
    "bani israel": 17,

    "kahf": 18,
    "kaahf": 18,
    "al kahf": 18,

    "maryam": 19,

    "ta ha": 20,
    "taha": 20,

    "anbiya": 21,
    "al anbiya": 21,

    "hajj": 22,
    "al hajj": 22,

    "muminun": 23,
    "muminoon": 23,
    "al muminun": 23,

    "nur": 24,
    "noor": 24,
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
    "sajdah": 32,

    "ahzab": 33,
    "al ahzab": 33,

    "saba": 34,

    "fatir": 35,

    "ya seen": 36,
    "yaseen": 36,
    "yasin": 36,
    "ya sin": 36,
    "yaaseen": 36,

    "as saffat": 37,
    "saffat": 37,

    "sad": 38,

    "az zumar": 39,
    "zumar": 39,

    "ghafir": 40,
    "momin": 40,
    "al mumin": 40,

    "fussilat": 41,

    "ash shura": 42,
    "shura": 42,

    "zukhruf": 43,

    "ad dukhan": 44,
    "dukhan": 44,

    "jathiyah": 45,

    "ahqaf": 46,

    "muhammad": 47,

    "fath": 48,

    "hujurat": 49,

    "qaf": 50,

    "dhariyat": 51,
    "zariyat": 51,

    "tur": 52,

    "najm": 53,

    "qamar": 54,

    "rahman": 55,
    "rehman": 55,
    "ar rahman": 55,
    "ar rehman": 55,
    "surah rahman": 55,
    "surah rehman": 55,
    "surat rahman": 55,
    "surat rehman": 55,

    "waqiah": 56,
    "waqia": 56,

    "hadid": 57,

    "mujadilah": 58,

    "hashr": 59,

    "mumtahanah": 60,

    "saff": 61,

    "jumuah": 62,
    "jumma": 62,

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
    "qiyama": 75,

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
    "lail": 92,

    "duha": 93,

    "sharh": 94,
    "inshirah": 94,

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
    "lahab": 111,

    "ikhlas": 112,
    "ikhlas": 112,

    "falaq": 113,

    "nas": 114
};


function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/[?,.!]/g, " ")
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
    // SURAH DETECTION
    // =========================================

    const sortedSurahs =
        Object.keys(surahList).sort(
            (a, b) => b.length - a.length
        );


    for (const name of sortedSurahs) {

        const normalizedName =
            name
                .toLowerCase()
                .replace(/[-]/g, " ")
                .replace(/\s+/g, " ")
                .trim();

        const compactName =
            normalizedName.replace(/\s+/g, "");


        if (
            text.includes(normalizedName) ||
            text.includes(compactName)
        ) {

            surah = surahList[name];
            surahName = name;

            break;
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
    // 27 to 29
    // 27 through 29
    // 27 se 29
    // 27 se 29 tak
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
    // 27 and 28
    // 27 aur 28
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
    //
    // Ayat 27 28 29
    // Ayah 27 28 29
    // Ayat number 27 28 29
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
    //
    // Ayat 27 onwards
    // Ayat 27 and onwards
    // Ayat 27 se aage
    // Ayat 27 se agay
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
    //
    // Until ayah 20
    // Up to ayah 20
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
    //
    // Rahman ki ayat 15
    // Rahman ki ayat number 15
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
    //
    // Ayat 15
    // Ayah number 15
    // Verse 15
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


    console.log("FINAL PARSED COMMAND:", {
        type,
        surah,
        surahName,
        startAyah,
        endAyah,
        onwards
    });


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