// ----------------- product Card ---------------- //
// -----------------  Elements  ------------------//
const exploreSection = document.getElementById("explore-Section");
const gridContainer = document.querySelector(".grid-Container");
const LoadMoreButton = document.querySelector("#loadMore");
const searchBar = document.querySelector("#searchBar");

// --------------------  API  ------------------ //
const url = "https://dummyjson.com/products/category/mens-shoes";

// --------------- array ---------------//
let shoes = [];
// -------------- render Cards ----------------//
function renderCard(){
const randomShoes = getRandomShoes();

 gridContainer.innerHTML = "";
randomShoes.forEach(shoe => {

        // Create card
        const card = document.createElement("div");
        card.classList.add("card");

        // Card image
        const cardImg = document.createElement("div");
        cardImg.classList.add("card-img");

        const img = document.createElement("img");
        img.src = shoe.images[0] || "https://via.placeholder.com/150";
        img.alt = shoe.title;

        cardImg.appendChild(img);

        // Card text
        const cardText = document.createElement("div");
        cardText.classList.add("card-Text");

        const title = document.createElement("h3");
        title.textContent = shoe.title;

        const price = document.createElement("p");
        price.textContent = `$${shoe.price}`;

        const category = document.createElement("p");
        category.textContent = `Category: ${shoe.category}`;

        const rating = document.createElement("p");
        rating.textContent = `Rating: ${shoe.rating} star ⭐`;

        const stock = document.createElement("p");
        stock.textContent = `Stock: ${shoe.stock}`;

        cardText.append(title, price, category, rating, stock);

        // Append image and text to card
        card.append(cardImg, cardText);

        // Append card to container
        gridContainer.appendChild(card);
    });

}

// --------------- fetch Shoes ---------------//
async function fetchShoes() {
    try{
        const res = await fetch(url);

        if(!res.ok) throw new Error("Network Error");
        const data = await res.json();
        shoes = data.products;
        renderCard();
    }
    catch{
        console.log("Some error found");
    }
}
// ------------- Get random Shoe -----------//
function getRandomShoes(count = 4) {
    const shuffled = [...shoes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function searchShoe(){
    let filtered = shoes.filter( shoe =>{
         return (shoe.title.toLowerCase().includes(searchBar.value.toLowerCase())) 
    })
    
}

// --------------- event Listner ----------//
LoadMoreButton.addEventListener("click", renderCard);
fetchShoes();

