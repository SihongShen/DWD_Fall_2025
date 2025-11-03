let express = require('express');

// create an http server application which responds to any HTTP requests
let app = express();

// have our server respond to get requests
// with the appropiate files from the 'public' folder

// telling http server to serve static files from 'public' folder
app.use(express.static('public'));

// create a get request handler at path/search
app.get('/search', mySearchHandler);

function mySearchHandler(req, res){

    let question = req.query.q;

    console.log('Got search request: ' + question);
    res.send("ok! What's the question?" + question);
}

// listen on port 8080
app.listen(8080);