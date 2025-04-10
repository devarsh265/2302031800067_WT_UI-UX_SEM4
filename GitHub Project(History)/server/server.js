const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '..')));
app.use(express.json());

const dataFile = path.join(__dirname, '../data/events.json');

app.get('/events', (req, res) => {
    fs.readFile(dataFile, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading data');
        res.json(JSON.parse(data));
    });
});

app.post('/events', (req, res) => {
    const { title, description, year } = req.body;
    const newEvent = { title, description, year };

    fs.readFile(dataFile, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading data');
        const events = JSON.parse(data);
        events.push(newEvent);
        fs.writeFile(dataFile, JSON.stringify(events, null, 2), err => {
            if (err) return res.status(500).send('Error writing data');
            res.status(200).send('Event saved');
        });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));