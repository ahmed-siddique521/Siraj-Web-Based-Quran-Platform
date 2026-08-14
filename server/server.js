const express = require("express");
const cors = require("cors");
require("dotenv").config();

const quranRoutes = require("./routes/quranRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Voice Quran API is running"
    });
});

app.use("/api/quran", quranRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});