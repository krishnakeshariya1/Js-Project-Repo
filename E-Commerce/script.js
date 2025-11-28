// ----------------- E-commerce -------------- //

//  ------------- Elements -------------- //
const searchBar = document.querySelector("#searchBar");
const categoryList = document.querySelectorAll(".category-Section ul li");
const priceRange = document.querySelector("#price-range");
const applyFilterBtn = document.querySelector("#applyFilter");
const cartItemsContainer = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const gridContainer = document.querySelector(".grid-Container");   

// --------------- API ---------------- //
const url = "https://fakestoreapi.com/products";

// ------------- Array --------------- //
let products = [];

// ---------- Fetch Products --------- //
async function fetchProduct() {
    try{
    const res = await fetch(url);

    if(!res.ok) throw new Error("Network Error");
    const data = await res.json();
    products = data;
    console.log(data)
    renderCard(getRandomProducts());
    }
    catch{
        console.log("error found");
    }
}
// ---------- random Products --------- //
function getRandomProducts(product = 9){
    let suffle = [...products].sort(()=> 0.5 - Math.random());
    return suffle.slice(0, product);
}
//  ---------- render Card ----------- //
function renderCard(product) {
    product.forEach( p => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = p.image;
    img.alt = p.title;

    const title = document.createElement("h3");
    title.textContent = p.title;

    const price = document.createElement("p");
    price.textContent = p.price;

    const category = document.createElement("p");
    category.textContent = `Category: ${p.category}`;

    const rating = document.createElement("p");
    rating.textContent = `Rating: ${p.rating.rate}`;

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";

    // append all children
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(category);
    card.appendChild(rating);
    card.appendChild(btn);

    gridContainer.appendChild(card)
    });
}

fetchProduct()