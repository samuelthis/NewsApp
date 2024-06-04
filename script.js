const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const categorySelect = document.getElementById("category-select");
const newsContainer = document.getElementById("news-container");

const apiKey = "bb894f9d782f4b269647521b219eafba"; // Your News API key
const baseUrl = "https://newsapi.org/v2/";

// **Improved fetchNews function**
async function fetchNews(query = "", category = "all") {
  newsContainer.innerHTML = ""; // Clear previous articles

  // Construct API URL with default values if not provided
  let url = `${baseUrl}top-headlines?country=za&apiKey=${apiKey}`;
  if (query) {
    url += `&q=${encodeURIComponent(query)}`; // Encode query for safety
  }
  if (category !== "all") {
    url += `&category=${category}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      data.articles.forEach(article => {
        // Create elements and set content for each article
        const articleDiv = document.createElement("div");
        articleDiv.className = "news-article";

        const articleImage = document.createElement("img");
        articleImage.src = article.urlToImage || "placeholder-image.jpg"; // Handle missing images
        articleImage.alt = article.title || "News Image";

        const articleTitle = document.createElement("h3"); // Corrected element type
        articleTitle.textContent = article.title || "No Title Available";

        const articleDescription = document.createElement("p");
        articleDescription.textContent = article.description || "No Description Available";

        const articleLink = document.createElement("a");
        articleLink.href = article.url;
        articleLink.textContent = "Read more";
        articleLink.target = "_blank";

        articleDiv.append(articleImage, articleTitle, articleDescription, articleLink);
        newsContainer.appendChild(articleDiv);
      });
    } else {
      newsContainer.innerHTML = "<p>No news articles found.</p>";
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = "<p>An error occurred while fetching news.</p>";
  }
}

// **Event Listener**
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim(); 
  const category = categorySelect.value;
  fetchNews(query, category);
});

// **Initial Fetch**
fetchNews(); // Fetch news on page load (no query, all categories)


