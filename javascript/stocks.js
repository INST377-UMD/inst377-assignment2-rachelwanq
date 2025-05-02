async function loadRedditStocks() {
    const response = await fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03");
    const stocks = await response.json();
    const tbody = document.querySelector("#topStocksBody");
    tbody.innerHTML = "";

    stocks.slice(0, 5).forEach(stock => {
        const row = document.createElement("tr");
        let sentimentIcon = "";

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