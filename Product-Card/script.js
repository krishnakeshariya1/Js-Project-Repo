// API
const url = "https://dummyjson.com/products/category/mens-shoes";

let index = 0; // for next button

// Render UI
function renderCard(product) {
    document.body.innerHTML = `
        <div class="card">
            <div class="img-Container">
                <img src="${product.images[0]}" alt="${product.title}">
            </div>
            <div class="textSec">
                <div class="title">
                    <h2>${product.title}</h2>
                </div>
                <div class="price-Tag">
                    <p>$${product.price}</p>
                </div>
                <div class="category">
                    <span>category :</span>
                    <span>${product.category}</span>
                </div>
                <div class="button-Sec">
                    <button id="nextBtn">Next shoes</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById("nextBtn").addEventListener("click", () => {
        index++;
        if (index >= products.length) index = 0;
        renderCard(products[index]);
    });
}

let products = []; // to store fetched products

// Fetch Data
async function fetchData() {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Network Error");

        const data = await res.json();
        products = data.products;

        renderCard(products[index]);
    } catch (error) {
        document.body.innerHTML = `Failed to load data <br> Try again`;
    }
}

fetchData();
