// annyang features
function TurnAudioOff(){
    if (annyang){
        annyang.abort();
    }
}

function TurnAudioOn(){
    if (annyang){
        annyang.start();
    }
}

if (annyang){
    const commands = {
        "hello": () => {alert("Hello World!");},
        "change the color to *color": (color) => {document.body.style.backgroundColor = color;},
        "navigate to *page": (page) => {
            responsepage = page.toLowerCase();
            if (responsepage === "home"){
                window.location.href = "home.html";
            }
            else if (responsepage === "stocks"){
                window.location.href = "stocks.html";
            }
            else if (responsepage === "dogs"){
                window.location.href = "dogs.html";}
        }
    };
    annyang.addCommands(commands);
}

async function fetchQuote() {
    try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json();
        document.getElementById('quote').innerText = `"${data[0].q}"`;
        document.getElementById('author').innerText = `— ${data[0].a}`;
    } catch (error) {
        document.getElementById('quote').innerText = 'Could not load quote.';
        console.error(error);
    }
}
fetchQuote();