let express = require('express');

// create an http server application which 
// responds to any HTTP requests
let app = express();

// have our server respond to get requests
// with the appropriate file from the 'public' folder
app.use(express.static('public'));

// tell our express app to process incoming request bodies as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views'); // specify the views directory


// create a get request handler at path /search
app.get('/search', mySearchRequestHandler)

function mySearchRequestHandler(req, res){
    let question = req.query.q;
    
    console.log('Got search request:' + question);

    let wikipediaLink = "https://en.wikipedia.org/w/index.php?fulltext=1&search=" + question + "&title=Special%3ASearch&ns0=1";
    let duckDuckGoLink = "https://duckduckgo.com/?origin=funnel_home_google&t=h_&q=" + question + "&ia=web"
    let myHtmlOutput = "<h1>Search Page</h1>"
    myHtmlOutput = myHtmlOutput + "<p>You Asked About:</p>"
    myHtmlOutput = myHtmlOutput + "<p>" + question + "</p>"
    myHtmlOutput = myHtmlOutput + "Try this link: " + wikipediaLink
    myHtmlOutput = myHtmlOutput + "Or try this link: " + duckDuckGoLink
    res.send(myHtmlOutput);
}

let secrets = [];

// build a POST request handler
app.post('/shareSecret', myShareSecretRequestHandler);
function myShareSecretRequestHandler(req, res){

    // get access to incoming secret
    console.log(req.body);
    // parse the j
    // let json = JSON.parse(req.body);

    let secret = req.body.secret;
    // keep track of it in the secrets array
    secrets.push(secret);
    console.log('Got POST request to /shareSecret with secret: ' + secret);


    // send a thank you
    res.send('Thank you for sharing a secret.  I will keep it safe.');
} 


app.get('/secrets', myGetSecretsRequestHandler);
function myGetSecretsRequestHandler(req, res){

    // let secretsHtml = "<h1>Secrets:</h1>"
    // secretsHtml = secretsHtml + "<h3>Here are some secrets I know</h3>"
    // for (let i = 0; i < secrets.length; i++){
    //     secretsHtml = secretsHtml + "<p>" + secrets[i] + "</p>";
    // }
    // res.send(secretsHtml);

    let dataToRender ={
        mySecrets: secrets
    }
    res.render('secrets.ejs', dataToRender);
    
}

app.get("/sayHello", mySayHelloRequestHandler);
function mySayHelloRequestHandler(req, res){
    let name = req.query.name;
    res.render('sayHello.ejs', { name: name });
}

// listen on port 8080
app.listen(8080);