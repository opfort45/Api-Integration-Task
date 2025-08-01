// Function to get a random cat fact from an API
function getQuote() {
  fetch("https://catfact.ninja/fact") // Sending GET request to the Cat Fact API
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
      // Display the fetched cat fact in the paragraph with id "quote"
      document.getElementById("quote").textContent = data.fact;
    })
    .catch(error => {
      // Display an error message if the API call fails
      document.getElementById("quote").textContent = "❌ Failed to load cat fact.";
      console.error("Error:", error);
    });
}

// Function to get weather details for a specific city
function getWeather() {
  const apiKey = "dcc17a392cc03a27d803c7d7396d0f23"; // Your OpenWeatherMap API key
  const city = document.getElementById("cityInput").value.trim(); // Get city input from user

  if (city === "") {
    // If input is empty, show a message
    document.getElementById("weatherResult").textContent = "Please enter a city.";
    return;
  }

  // Fetch weather data from the OpenWeatherMap API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then((res) => res.json()) // Convert response to JSON
    .then((data) => {
      if (data.cod === 200) {
        // If city is found, extract temperature and weather description
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        document.getElementById("weatherResult").textContent = `🌡️ ${temp}°C — ${desc}`;
      } else {
        // If city is not found
        document.getElementById("weatherResult").textContent = "❌ City not found.";
      }
    })
    .catch((err) => {
      // If the API call fails
      document.getElementById("weatherResult").textContent = "❌ Failed to fetch weather.";
      console.error(err);
    });
}

// Function to get top news headlines (from the US)
function getNews() {
  const apiKey = "fc256204c8ff40de9b50627b524bbfaa"; // Your News API key
  const randomPage = Math.floor(Math.random() * 5) + 1; // Get a random page between 1 and 5

  // Fetch top headlines from NewsAPI
  fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${randomPage}&apiKey=${apiKey}`)
    .then((res) => res.json()) // Convert response to JSON
    .then((data) => {
      const newsList = document.getElementById("newsList");
      newsList.innerHTML = ""; // Clear previous results

      if (data.articles.length === 0) {
        newsList.innerHTML = "❌ No top headlines found.";
        return;
      }

      // Loop through articles and display each one
      data.articles.forEach((article) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
        newsList.appendChild(li);
      });
    })
    .catch((err) => {
      document.getElementById("newsList").innerHTML = "❌ Failed to fetch news.";
      console.error(err);
    });
}

// Function to search news articles based on a keyword
function searchNews() {
  const apiKey = "fc256204c8ff40de9b50627b524bbfaa"; // Your News API key
  const query = document.getElementById("newsQuery").value.trim(); // Get keyword from user

  if (query === "") {
    document.getElementById("newsList").innerHTML = "❌ Please enter a keyword.";
    return;
  }

  // Fetch news articles matching the keyword
  fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=5&sortBy=publishedAt&apiKey=${apiKey}`)
    .then((res) => res.json()) // Convert response to JSON
    .then((data) => {
      const newsList = document.getElementById("newsList");
      newsList.innerHTML = ""; // Clear previous results

      if (data.articles.length === 0) {
        newsList.innerHTML = "❌ No articles found for this keyword.";
        return;
      }

      // Loop through articles and display each one
      data.articles.forEach((article) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
        newsList.appendChild(li);
      });
    })
    .catch((err) => {
      document.getElementById("newsList").innerHTML = "❌ Failed to fetch news.";
      console.error(err);
    });
}
