let express = require('express');
let app = express();

app.listen(3000, function() {
    console.log('📝 Diary app running at http://localhost:3000');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// store all diaries
let diaryEntries = [];

// POST /addEntry --- adding new diary
app.post('/addEntry', function(req, res) {
    let entry = req.body.entryText; // 对应 HTML 表单的 name="entryText"
    let date = new Date().toLocaleString();
    
    diaryEntries.push({
        text: entry,
        time: date
    });
    
    res.send(`
            <h2>Diary added successfully!</h2>
            <button onclick="window.location.href='/'">Back to Home</button>
        `);
});

// GET / —— show all diaries
app.get('/', function(req, res) {
    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>My Diary</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body id="main">
            <div id="container">
                <h1 id="title">My Diary</h1>
                <form id="entryForm" method="POST" action="/addEntry">
                    <textarea id="entryText" name="entryText" rows="4" cols="40" placeholder="Write your thoughts..."></textarea><br>
                    <button id="addButton" type="submit">Add</button>
                </form>
                <hr>
                <h2 id="subtitle">Past days</h2>
    `;

    for (let i = diaryEntries.length - 1; i >= 0; i--) {
        html += `
                <div class="diary-entry">
                    <p>${diaryEntries[i].text}</p>
                    <small>${diaryEntries[i].time}</small>
                </div>
            `;
        }

        html += `
                </div>
            </body>
            </html>
        `;

    res.send(html);
});