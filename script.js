let originalData = [];

async function loadData() {
    const response = await fetch("online_shopping_data.csv");
    const data = await response.text();

    originalData = data.split("\n").map(row => row.split(","));

    displayTable(originalData);
    updateStats(originalData);
    drawCharts(originalData);
}

function applyFilter() {
    let searchValue = document.getElementById("searchInput").value.toLowerCase();
    let purchaseValue = document.getElementById("purchaseFilter").value;

    let filtered = originalData.filter((row, index) => {
        if (index === 0) return true;

        let matchSearch = row[0].toLowerCase().includes(searchValue);
        let matchPurchase = (purchaseValue === "all" || row[3] === purchaseValue);

        return matchSearch && matchPurchase;
    });

    displayTable(filtered);
    updateStats(filtered);
    drawCharts(filtered);
}

function displayTable(rows) {
    let table = document.getElementById("dataTable");
    table.innerHTML = "";

    rows.slice(0, 10).forEach(row => {
        let tr = "<tr>";
        row.forEach(cell => {
            tr += `<td>${cell}</td>`;
        });
        tr += "</tr>";
        table.innerHTML += tr;
    });
}

function updateStats(rows) {
    let prices = [];
    let ratings = [];

    for (let i = 1; i < rows.length; i++) {
        prices.push(parseFloat(rows[i][1]));
        ratings.push(parseFloat(rows[i][2]));
    }

    let total = prices.length;
    let avgPrice = prices.reduce((a,b) => a+b, 0) / total || 0;
    let avgRating = ratings.reduce((a,b) => a+b, 0) / total || 0;

    document.getElementById("totalProducts").innerText = total;
    document.getElementById("avgPrice").innerText = avgPrice.toFixed(2);
    document.getElementById("avgRating").innerText = avgRating.toFixed(2);
}

function drawCharts(rows) {
    let prices = [];
    let ratings = [];

    for (let i = 1; i < rows.length; i++) {
        prices.push(parseFloat(rows[i][1]));
        ratings.push(parseFloat(rows[i][2]));
    }

    new Chart(document.getElementById("priceChart"), {
        type: "bar",
        data: {
            labels: prices,
            datasets: [{ label: "Prices", data: prices }]
        }
    });

    new Chart(document.getElementById("ratingChart"), {
        type: "line",
        data: {
            labels: ratings,
            datasets: [{ label: "Ratings", data: ratings }]
        }
    });
}
