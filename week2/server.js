let express = require('express');

// create an http server application which responds to any HTTP requests
let app = express();

// have our server respond to get requests
// with the appropiate files from the 'public' folder

// telling http server to serve static files from 'public' folder
app.use(express.static('public'));

// tell our express server to process incoming request bodies as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let myObject = {
    "secret": "This is my secret",
}

// create a get request handler at path/search
app.get('/search', mySearchHandler);

function mySearchHandler(req, res){

    let question = req.query.q;

    console.log('Got search request: ' + question);
    res.send("ok! What's the question?" + question);
}

let secrets = [];

// build a post request handler
app.post('/shareSecret', myShareSecretRequestHandler);

function myShareSecretRequestHandler(req, res){
    console.log('Got a secret share request!');

    // get access to incoming secret
    let secret = req.body.secret;
    // keep track of it in the secret array
    secrets.push(secret);

    res.send("Thanks for sharing your secret!");
}

app.get('/secrets', myGetSecretsRequesthandler);

function myGetSecretsRequesthandler(req, res){
    let secretsHtml = "<h3>Secrets shared so far:</h3><ul>";
    for(let i = 0; i < secrets.length; i++){
        secretsHtml += "<li>" + secrets[i] + "</li>";
    }
    secretsHtml += "</ul>";
    res.send(secretsHtml);
}

// listen on port 8080
app.listen(8080);