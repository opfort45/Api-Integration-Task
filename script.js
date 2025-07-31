function getQuote() {
  fetch("https://catfact.ninja/fact")
    .then(response => response.json())
    .then(data => {
      document.getElementById("quote").textContent = data.fact;
    })
    .catch(error => {
      document.getElementById("quote").textContent = "❌ Failed to load cat fact.";
      console.error("Error:", error);
    });
}
function getWeather() {
  const apiKey = "dcc17a392cc03a27d803c7d7396d0f23";
  const city = document.getElementById("cityInput").value.trim();

  if (city === "") {
    document.getElementById("weatherResult").textContent = "Please enter a city.";
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === 200) {
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        document.getElementById("weatherResult").textContent = `🌡️ ${temp}°C — ${desc}`;
      } else {
        document.getElementById("weatherResult").textContent = "❌ City not found.";
      }
    })
    .catch((err) => {
      document.getElementById("weatherResult").textContent = "❌ Failed to fetch weather.";
      console.error(err);
    });
}

function getNews() {
  const apiKey = "fc256204c8ff40de9b50627b524bbfaa";
  const randomPage = Math.floor(Math.random() * 5) + 1; // pick 1-3

  fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${randomPage}&apiKey=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      const newsList = document.getElementById("newsList");
      newsList.innerHTML = "";

      if (data.articles.length === 0) {
        newsList.innerHTML = "❌ No top headlines found.";
        return;
      }

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


function searchNews() {
  const apiKey = "fc256204c8ff40de9b50627b524bbfaa";
  const query = document.getElementById("newsQuery").value.trim();

  if (query === "") {
    document.getElementById("newsList").innerHTML = "❌ Please enter a keyword.";
    return;
  }

 fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=5&sortBy=publishedAt&apiKey=${apiKey}`)

    .then((res) => res.json())
    .then((data) => {
      const newsList = document.getElementById("newsList");
      newsList.innerHTML = "";

      if (data.articles.length === 0) {
        newsList.innerHTML = "❌ No articles found for this keyword.";
        return;
      }

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
