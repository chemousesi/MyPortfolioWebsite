const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
let db = new sqlite3.Database('./reviews.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the reviews database.');
});

// Create reviews table if not exists
db.run(`CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
                review TEXT NOT NULL
                )`);

// Endpoint to get all reviews
app.get('/reviews', (req, res) => {
    db.all(`SELECT * FROM reviews`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            reviews: rows
        });
    });
});

// Endpoint to add a new review
app.post('/reviews', (req, res) => {
    const { name, review } = req.body;
    db.run(`INSERT INTO reviews (name, review) VALUES (?, ?)`, [name, review], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            id: this.lastID
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
