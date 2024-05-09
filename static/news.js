let newsData = []

fetch('/news/get_news')
  .then(response => response.json())
  .then(data => {
    newsData = data.news;
    console.log(newsData);
    loadNews();
  })
  .catch(error => console.error('Помилка:', error));


// const openNewsButton = document.getElementById('open-news');
// const newsContent = document.getElementById('news-content');

// openNewsButton.addEventListener('click', () => {
//     newsContent.style.display = 'block';
//     openNewsButton.style.display = 'none';
// })

news = document.getElementById('news');

function createNews(newsData) {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');

    const title = document.createElement('h2');
    title.textContent = newsData.title;

    const newsContent = document.createElement('div');
    newsContent.classList.add('news-content');

    const contentText = document.createElement('p');
    contentText.textContent = newsData.content;

    const newsFooter = document.createElement('div');
    newsFooter.classList.add('news-footer');

    const date = document.createElement('p');
    const isoDateString = newsData.created_at;
    const dateObject = new Date(isoDateString);

    // Отримання різних частин дати та часу
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Додаємо 1, тому що місяці у JavaScript нумеруються з 0
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    // Створення рядка з нормалізованим форматом
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    date.textContent = formattedDate;

    const arrow = document.createElement('span');
    arrow.classList.add('material-symbols-outlined');
    arrow.textContent = 'arrow_downward';
    arrow.id = newsData.id;

    newsFooter.appendChild(date);
    newsFooter.appendChild(arrow);

    newsContent.appendChild(contentText);

    newsItem.appendChild(title);
    newsItem.appendChild(newsContent);
    newsItem.appendChild(newsFooter);

    const content = newsItem.querySelector('.news-content');
    arrow.addEventListener('click', () => {
        if (content.style.display === 'none') {
            content.style.display = 'flex';
            arrow.textContent = 'arrow_upward';
        } else {
            content.style.display = 'none';
            arrow.textContent = 'arrow_downward';
        }
    });

    news.appendChild(newsItem);
}

function loadNews() {
    console.log('loading news');
    newsData.forEach((newsDataItem) => {
        console.log(newsDataItem);
        const newsItem = createNews(newsDataItem);
    });
}