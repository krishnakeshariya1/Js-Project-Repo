import './style.css'
// ------------ variables ------------ //
let products = [];
let filteredProducts = [];
const cart = [];
const perPage = 9;
let currentIndex = 0;

// ------------- Elements ------------- //
const searchBar = document.querySelector("#searchBar");
const priceRange = document.querySelector("#priceRange");
const cardContainer = document.querySelector(".grid-Container");
const loadMoreBtn = document.querySelector(".loadBtn");
const categoryLi = document.querySelectorAll(".category-Section ul li");
const cartContainer = document.querySelector(".total-Price-Section");
// --------------- API --------------- //
const Url = "https://fakestoreapi.com/products";

// -------------- Fetch product ----------- //
async function getProducts() {
    try {
        const res = await fetch(Url);

        if (!res.ok) throw new Error("Network Connection Error");
        const data = await res.json()
        products = data;
        filteredProducts = [...products];
        renderProducts(filteredProducts.slice(0, perPage));
        currentIndex = perPage;
    }
    catch {
        console.log("Netwrok Error");
    }
};
const renderProducts = (arr) => {
    cardContainer.innerHTML = "";
    arr.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");

        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img-Container");

        const image = document.createElement("img");
        image.src = `${product.image}`;
        image.alt = `${product.title}`;
        imgContainer.appendChild(image);

        const productDetails = document.createElement("div");
        productDetails.classList.add("product-Details");


        const title = document.createElement("h3");
        title.textContent = `${product.title}`;
        productDetails.appendChild(title);

        const category = document.createElement("p");
        category.textContent = `category -  ${product.category}`;
        productDetails.appendChild(category);

        const priceTag = document.createElement('p');
        priceTag.classList.add('price-tag');
        priceTag.textContent = `$ ${product.price}`;
        productDetails.appendChild(priceTag);

        const endRow = document.createElement('div');
        endRow.classList.add('end-row');

        const addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('buy-Now-Button');
        addToCartBtn.textContent = "Add to Cart";
        endRow.appendChild(addToCartBtn);

        const qtyDiv = document.createElement('div');
        qtyDiv.classList.add('qty');

        const minusButton = document.createElement('button');
        minusButton.classList.add('minus');
        minusButton.textContent = '-';
        qtyDiv.appendChild(minusButton);

        const countSpan = document.createElement('span');
        countSpan.classList.add('count');
        countSpan.textContent = '1';
        qtyDiv.appendChild(countSpan);

        const plusButton = document.createElement('button');
        plusButton.classList.add('plus');
        plusButton.textContent = '+';
        qtyDiv.appendChild(plusButton);

        endRow.appendChild(qtyDiv);
        productDetails.appendChild(endRow);
        card.appendChild(imgContainer);
        card.appendChild(productDetails);

        cardContainer.appendChild(card)
    });
}
const appendCards = (arr) =>{
        arr.forEach(product =>{
            const card = document.createElement("div");
        card.classList.add("card");

        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img-Container");

        const image = document.createElement("img");
        image.src = `${product.image}`;
        image.alt = `${product.title}`;
        imgContainer.appendChild(image);

        const productDetails = document.createElement("div");
        productDetails.classList.add("product-Details");


        const title = document.createElement("h3");
        title.textContent = `${product.title}`;
        productDetails.appendChild(title);

        const category = document.createElement("p");
        category.textContent = `category -  ${product.category}`;
        productDetails.appendChild(category);

        const priceTag = document.createElement('p');
        priceTag.classList.add('price-tag');
        priceTag.textContent = `$ ${product.price}`;
        productDetails.appendChild(priceTag);

        const endRow = document.createElement('div');
        endRow.classList.add('end-row');

        const addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('buy-Now-Button');
        addToCartBtn.textContent = "Add to Cart";
        endRow.appendChild(addToCartBtn);

        const qtyDiv = document.createElement('div');
        qtyDiv.classList.add('qty');

        const minusButton = document.createElement('button');
        minusButton.classList.add('minus');
        minusButton.textContent = '-';
        qtyDiv.appendChild(minusButton);

        const countSpan = document.createElement('span');
        countSpan.classList.add('count');
        countSpan.textContent = '1';
        qtyDiv.appendChild(countSpan);

        const plusButton = document.createElement('button');
        plusButton.classList.add('plus');
        plusButton.textContent = '+';
        qtyDiv.appendChild(plusButton);

        endRow.appendChild(qtyDiv);
        productDetails.appendChild(endRow);
        card.appendChild(imgContainer);
        card.appendChild(productDetails);

        cardContainer.appendChild(card)
        })
}

loadMoreBtn.addEventListener("click", ()=>{
    appendCards(filteredProducts.slice(currentIndex, currentIndex+ perPage));
    currentIndex += perPage;
    if(currentIndex >= filteredProducts.length){
        loadMoreBtn.style.display = "none";
    }
});

getProducts();