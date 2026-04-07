async function loadData() {
    const response = await fetch("online_shopping_data.csv");
    const data = await response.text();

    const rows = data.split("\n").map(row => row.split(","));

    displayTable(rows);
    drawCharts(rows);
}

function displayTable(rows) {
    let table = document.getElementById("dataTable");
    table.innerHTML = "";

    rows.slice(0, 6).forEach(row => {
        let tr = "<tr>";
        row.forEach(cell => {
            tr += `<td>${cell}</td>`;
        });
        tr += "</tr>";
        table.innerHTML += tr;
    });
}

function drawCharts(rows) {
    let prices = [];
    let ratings = [];

    for (let i = 1; i < rows.length; i++) {
        prices.push(parseFloat(rows[i][1]));
        ratings.push(parseFloat(rows[i][2]));
    }

    // Price Chart
    new Chart(document.getElementById("priceChart"), {
        type: "bar",
        data: {
            labels: prices,
            datasets: [{
                label: "Prices",
                data: prices
            }]
        }
    });

    // Rating Chart
    new Chart(document.getElementById("ratingChart"), {
        type: "line",
        data: {
            labels: ratings,
            datasets: [{
                label: "Ratings",
                data: ratings
            }]
        }
    });
}
