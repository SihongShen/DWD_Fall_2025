async function submitSketchLink(){
    // Get the value of the input field
    let sketchEmbedLink = document.getElementById("sketchEmbedLink");

    let dataToSend = {
        sketchEmbedLink: sketchEmbedLink.value
    }

    let res = await fetch('/uploadSketch', {
        method: 'POST',
        bosy: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let json = await res.json();

    let sketchContainer = document.getElementById("sketchContainer");
    sketchContainer.innerHTML = "";
    for (let i = 0; i< json.links.length; i++){
        let iframeEmbededLink = json.links[i];
        sketchContainer.innerHTML += iframeEmbededLink;
    }

    console.log(json);
}

async function getSketchfromServer (){
    let res = await fetch('/fetches', {
        method: 'GET',
    });
    let json = await res.json();

    let sketchContainer = document.getElementById("sketchContainer");

    // first remove all existing sketches in the container
    let currentSketches = sketchContainer.children;
    for (let i = 0; i < currentSketches.length; i++){
        sketchContainer.removeChild(currentSketches[i]);
    }

    // then add all the sketches from the server
    let innerHtml = "";

    for (let i = 0; i< json.links.length; i++){
        let iframeEmbededLink = json.links[i];
        innerHtml += iframeEmbededLink.link;
    }
    sketchContainer.innerHTML = innerHtml;
}

let submitButton = document.getElementById("submitButton");
submitButton.addEventListener('click', function (e) {
    e.preventDefault(); // prevent the default form submission behavior
    submitSketchLink();
})