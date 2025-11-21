// ------------ Select Elements -------------
const quoteText = document.querySelector("#quoteText");
const quoteAuthor = document.querySelector("#quoteAuthor");
const btn = document.querySelector("#nextQuote");

const url = "https://dummyjson.com/quotes/random";

// ------------ Render Quote ---------------
const render = (data) => {
  quoteText.textContent = data.quote;
  quoteAuthor.textContent = `— ${data.author}`;
};

// ------------ Loading State ---------------
function showLoading() {
  quoteText.textContent = "Loading...";
  quoteAuthor.textContent = "";
  btn.disabled = true;
  btn.textContent = "Loading...";
}

function hideLoading() {
  btn.disabled = false;
  btn.textContent = "Next Quote";
}

// ------------ Fetch Quote -----------------
async function getQuote() {
  showLoading();
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network Error");
    }

    const data = await response.json();
    render(data);
  } catch (error) {
    quoteText.textContent = "Failed to load quote.";
    quoteAuthor.textContent = "— Try again";
  } finally {
    hideLoading();
  }
}

// ------------ Events -----------------------
btn.addEventListener("click", getQuote);

// Load first quote
getQuote();
