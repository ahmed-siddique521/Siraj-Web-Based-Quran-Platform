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
    const text = command
        .toLowerCase()
        .replace(/[?,.!]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    let surah = null;
    let surahName = null;
    let startAyah = null;
    let endAyah = null;
    let type = null;
    let onwards = false;

    // -----------------------------------------
    // SURAH DETECTION
    // -----------------------------------------

    const sortedSurahs = Object.keys(surahList).sort(
        (a, b) => b.length - a.length
    );

    for (const name of sortedSurahs) {
        const normalizedName = name
            .toLowerCase()
            .replace(/[-]/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        const compactName = normalizedName.replace(/\s+/g, "");

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

    // -----------------------------------------
    // COMMON WORDS
    // -----------------------------------------

    const ayahWord =
        "(?:ayah|ayat|aayat|aayaat|ayaat|verse|verses|ayaton)";

    const numberWord =
        "(?:number|no|num|number ki|number wali)?";

    const romanUrduAction =
        "(?:sunao|suna\\s*o|suna\\s*do|suna\\s*dein|suniye|sunna|sun|parhao|parha\\s*o|parh\\s*ao|parh\\s*do|parh\\s*dein|chalao|chala\\s*o|chala\\s*do|play|read|recite|listen)";

    // -----------------------------------------
    // ROMAN URDU RANGE
    //
    // ayat 15 se 20 tak
    // ayat 15 se 20
    // ayat 15 aur 20
    // ayat number 15 se 20 tak
    // -----------------------------------------

    let match = text.match(
        new RegExp(
            `${ayahWord}\\s*(?:${numberWord}\\s*)?(\\d+)\\s*(?:se|say)\\s*(?:${ayahWord}\\s*)?(\\d+)\\s*(?:tak)?`
        )
    );

    if (match) {
        startAyah = parseInt(match[1]);
        endAyah = parseInt(match[2]);

        if (endAyah >= startAyah) {
            type = "RANGE";
        }
    }

    // -----------------------------------------
    // ROMAN URDU "AND"
    //
    // ayat 15 aur 16
    // ayat 15 or 16
    // ayat number 15 aur 16
    // -----------------------------------------

    if (!type) {
        match = text.match(
            new RegExp(
                `${ayahWord}\\s*(?:${numberWord}\\s*)?(\\d+)\\s*(?:aur|or|and)\\s*(?:${ayahWord}\\s*)?(\\d+)`
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

    // -----------------------------------------
    // ROMAN URDU ONWARDS
    //
    // ayat 15 se aage
    // ayat 15 ke baad
    // ayat 15 se agay
    // ayat 15 onwards
    // ayat 15 aur onwards
    // -----------------------------------------

    if (!type) {
        match = text.match(
            new RegExp(
                `${ayahWord}\\s*(?:${numberWord}\\s*)?(\\d+)\\s*(?:se|say)\\s*(?:aage|agay|aagay|baad|onwards|onward)`
            )
        );

        if (!match) {
            match = text.match(
                new RegExp(
                    `${ayahWord}\\s*(?:${numberWord}\\s*)?(\\d+)\\s*(?:aur\\s*)?(?:aage|agay|aagay|baad|onwards|onward)`
                )
            );
        }

        if (match) {
            startAyah = parseInt(match[1]);
            endAyah = null;
            type = "ONWARDS";
            onwards = true;
        }
    }

    // -----------------------------------------
    // ROMAN URDU FROM
    //
    // ayat 15 se shuru
    // ayat 15 se shuru karo
    // 15 se shuru karo
    // 15 se sunao
    // -----------------------------------------

    if (!type) {
        match = text.match(
            new RegExp(
                `${ayahWord}\\s*(?:${numberWord}\\s*)?(\\d+)\\s*(?:se\\s*)?(?:shuru|start|begin)`
            )
        );

        if (!match) {
            match = text.match(
                /(?:from|starting\s+from|beginning\s+from)\s+(?:ayah|ayat|verse)?\s*(?:number|no)?\s*(\d+)/
            );
        }

        if (match) {
            startAyah = parseInt(match[1]);
            endAyah = null;
            type = "ONWARDS";
            onwards = true;
        }
    }

    // -----------------------------------------
    // ENGLISH RANGE
    //
    // ayat 15 to 20
    // ayat 15 through 20
    // ayat 15 and 16
    // -----------------------------------------

    if (!type) {
        match = text.match(
            new RegExp(
                `${ayahWord}\\s*(?:${numberWord}\\s*)?(\\d+)\\s*(?:to|through|until|till|and|-)\\s*(?:${ayahWord}\\s*)?(\\d+)`
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

    // -----------------------------------------
    // ENGLISH ONWARDS
    // -----------------------------------------

    if (!type) {
        match = text.match(
            new RegExp(
                `${ayahWord}\\s*(?:${numberWord}\\s*)?(\\d+)\\s*(?:and\\s*)?(?:onwards|onward|forward)`
            )
        );

        if (match) {
            startAyah = parseInt(match[1]);
            endAyah = null;
            type = "ONWARDS";
            onwards = true;
        }
    }

    // -----------------------------------------
    // UNTIL / TILL / UP TO
    // -----------------------------------------

    if (!type) {
        match = text.match(
            /(?:until|till|up\s+to|up\s+till)\s+(?:ayah|ayat|verse)?\s*(?:number|no|num)?\s*(\d+)/
        );

        if (match) {
            startAyah = 1;
            endAyah = parseInt(match[1]);
            type = "UNTIL";
        }
    }

    // -----------------------------------------
    // "FROM X TO Y"
    // -----------------------------------------

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

    // -----------------------------------------
    // "AYAH 15 OF SURAH RAHMAN"
    //
    // ayat 15 of surah rahman
    // ayah 15 of rahman
    // -----------------------------------------

    if (!type) {
        match = text.match(
            new RegExp(
                `${ayahWord}\\s*(?:number|no|num)?\\s*(\\d+)\\s+(?:of|ki|ka)\\s+(?:surah\\s+)?`
            )
        );

        if (match) {
            startAyah = parseInt(match[1]);
            endAyah = startAyah;
            type = "SINGLE";
        }
    }

    // -----------------------------------------
    // ROMAN URDU SINGLE AYAH
    //
    // Rahman ki ayat 15
    // Rahman ki ayat number 15
    // Rahman ki 15 number ayat
    // Rahman ki 15 ayat
    // Rahman ki ayat 15 sunao
    // -----------------------------------------

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

    // -----------------------------------------
    // STANDARD SINGLE AYAH
    //
    // ayat 15
    // ayat number 15
    // ayah no 15
    // verse 15
    // -----------------------------------------

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

    // -----------------------------------------
    // WHOLE SURAH
    // -----------------------------------------

    if (!type) {
        type = "WHOLE_SURAH";
        startAyah = 1;
        endAyah = null;
    }

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