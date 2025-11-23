let express = require('express');
let path = require('path');
let Datastore = require('nedb');

let app = express();

// NeDB datastore persisted to a file in this folder
const db = new Datastore({ filename: path.join(__dirname, 'diary.db'), autoload: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(3000, function() {
    console.log('Diary SPA running at http://localhost:3000');
});

// GET /entries —— return all entries (as JSON)
app.get('/entries', function(req, res) {
    db.find({}).sort({ time: -1 }).exec(function(err, docs) {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ entries: docs });
    });
});

// POST /addEntry —— add a new diary entry
app.post('/addEntry', function(req, res) {
    const text = req.body.entryText || req.body.text;
    if (!text || !text.toString().trim()) {
        return res.status(400).json({ error: 'Entry text required' });
    }

    const doc = {
        text: text.toString(),
        time: new Date().toISOString()
    };

    db.insert(doc, function(err, newDoc) {
        if (err) return res.status(500).json({ error: 'Failed to save entry' });

        // after insert, return the full list like the supplement example does
        db.find({}).sort({ time: -1 }).exec(function(err2, docs) {
            if (err2) return res.status(500).json({ error: 'Database error' });
            res.json({ entries: docs });
        });
    });
});

// Fallback for SPA: serve index.html for any other GET (so client-side routing would work)
app.get(/(.*)/, function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});