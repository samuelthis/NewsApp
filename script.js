const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const categorySelect = document.getElementById("category-select");
const newsContainer = document.getElementById("news-container");

const apiKey = "bb894f9d782f4b269647521b219eafba"; 
const baseUrl = "https://newsapi.org/v2/";


const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
async function fetchNews(query = "", category = "all") {
  newsContainer.innerHTML = ""; 

  let url = `${baseUrl}top-headlines?country=za&apiKey=${apiKey}`;
  if (query) {
    url += `&q=${encodeURIComponent(query)}`; 
  }
  if (category !== "all") {
    url += `&category=${category}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.articles && data.articles.length > 0) {
      data.articles.forEach(article => {
        const articleDiv = document.createElement("div");
        articleDiv.className = "news-article";

        const articleImage = createImageElement(article.urlToImage, article.title);
        const articleTitle = document.createElement("h3");
        articleTitle.textContent = article.title || "No Title Available";

        const articleDescription = createDescriptionElement(article.description);

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

function createImageElement(urlToImage, title) {
  const articleImage = document.createElement("img");
  articleImage.src = urlToImage || "placeholder-image.jpg"; 
  articleImage.alt = title || "News Image";
  return articleImage;
}

function createDescriptionElement(description) {
  const articleDescription = document.createElement("p");
  articleDescription.textContent = description || "";
  return articleDescription;
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim(); 
  const category = categorySelect.value;
  fetchNews(query, category);
});

fetchNews();



