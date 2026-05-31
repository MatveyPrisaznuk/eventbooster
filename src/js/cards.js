import debounce from 'lodash.debounce';
const API_KEY = 'jXZOafnGYsrmKAOfdIhi31h8j1RlfCR5';
let page = 0;
let per_page = 12;

const inputRef = document.querySelector('.form__search');
const galleryList = document.querySelector('.hero__listcards');
const formRef = document.querySelector('.header__form');
const loadBox = document.querySelector('.hero__box');
const pagination = document.querySelector('.pagination__container');
const countryRef = document.querySelector('.form__choose');
const countries = document.querySelector('.choose__list');
let currentSearch = '';

// &page=${page}&per_page=${per_page}
async function getEvent(value = '') {
  const res = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${value}&apikey=${API_KEY}`
  );
  return res.json();
}

const loadEvents = debounce(async () => {
  const res = await getEvent('');
  createEvent(res._embedded?.events || []);
  pagination.style.display = 'flex';
  loadBox.style.display = 'none';
}, 900);

loadEvents();

inputRef.addEventListener('input', event => {
  pagination.style.display = 'none';
  search(event);
});

const search = debounce(evt => {
  galleryList.innerHTML = '';
  const search = evt.target.value.trim();
  currentSearch = search;

  getEvent(search).then(res => {
    createEvent(res._embedded?.events || []);
  });
}, 800);

function createEvent(array) {
  galleryList.innerHTML = '';

  if (!array.length) {
    pagination.style.display = 'none';
    galleryList.innerHTML = `
       <div class="center">
          <p>We couldn't find your request :(</p>
        </div>
    `;
    return;
  }

  pagination.style.display = 'flex';

  const item = array
    .map(({ name, images, dates, _embedded }) => {
      const image = images?.[0]?.url || '';
      const date = dates?.start?.localDate || 'Unknown date';
      const place = _embedded?.venues?.[0]?.name || 'Unknown place';
      return `
        <li class="listcards__item">
          <img src="${image}"
               alt="${name}"
               class="listcards__image">
          <div class="listcards__group">
            <h2 class="listcards__title">${name}</h2>
            <p class="listcards__time">${date}</p>
            <div class="listcards__point">
              <svg class="listcards__svg">
                <use href="./img/pointplace.svg"></use>
              </svg>
              <p class="listcards__place">${place}</p>
            </div>
          </div>
        </li>
      `;
    })
    .join('');
  galleryList.insertAdjacentHTML('beforeend', item);
}

formRef.addEventListener('submit', event => {
  event.preventDefault();
});

// -------------------------------
