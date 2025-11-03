let http = require('http');
let fs = require('fs');

let myServer = http.createServer(myRequestHandler);

myServer.listen(8080);

// req = request
function myRequestHandler(req, res){
    // this function will respond to incoming requests
    // console.log(req);
    let path = req.url;
    // console.log("Incoming request at: ", req.url);

    // console.log('Server running at: ', __dirname);
    let filePath = __dirname + path;
    // console.log("Serving file: ", filePath);

    fs.readFile(filePath, function (err, data) {

        if (err){
            console.log("Error getting data! Sending error status code.");
            res.writeHead(500);
            res.end('Error accessing file');
            return;
        }

        console.log("Got data! Let's send it to the client.");
        res.writeHead(200);
        res.end(data);

    })

}