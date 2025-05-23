/* table showing top 5 stocks talked about on reddit */
async function loadRedditStocks() {
    const response = await fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03");
    const stocks = await response.json();
    const tbody = document.querySelector("#topStocksBody");
    tbody.innerHTML = "";

    stocks.slice(0, 5).forEach(stock => {
        const row = document.createElement("tr");
        let sentimentIcon = "";

        /* Got these bullish and bearish icons online */
        if (stock.sentiment.toLowerCase() === "bullish") {
            sentimentIcon = "https://static.vecteezy.com/system/resources/previews/013/063/007/non_2x/bullish-trader-logo-forex-bull-logo-design-template-financial-bull-logo-design-trade-bull-chart-vector.jpg";
        } else {
            sentimentIcon = "https://investmentu.com/wp-content/uploads/2022/03/bearish-stocks.jpg";
        }

        row.innerHTML = `
            <td><a href="https://finance.yahoo.com/quote/${stock.ticker}">${stock.ticker}</a></td>
            <td>${stock.no_of_comments}</td>
            <td><img src="${sentimentIcon}" alt="${stock.sentiment}" width="80"/></td>`;
        tbody.appendChild(row);
    });
}

loadRedditStocks();

/* API key from polygon */
const apiKey = "2HeKC07SX0AZ5Ew5H0b7pqIHKbZPHDsP"; // Replace with your real Polygon.io API key
const ctx = document.getElementById("stockChart")
let stockChart;

async function LoadStocks() {
    const ticker = document.getElementById("ticker").value.toUpperCase();
    const range = parseInt(document.getElementById("range").value);

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - range);

    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];

    /* using Polygon.IO API */
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${start}/${end}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    const labels = data.results.map(item => new Date(item.t).toLocaleDateString());
    const prices = data.results.map(item => item.c);

    /* using CHart.JS Library  */
    if (stockChart) {
        stockChart.destroy();
    }

    stockChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: `($) Stock Price`,
                data: prices,
            }]
        },
    });
}


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
        },
        /* Look up TIcker audio part */
        "look up *ticker": (ticker) => {
            responseTicker = ticker.toLowerCase();
            document.getElementById("ticker").value = responseTicker;
            LoadStocks();
        }
    };
    annyang.addCommands(commands);
}