const newsContainer = document.getElementById('news-container');
let currentIndex = 0;
let newsData = [];

const rssFeeds = [
    'https://api.rss2json.com/v1/api.json?rss_url=http://tribune.com.pk/feed/home',
    'https://api.rss2json.com/v1/api.json?rss_url=http://rss.cnn.com/rss/cnn_topstories.rss',
    'https://api.rss2json.com/v1/api.json?rss_url=http://feeds.bbci.co.uk/news/rss.xml',
    'https://api.rss2json.com/v1/api.json?rss_url=http://www.cnet.com/rss/all',
    'https://api.rss2json.com/v1/api.json?rss_url=https://gizmodo.com/rss',
    'https://api.rss2json.com/v1/api.json?rss_url=http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'
];

function fetchNews() {
    const promises = rssFeeds.map(feedUrl => fetch(feedUrl).then(response => response.json()));

    Promise.all(promises)
    .then(dataArray => {
        // Concatenate news items from all feeds
        newsData = dataArray.reduce((accumulator, currentValue) => accumulator.concat(currentValue.items), []);
        shuffleNews(); // Shuffle the news items
        displayNews();
    })
    .catch(error => console.error('Error fetching news:', error));
}

function shuffleNews() {
    // Fisher-Yates shuffle algorithm
    for (let i = newsData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newsData[i], newsData[j]] = [newsData[j], newsData[i]];
    }
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
        shuffleNews(); // Shuffle the news items again if all have been displayed
    }
}

// Fetch news initially
fetchNews();

// Fetch news every 30 seconds
setInterval(fetchNews, 30000);
