const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs'); // Node.js file system module

const app = express();
const db = new sqlite3.Database('database.db');

app.use(bodyParser.json());
app.use(cors());

app.post('/api/query', (req, res) => {
    const sql = req.body.sql;

    if (!sql) {
        res.status(400).json({ error: 'SQL query is required in the request body' });
        return;
    }

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            console.log("SQL api call ERORR: " + sql + "/n" + err.message);
            return;
        }
        res.json({ data: rows });
        console.log("SQL api call (" + rows.length + " rows returned): " + sql);
    });
});

// Save state to a file
app.post('/api/saveState', (req, res) => {
    const stateToSave = req.body.data;

    if (!stateToSave) {
        res.status(400).json({ error: 'State data is required in the request body' });
        return;
    }

    const filePath = 'server/state.json';

    fs.writeFile(filePath, stateToSave, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'State saved successfully' });
    });
});

// Load state from a file
app.get('/api/loadState', (req, res) => {
    const filePath = 'server/state.json';

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        const savedState = JSON.parse(data);
        res.json({ data: savedState });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Backend server is running. On port ${port}`);
});
