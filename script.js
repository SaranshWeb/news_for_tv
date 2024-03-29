const newsContainer = document.getElementById('news-container');
let currentIndex = 0;
let newsData = [];

function fetchNews() {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=http://tribune.com.pk/feed/home')
    .then(response => response.json())
    .then(data => {
        newsData = data.items;
        displayNews();
    })
    .catch(error => console.error('Error fetching news:', error));
}

function displayNews() {
    newsContainer.innerHTML = '';

    for (let i = currentIndex; i < currentIndex + 3; i++) {
        if (i >= newsData.length) {
            break;
        }

        const item = newsData[i];
        const title = item.title;
        const link = item.link;
        const description = item.description;
        
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
            <h2><a href="${link}" target="_blank">${title}</a></h2>
            <p>${description}</p>
        `;
        newsContainer.appendChild(newsItem);
    }

    currentIndex += 3;
    if (currentIndex >= newsData.length) {
        currentIndex = 0;
    }
}

// Fetch news initially
fetchNews();

// Fetch news every 30 seconds
setInterval(fetchNews, 10000);
