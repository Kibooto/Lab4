let toysData = [];

fetch('/get_toys')
  .then(response => response.json())
  .then(data => {
    toysData = data.toys;
    console.log(toysData);
    loadCards();
  })
  .catch(error => console.error('Помилка:', error));

function createCard(toyData) { 
    const card = document.createElement('div');
    card.classList.add('catalog-item');

    const image = document.createElement('img');
    image.src = toyData.image; 
    image.alt = '';

    const title = document.createElement('h4');
    title.textContent = toyData.name; 

    const itemBuy = document.createElement('div');
    itemBuy.classList.add('item-buy');

    const price = document.createElement('p');
    price.textContent = toyData.price + ' грн';

    const button = document.createElement('button');
    button.textContent = 'Купити';
    button.value = toyData.id;

    itemBuy.appendChild(price);
    itemBuy.appendChild(button);

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(itemBuy);

    return card;
}

const cardsPerPage = 9;
let currentPage = 1;

filterSelect = document.getElementById('filter-select');

let buyButtons = document.querySelectorAll('.item-buy button');

function loadCards(filteredData = null) {
    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    if (filteredData) {
        cardsToShow = filteredData.slice(start, end);
    } else {
        cardsToShow = toysData.slice(start, end);
    }
    
    cardsToShow.forEach((toyData) => {
        const card = createCard(toyData);
        cards.appendChild(card);
    });

    buyButtons = document.querySelectorAll('.item-buy button');

    buyButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const toyId = Number(event.target.value);
            const toy = toysData.find((toyData) => toyData.id === toyId);
            console.log(toy, toyId);
            toy.quantity = 1;
            basket.push(toy);
            console.log(basket);
        });
    })
}

window.addEventListener('scroll', () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
        currentPage += 1;
        loadCards();
    }
});

// Filters

filterInput = document.getElementById('filter-input');

const sortSelect = document.getElementById('sort');
const minPriceInput = document.getElementById('price-min');
const maxPriceInput = document.getElementById('price-max');

function sortData() {
    const sortBy = sortSelect.value;
    let sortedData = [];

    switch (sortBy) {
        case 'name':
            sortedData = toysData.slice().sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'pricedown':
            sortedData = toysData.slice().sort((a, b) => b.price - a.price);
            break;
        case 'priceup':
            sortedData = toysData.slice().sort((a, b) => a.price - b.price);
            break;
        default:
            sortedData = toysData;
    }

    let minPrice = Number(minPriceInput.value);
    let maxPrice = Number(maxPriceInput.value);

    if (maxPrice === 0) {
        maxPrice = 1000000000;
    }

    sortedData = sortedData.filter((toyData) => toyData.price >= minPrice && toyData.price <= maxPrice);

    const filter = filterInput.value.toLowerCase();
    sortedData = sortedData.filter((toyData) => toyData.name.toLowerCase().includes(filter));

    cards.innerHTML = '';
    currentPage = 1;
    loadCards(sortedData);
}

sortData();

filterInput.addEventListener('input', () => {
    sortData();
})

sortSelect.addEventListener('change', () => {
    sortData();
});

minPriceInput.addEventListener('input', () => {
    sortData();
})

maxPriceInput.addEventListener('input', () => {
    sortData();
})

// basket
let basket = [];

const basketButton = document.getElementById('basket-button');
const closeBasket = document.getElementById('close-basket-button');
const basketModal = document.getElementById('basket-modal');

basketButton.addEventListener('click', () => {
    basketModal.style.display = 'block';
    basketItems.innerHTML = '';
    basket.forEach((toyData) => {
        const item = createBasketItem(toyData);
        basketItems.appendChild(item);
    });
})

closeBasket.addEventListener('click', () => {
    basketModal.style.display = 'none';
})


const totalSum = document.getElementById('total');

function updateTotalSum() {
    let toysSum = 0;

    basket.forEach((toyData) => {
        toysSum += Number(toyData.price) * Number(toyData.quantity);
    });

    totalSum.innerHTML = toysSum + ' грн';
}


const basketItems = document.getElementById('basket-items');

function createBasketItem(toyData) {
    const item = document.createElement('div');
    item.classList.add('basket-item');

    const image = document.createElement('img');
    image.src = toyData.image;
    image.alt = '';

    const title = document.createElement('h4');
    title.textContent = toyData.name;

    const basketItemBuy = document.createElement('div');
    basketItemBuy.classList.add('item-buy');
    const quantity = document.createElement('input');
    quantity.type = 'number';
    quantity.addEventListener('input', (event) => {
        const toyId = Number(event.target.id);
        const toy = basket.find((toyData) => toyData.id === toyId);
        toy.quantity = Number(event.target.value);
        price.textContent = toyData.price * toy.quantity + ' грн';
        updateTotalSum();
    })

    quantity.value = 1;
    quantity.min = 1;
    quantity.max = 10;
    quantity.id = toyData.id;

    quantity.addEventListener('input', (event) => {
        const toyId = Number(event.target.id);
        const toy = basket.find((toyData) => toyData.id === toyId);
        toy.quantity = Number(event.target.value);

    })

    const price = document.createElement('p');
    price.textContent = toyData.price + ' грн';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Видалити';
    deleteButton.value = toyData.id;

    deleteButton.addEventListener('click', (event) => {
        const toyId = Number(event.target.value);
        const toyIndex = basket.findIndex((toyData) => toyData.id === toyId);
        basket.splice(toyIndex, 1);
        basketItems.innerHTML = '';
        basket.forEach((toyData) => {
            const item = createBasketItem(toyData);
            basketItems.appendChild(item);
        });
        updateTotalSum();
    });

    updateTotalSum();

    basketItemBuy.appendChild(quantity);
    basketItemBuy.appendChild(price);
    basketItemBuy.appendChild(deleteButton);

    item.appendChild(image);
    item.appendChild(title);
    item.appendChild(basketItemBuy);

    return item;
}




