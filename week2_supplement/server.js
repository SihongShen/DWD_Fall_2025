let express = require('express');

// create an express app which handles HTTP request
let app = express();
app.listen(3000, function(){
    console.log('Server is listening on http://localhost:3000')
});

// make express handle JSON 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server static HTML to the client
app.use(express.static('public'));

//"/uploadSketch" POST request handler 
// when a client uploads a sketch link,
// handle that sketch link by saving it in an array of sketch links
let sketchLinks = [];
app.post('/uploadSketch', uploadSketchPostRequestHandler);
function uploadSketchPostRequestHandler(req, res) {
    let link=req.body.sketchEmbedLink;
    console.log(link);
    sketchLinks.push(link);
    res.send('ok');
}


// "/gallery" GET request handler
// when a client requests to view the gallery page dynamically build the HTML gallery based on the array of sketch links
app.get('/', myGalleryGetRequestHandler);
function myGalleryGetRequestHandler(req, res) {
    let galleryHtml = "<h1>Sketch gallery</h1>";
    galleryHtml = galleryHtml + "<div>";

    for( let i = 0; i < sketchLinks.length; i++) {
        galleryHtml += sketchLinks[i];
    };
    galleryHtml += "</div>";
    
    res.send('hello! welcome to the gallery');
}