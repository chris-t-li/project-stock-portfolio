// Variable Delcarations
const company = "google.com"; // hardcoded 
const baseURL = "https://www.alphavantage.co/query?function=";
const logoURL = `https://logo.clearbit.com/${company}`;
const findStock = document.getElementById("findStock")
const searchForm = document.getElementById("search");
const searchResults = document.getElementById("searchResults");
const companyName = document.getElementById("company-name");
const compExch = document.getElementById("exchange");
const compCtry = document.getElementById("country");
const compCCY = document.getElementById("currency");
const compSector = document.getElementById("sector");
const compHigh = document.getElementById("52-week-high");
const compLow = document.getElementById("52-week-low");
const compPERatio = document.getElementById("PE-ratio");
const compDescrip = document.getElementById("description");

// Code for finding and loading company logo

// Get Stock Price History
function getPriceData(ticker) {
    fetch(`${baseURL}TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apikey}`)
    .then(res=> res.json())
    .then(data => {

    const timeSeries = data["Time Series (Daily)"];
    console.log(timeSeries) // Optional
    const dateAxis = [];
    const closePriceAxis = [];

    for(const day in timeSeries) {
        dateAxis.push(day)
        closePriceAxis.push(timeSeries[day]['4. close'])
    }
    renderChart(ticker, dateAxis, closePriceAxis)
})}

// Get Stock Information
function renderStockInfo(ticker) {
    fetch(`${baseURL}OVERVIEW&symbol=${ticker}&apikey=${apikey}`)
    .then(res => res.json())
    .then(data => {
    console.log(data) // Optional
    companyName.textContent = data.Name;
    compExch.textContent = data.Exchange;
    compCtry.textContent = data.Country;
    compCCY.textContent = data.Currency;
    compSector.textContent = data.Sector;
    compHigh.textContent = data["52WeekHigh"];
    compLow.textContent = data["52WeekLow"]
    compPERatio.textContent = data.PERatio;
    compDescrip.textContent = data.Description
})}

// Renders Stock Price Chart
function renderChart(ticker, time, price) {

    const chart = {
        labels: time,
        datasets: [{
            label: `${ticker} Price Chart`,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: price,
        }]
    }
    const config = {
        type: "line",
        data: chart,
        options: {}
    }
    const myChart = new Chart(
        document.getElementById("mainChart"),
        config
    )
    document.getElementById("remove").addEventListener("click", ()=> {
        myChart.destroy();
    })
}

document.getElementById("logo").src = logoURL

// Develop a search function for symbols

searchForm.addEventListener("input", e => {
    
    searchForm.className = e.target.value;

    if(e.target.value.length >= 2) {
        fetch(`${baseURL}SYMBOL_SEARCH&keywords=${e.target.value}&apikey=${apikey}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

        for(const item in data.bestMatches){    
            const option = document.createElement("option");
            option.value = `${data.bestMatches[item]["1. symbol"]}`
            searchResults.append(option);
            // Add ${data.bestMatches[item]["2. name"]} somehow

            option.addEventListener("click", () => {
                searchForm.removeEventListener()
            //     getPriceData(e.target.textContent);
            //     renderStockInfo(e.target.textContent);
            })
        }
    })
    .catch(err => console.error(err))
    }
})

findStock.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("stockInfo").style.display = "block";
    getPriceData(searchForm.className)
    renderStockInfo(searchForm.className)

})