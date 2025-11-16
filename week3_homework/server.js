let express = require('express');
let app = express();

app.listen(3000, function() {
    console.log('📝 Diary app running at http://localhost:3000');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views'); 

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

    res.render('success');
});

// GET / —— show all diaries
app.get('/', function(req, res) {
    res.render('index', { diaryEntries: diaryEntries });
});