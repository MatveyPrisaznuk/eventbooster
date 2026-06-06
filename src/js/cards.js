import debounce from 'lodash.debounce';
const API_KEY = 'jXZOafnGYsrmKAOfdIhi31h8j1RlfCR5';
let page = 0;
const inputRef = document.querySelector('.form__search');
const galleryList = document.querySelector('.hero__listcards');
const formRef = document.querySelector('.header__form');
const loadBox = document.querySelector('.hero__box');
const pagination = document.querySelector('.pagination__container');
const countryRef = document.querySelector('.form__choose');
const countries = document.querySelector('.choose__list');
const countryText = document.querySelector('.choose__text');
let currentSearch = '';
let currentCountry = '';

async function getEvent(value = '', countryCode = '') {
  const res = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${value}&countryCode=${countryCode}&page=${page}&apikey=${API_KEY}`
  );
  return res.json();
}

const loadEvents = debounce(async () => {
  const res = await getEvent(currentSearch, currentCountry);
  createEvent(res._embedded?.events || []);
  pagination.style.display = 'flex';
  loadBox.style.display = 'none';
  const totalPages = res.page?.totalPages || 0;
  const currentPage = res.page?.number || 0;
  renderPagination(totalPages, currentPage);
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

  getEvent(currentSearch, currentCountry).then(res => {
    createEvent(res._embedded?.events || []);
  });
}, 500);

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

// -------------------------------------

countryRef.addEventListener('click', event => {
  if (countries.style.display === 'flex') {
    countries.style.display = 'none';
  } else {
    countries.style.display = 'flex';
  }

  const selectedItem = event.target.closest('.choose__item');

  if (selectedItem) {
    const countryCode = selectedItem.dataset.country;
    currentCountry = countryCode;
    countryText.textContent = selectedItem.textContent.trim();
    galleryList.innerHTML = '';

    getEvent(currentSearch, currentCountry).then(res => {
      createEvent(res._embedded?.events || []);
    });
  }
});

pagination.addEventListener('click', event => {
  if (
    event.target.classList.contains('pagination:number') &&
    !event.target.classList.contains('arrow')
  ) {
    const pageNumber = Number(event.target.textContent);
    page = pageNumber - 1;
    galleryList.innerHTML = '';
    getEvent(currentSearch, currentCountry).then(res => {
      createEvent(res._embedded?.events || []);
      const totalPages = res.page?.totalPages || 0;
      const currentPage = res.page?.number || 0;
      renderPagination(totalPages, currentPage);
    });
  }

  const arrowBtn = event.target.closest('.arrow');
  if (arrowBtn) {
    const action = arrowBtn.dataset.action;
    if (action === 'prev') {
      if (page > 0) {
        page -= 1;
        galleryList.innerHTML = '';
        getEvent(currentSearch, currentCountry).then(res => {
          createEvent(res._embedded?.events || []);
          const totalPages = res.page?.totalPages || 0;
          const currentPage = res.page?.number || 0;
          renderPagination(totalPages, currentPage);
        });
      } else {
        page === 0;
      }
    } else if (action === 'next') {
      page += 1;
      galleryList.innerHTML = '';
      getEvent(currentSearch, currentCountry).then(res => {
        createEvent(res._embedded?.events || []);
        const totalPages = res.page?.totalPages || 0;
        const currentPage = res.page?.number || 0;
        renderPagination(totalPages, currentPage);
      });
    }
  }
});

function renderPagination(totalPages, currentPage) {
  const maxVisiblePages = Math.min(totalPages, 5);
  let html = '';
  html += `
    <div class="pagination:number arrow" data-action="prev">
        <svg width="18" height="18"><use xlink:href="#left" /></svg>
        <span class="arrow:text">Previous</span>
    </div>
  `;
  for (let i = 0; i < maxVisiblePages; i += 1) {
    const pageNumber = i + 1;
    const isActive = i === currentPage ? 'pagination:active' : '';
    html += `
      <div class="pagination:number ${isActive}">
          ${pageNumber}
      </div>
    `;
  }
  html += `
    <div class="pagination:number arrow" data-action="next">
        <svg width="18" height="18"><use xlink:href="#right" /></svg>
    </div>
  `;
  pagination.innerHTML = html;
}
