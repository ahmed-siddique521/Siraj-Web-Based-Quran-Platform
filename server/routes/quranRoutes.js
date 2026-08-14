const express = require("express");

const {
    getVerse
} = require("../controllers/quranController");

const router = express.Router();

router.post("/verse", getVerse);

module.exports = router;