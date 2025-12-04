import './style.css'

// ------------ variables ------------ //
let products = [];
let filteredProducts = [];
let cart = [];
const perPage = 9;
let currentIndex = 0;
let selectedCategory = 'all';
let selectedPrice = 100;
let searchQurey = "";

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
        
        const data = await res.json();
        products = data;
        filteredProducts = [...products];

        resetPagination();
        renderProducts(filteredProducts.slice(0, perPage));
        currentIndex = perPage;

    } catch {
        console.log("Network Error");
    }
}
getProducts();
// ------------- render Function ---------- //

const renderProducts = (arr) => {
    cardContainer.innerHTML = "";
    arr.forEach(createCard);
    eventFunction()
}

// ------------ Append function ----------- //
const appendCards = (arr) => {
    arr.forEach(createCard);
    eventFunction()
}

// ------------ Create card (shared logic) -------- //
function createCard(product) {
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
    title.textContent = product.title;
    productDetails.appendChild(title);

    const category = document.createElement("p");
    category.textContent = `category - ${product.category}`;
    productDetails.appendChild(category);

    const priceTag = document.createElement('p');
    priceTag.classList.add('price-tag');
    priceTag.textContent = `$ ${product.price}`;
    productDetails.appendChild(priceTag);

    const endRow = document.createElement('div');
    endRow.classList.add('end-row');

    const addToCartBtn = document.createElement('button');
    addToCartBtn.dataset.id = product.id;
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

    cardContainer.appendChild(card);
}

//  ---------- Load More Function --------- //
const loadMOre = () => {
    const nextProcduct = filteredProducts.slice(currentIndex, currentIndex + perPage);

    if (nextProcduct.length === 0) {
        loadMoreBtn.style.display = "none";
        return;
    }

    appendCards(nextProcduct);
    currentIndex += perPage;

    if (currentIndex >= filteredProducts.length) {
        loadMoreBtn.style.display = "none";
    }
}

// ----------- reset pagination ----------- //
const resetPagination = () => {
    currentIndex = 0;
    loadMoreBtn.style.display = "block";
}

// ----------- apply Filters ------------ //
const applyFilters = () => {
    let results = [...products];

    // category
    if (selectedCategory !== 'all') {
        results = results.filter(item =>
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        );
    }

    // price
    results = results.filter(item => item.price <= selectedPrice);

    // search
    if (searchQurey !== "") {
        results = results.filter(item =>
            item.title.toLowerCase().includes(searchQurey)
        );
    }

    filteredProducts = results;

    resetPagination();
    renderProducts(filteredProducts.slice(0, perPage));
    currentIndex = perPage;
}
// ---------- add cart Function --------- //

function addToCart(id){
    const item = cart.find((p)=> p.id === id);

    if(item){
        item.quantity++;
    }
    else{
        const product = products.find((p)=> p.id === id);
        if(!product) return 

        cart.push(
            {
                id : product.id,
                title : product.title,
                price : product.price,
                image : product.image,
                quantity: 1,
            }
        );
    }
    saveCart();
    updateCartUI();
}
// --------- saveCart --------- //
function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
};

// ---------- load cart function --------- //
function loadCart(){
    const saved = localStorage.getItem("cart");
    cart = saved ? JSON.parse(saved) :[];
    updateCartUI();
}
loadCart();
function increaseQuantity(id){
    const item = cart.find((p) => p.id === id);
    if (!item) return;

    item.quantity++;
    saveCart();
    updateCartUI();
}
function decreaseQuantity(id) {
    const item = cart.find((p) => p.id === id);
    if (!item) return;

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter((p) => p.id !== id);
    }

    saveCart();
    updateCartUI();
}
function removeFromCart(id){
    cart = cart.filter((p) => p.id !== id);
    saveCart();
    updateCartUI();
}
function updateCartUI() {
    const totalItems = document.querySelector(".cart-count");
    const totalPrice = document.querySelector(".cart-total");

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        if (totalItems) totalItems.textContent = "0";
        if (totalPrice) totalPrice.textContent = "₹0";
        return;
    }

    let sum = 0;
    let itemCount = 0;

    cart.forEach((item) => {
        sum += item.price * item.quantity;
        itemCount += item.quantity;

        cartContainer.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" >
            <div class="cart-info">
                <h4>${item.title}</h4>
                <p>$${item.price}</p>
                <div class="quantity-controls ">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                </div>
            </div>
            <button class="delete-btn" onclick="removeFromCart(${item.id})">X</button>
        </div>`;
    });

    if (totalItems) totalItems.textContent = itemCount;
    if (totalPrice) totalPrice.textContent = "₹" + sum;
}

function eventFunction(){
    const CartBtn = document.querySelectorAll(".buy-Now-Button");
    CartBtn.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            const id = Number(btn.dataset.id);
            addToCart(id);           
        })
    })
}

// ------------ Event listeners ------------ //
loadMoreBtn.addEventListener("click", loadMOre);

categoryLi.forEach(li => {
    li.addEventListener("click", () => {
        selectedCategory = li.dataset.category || 'all';
        applyFilters();
    });
});

searchBar.addEventListener("input", () => {
    searchQurey = searchBar.value.toLowerCase();
    applyFilters();
})

priceRange.addEventListener("input", () => {
    selectedPrice = Number(priceRange.value);
    document.querySelector(".range-Label").textContent = `$0 - $${selectedPrice}`;
    applyFilters();
});
