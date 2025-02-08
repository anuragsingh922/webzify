const express = require('express');
const cors = require('cors');
const {connectToDatabase} = require("./databaseConnection/db");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();


app.get("/", (req, res) => {
    return res.status(200).send("Webzify server working fine.");
})


app.use("/api/v1" , require("./routes/v1.routes"));

// Get filtered themes
app.get('/api/themes/filter', async (req, res) => {
    try {
        const { type, tone } = req.query;
        const { themes } = await getThemes();

        const filteredThemes = themes.filter(theme => {
            if (!type && !tone) return true;
            return theme.tags.includes(type) || theme.tags.includes(tone);
        });

        res.json(filteredThemes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch filtered themes' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});