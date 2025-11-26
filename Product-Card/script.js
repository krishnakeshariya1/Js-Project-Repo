// ----------------- product Card ---------------- //
// -----------------  Elements  ------------------//
const exploreSection = document.getElementById("explore-Section");
const gridContainer = document.querySelector(".grid-Container");

// --------------------  API  ------------------ //
const url = "https://dummyjson.com/products/category/mens-shoes";

// -------------- render Cards ----------------//
function renderCard(data){

const card = document.createElement("div");
card.classList.add("card");

const cardImg = document.createElement("div");
cardImg.classList.add("card-img");

const img = document.createElement("img");
img.src = "";
img.alt = "";

cardImg.appendChild(img);

const cardText = document.createElement("div");
cardText.classList.add("card-Text");

const title = document.createElement("h3");
title.textContent = "Title";

const price = document.createElement("p");
price.textContent = "$12";

const category = document.createElement("p");
category.textContent = "Category: men shoes";

const rating = document.createElement("p");
rating.textContent = "Rating: 5 star";

const stock = document.createElement("p");
stock.textContent = "Stock: 8";

cardText.append(title, price, category, rating, stock);

card.append(cardImg, cardText);

gridContainer.appendChild(card);

}

// --------------- fetch Shoes ---------------//
