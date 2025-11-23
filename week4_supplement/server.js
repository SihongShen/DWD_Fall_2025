let express = require('express');

// create an express app which handles HTTP request
let app = express();
app.listen(3000, function () {
    console.log('Server is listening on http://localhost:3000')
})

// make express handle JSON properly
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// serve static HTML to the client
app.use(express.static('public'));

// create a datastore
let Datastore = require('nedb');
let db = new Datastore({ filename: 'sketchDatabase', autoload: true });


// "/uploadSketch" POST request handler
// when a client upload a sketch link,
// handle that sketch link by saving it in
// an array of sketch links
let sketchLinks = [];
app.post('/uploadSketch', uploadSketchPostRequestHandler);
function uploadSketchPostRequestHandler(req, res) {
    console.log('got uploadsketch post request');

    let link = req.body.sketchEmbedLink; 
    console.log('link: ', link);

    // sketchLinks.push(link);
    // console.log('how many sketch links do we have? ', sketchLinks.length)

    let doc = {
        link: req.body.sketchEmbedLink
    };

    db.insert(doc, function (err, newDoc) {
        if (err) {
            console.error('Error inserting document', err);
        }
    });

    let dataToSend = {
        links: sketchLinks
    }
    res.send(dataToSend);
}



// "/" GET request handler
// when a client requests to view the gallery page
// dynamically build the HTML gallery based 
// on the array of sketch links
app.get('/sketches', myGalleryPageRequestHandler);
function myGalleryPageRequestHandler(req, res){
    db.find({}, function (err, docs) {
        if (err) {
            console.error("Error finding documents in database:", err);
        }
        let dataToSend = {
            links: docs
        }
        res.send(dataToSend);
    });
}