import "./style.css";

// ------------------ STATE ------------------ //
let products = [];
let filteredProducts = [];
let cart = [];

let selectedCategory = "all";
let selectedPrice = 100;
let searchQuery = "";

const perPage = 9;
let currentIndex = 0;

// ------------------ DOM ------------------ //
const searchBar = document.querySelector("#searchBar");
const priceRange = document.querySelector("#priceRange");
const cardContainer = document.querySelector(".grid-Container");
const loadMoreBtn = document.querySelector(".loadBtn");
const categoryLi = document.querySelectorAll(".category-Section ul li");
const cartContainer = document.querySelector(".total-Price-Section");

// ------------------ API ------------------ //
const URL = "https://fakestoreapi.com/products";

// ------------------ INIT ------------------ //
loadCart();
getProducts();

// ------------------ FETCH PRODUCTS ------------------ //
async function getProducts() {
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Network error");

    products = await res.json();
    filteredProducts = [...products];

    resetPagination();
    renderProducts(filteredProducts.slice(0, perPage));
    currentIndex = perPage;

  } catch (err) {
    console.log(err);
  }
}

// ------------------ RENDER PRODUCTS ------------------ //
function renderProducts(arr) {
  cardContainer.innerHTML = "";
  arr.forEach(createCard);
}

function appendProducts(arr) {
  arr.forEach(createCard);
}

// ------------------ CREATE CARD ------------------ //
function createCard(product) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = product.id;

  card.innerHTML = `
    <div class="img-Container">
      <img src="${product.image}" alt="${product.title}">
    </div>

    <div class="product-Details">
      <h3>${product.title}</h3>
      <p>category - ${product.category}</p>
      <p class="price-tag">$${product.price}</p>

      <div class="end-row">
        <button class="add-cart-btn" data-id="${product.id}">Add to Cart</button>

        <div class="qty-controls">
          <button class="qty-minus" data-id="${product.id}">-</button>
          <span class="qty-count">1</span>
          <button class="qty-plus" data-id="${product.id}">+</button>
        </div>
      </div>
    </div>
  `;

  cardContainer.appendChild(card);
}

// ------------------ LOAD MORE ------------------ //
function loadMore() {
  const next = filteredProducts.slice(currentIndex, currentIndex + perPage);

  if (next.length === 0) {
    loadMoreBtn.style.display = "none";
    return;
  }

  appendProducts(next);
  currentIndex += perPage;

  if (currentIndex >= filteredProducts.length) {
    loadMoreBtn.style.display = "none";
  }
}

// ------------------ FILTER LOGIC ------------------ //
function applyFilters() {
  let results = [...products];

  // category
  if (selectedCategory !== "all") {
    results = results.filter(
      item => item.category.toLowerCase() === selectedCategory
    );
  }

  // price
  results = results.filter(item => item.price <= selectedPrice);

  // search
  if (searchQuery !== "") {
    results = results.filter(item =>
      item.title.toLowerCase().includes(searchQuery)
    );
  }

  filteredProducts = results;
  resetPagination();
  renderProducts(filteredProducts.slice(0, perPage));
  currentIndex = perPage;
}

// ------------------ PAGINATION ------------------ //
function resetPagination() {
  currentIndex = 0;
  loadMoreBtn.style.display = "block";
}

// ------------------ CART FUNCTIONS ------------------ //
function addToCart(id) {
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    const product = products.find(p => p.id === id);
    if (!product) return;

    cart.push({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
}

function increaseQuantity(id) {
  const item = cart.find(p => p.id === id);
  if (!item) return;

  item.quantity++;
  saveCart();
  updateCartUI();
}

function decreaseQuantity(id) {
  const item = cart.find(p => p.id === id);
  if (!item) return;

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    cart = cart.filter(p => p.id !== id);
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const saved = localStorage.getItem("cart");
  cart = saved ? JSON.parse(saved) : [];
  updateCartUI();
}

// ------------------ UPDATE CART UI ------------------ //
function updateCartUI() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
    return;
  }

  let totalItems = 0;
  let totalPrice = 0;

  // totals
  cart.forEach(item => {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  const totals = `
      <div class="cart-summary">
        <h3>Cart Summary</h3>
        <p><strong>Items:</strong> ${totalItems}</p>
        <p><strong>Total:</strong> ₹${totalPrice.toFixed(2)}</p>
        <hr>
      </div>
  `;
  cartContainer.innerHTML = totals;

  // items list
  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-info">
        <h4>${item.title}</h4>
        <p>$${item.price}</p>

        <div class="quantity-controls qty-controls">
          <button class="cart-dec qty-minus" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="cart-inc qty-plus" data-id="${item.id}">+</button>
        </div>
      </div>

      <button class="cart-delete" data-id="${item.id}">Clear cart</button>
    `;

    cartContainer.appendChild(div);
  });
}

// ------------------ EVENT DELEGATION ------------------ //

// product grid events
cardContainer.addEventListener("click", e => {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("add-cart-btn")) {
    addToCart(id);
  }

  if (e.target.classList.contains("qty-plus")) {
    const card = e.target.closest(".card");
    const span = card.querySelector(".qty-count");
    span.textContent = Number(span.textContent) + 1;
  }

  if (e.target.classList.contains("qty-minus")) {
    const card = e.target.closest(".card");
    const span = card.querySelector(".qty-count");
    if (Number(span.textContent) > 1) {
      span.textContent = Number(span.textContent) - 1;
    }
  }
});

// sidebar cart events
cartContainer.addEventListener("click", e => {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("cart-inc")) {
    increaseQuantity(id);
  }

  if (e.target.classList.contains("cart-dec")) {
    decreaseQuantity(id);
  }

  if (e.target.classList.contains("cart-delete")) {
    removeFromCart(id);
  }
});

// category filter
categoryLi.forEach(li => {
  li.addEventListener("click", () => {
    selectedCategory = li.dataset.category.toLowerCase();
    applyFilters();
  });
});

// search filter
searchBar.addEventListener("input", () => {
  searchQuery = searchBar.value.toLowerCase();
  applyFilters();
});

// price filter
priceRange.addEventListener("input", () => {
  selectedPrice = Number(priceRange.value);
  document.querySelector(".range-Label").textContent = `$0 - $${selectedPrice}`;
  applyFilters();
});

// load more
loadMoreBtn.addEventListener("click", loadMore);
