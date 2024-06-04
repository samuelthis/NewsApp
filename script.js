// getting elements from the html

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const categorySelect = document.getElementById("category-select");
const newsContainer = document.getElementById("news-container");

//define the API and the base url (link)

const apiKey = "bb894f9d782f4b269647521b219eafba"; // i have to use api key from the the website: https://newsapi.org/
const baseUrl = "https://newsapi.org/v2/";

//funtction to fetch and display news articles

const fetchNews = async (query, category) => {
    
    // remove the previous articles

    newsContainer.innerHTML = "";
}

// construct the url for the API request 

let url = baseUrl + "top-headlines?country=us&apiKey=" + apiKey;

// adding the query parameter if it is not empty 

if (query) {
    url += "&q=" + query;
}

// add cateory paramenter if it is not all 

if (category !=="all") {
    url + "&category=" + category;
}

// fetch data from API 

const response = await fetch(url);
const data = await response.json (); 

// check if the data has any articles 

if (data.articles.length > 0) {
    //loop through the articles and create HTML elements for each one
    for (const article of data.articles) {
        //create a div element for each article
        const articleDiv = document.createElement("div");
        articleDiv.className = "news-article";

        //create an image element for the article image

        const articleImage = document.createElement("img");
        articleImage.src =article.urlToImage;
        articleImage.alt = article.title;

        //create a h3 element for the article title

        const articleDescription = document.createElement("p");
        articleDescription.textContent = article.description;

        // create a p element for the article description

        const articleLink = document.createElement("a");
        articleLink.href = article.url;
        articleLink.textContent = "Read more";
        articleLink.target = "_blank";

        //append the image . title , description, and link to the article div

        articleDiv.appendChild(articleImage);
        articleDiv.appendChild(articleTitle);
        articleDiv.appendChild(articleDescription);
        articleDiv.appendChild(articleLink);


  //append the article div to the news conatiner

  newsContainer.appendChild(articleDiv);
    }
  //if no articles found, display this message
    } else {
    
        newsContainer.innerHTML = "<p>No News articles found.</p>";
    }
    
