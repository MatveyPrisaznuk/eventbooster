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
const footer = document.querySelector('.footer');
const list = document.querySelector('.hero__listcards');
const modal = document.querySelector('[data-modal]');
const modalWrap = document.querySelector('.modal__wrap');
const closeBtn = document.querySelector('[data-close]');
const body = document.body;

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
  footer.style.display = 'flex';
  const totalPages = res.page?.totalPages || 0;
  const currentPage = res.page?.number || 0;
  renderPagination(totalPages, currentPage);
}, 900);

inputRef.addEventListener('input', event => {
  footer.style.display = 'none';
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
    footer.style.display = 'none';
    galleryList.innerHTML = `
       <div class="center">
          <p>We couldn't find your request :(</p>
        </div>
    `;
    return;
  }
  footer.style.display = 'flex';
  pagination.style.display = 'flex';

  const item = array
    .map(({ name, images, dates, _embedded, id }) => {
      const image = images?.[0]?.url || '';
      const date = dates?.start?.localDate || 'Unknown date';
      const place = _embedded?.venues?.[0]?.name || 'Unknown place';
      return `
        <li class="listcards__item" data-id="${id}">
          <img src="${image}"
               alt="${name}"
               class="listcards__image">
          <div class="listcards__group">
            <h2 class="listcards__title">${name}</h2>
            <p class="listcards__time">${date}</p>
            <div class="listcards__point">
               <svg class="listcards__svg" xmlns="http://w3.org" viewBox="0 0 640 640">
            <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"></path>
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

//-------------------------

list.addEventListener('click', async e => {
  const card = e.target.closest('.listcards__item');

  if (!card) return;

  const id = card.dataset.id;
  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`
  );
  const ev = await response.json();

  modalWrap.innerHTML = createModalMarkup(ev);
  modal.classList.remove('backdrop-hidden');
  body.classList.add('no-scroll');
});

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (!e.target.closest('.modal')) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.code === 'Escape') closeModal();
});

function closeModal() {
  modal.classList.add('backdrop-hidden');
  body.classList.remove('no-scroll');
}

function createModalMarkup(ev) {
  return `
    <img class="modal__preview" src="${ev.images?.[0]?.url || ''}" />
    <div class="content">
      <img class="content__image" src="${ev.images?.[0]?.url || ''}" />
      <ul class="content__list">
        <li>
          <h2 class="modal__title">INFO</h2>
          <p class="modal__text">${ev.info || 'No information'}</p>
        </li>
        <li>
          <h2 class="modal__title">WHEN</h2>
          <p class="modal__text">${ev.dates?.start?.localDate || ''}</p>
          <p class="modal__text">${ev.dates?.start?.localTime || ''}</p>
        </li>
        <li>
          <h2 class="modal__title">WHERE</h2>
          <p class="modal__text">${ev._embedded?.venues?.[0]?.city?.name || ''}</p>
          <p class="modal__text">${ev._embedded?.venues?.[0]?.name || ''}</p>
        </li>
        <li>
          <h2 class="modal__title">WHO</h2>
          <p class="modal__text">${ev.name || ''}</p>
        </li>
        <li class="modal__pric">
          <h2 class="modal__title">PRICES</h2>
          <div class="price__wrap">
          <svg class="price__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 20"><path d="M3.22 0H0v19.33h3.22zm8.11 0H8.1v19.33h3.23zm4.88 0h-3.22v19.33h3.22zM29 0h-4.78v19.33H29zM6.44 0H4.88v19.33h1.56zm12.89 0h-1.56v19.33h1.56zm3.23 0h-1.57v19.33h1.57z" fill="#0E0E0E"/></svg>
            <p class="modal__text">Standart 300-500 UAH</p>
          </div>
          <a class="modal__btn" href="${ev.url || '#'}" target="_blank">
            BUY TICKETS
          </a>
          <div class="price__wrap">
            <svg class="price__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 20"><path d="M3.22 0H0v19.33h3.22zm8.11 0H8.1v19.33h3.23zm4.88 0h-3.22v19.33h3.22zM29 0h-4.78v19.33H29zM6.44 0H4.88v19.33h1.56zm12.89 0h-1.56v19.33h1.56zm3.23 0h-1.57v19.33h1.57z" fill="#0E0E0E"/></svg>
            <p class="modal__text">VIP 1000-1500 UAH</p>
          </div>
          <a class="modal__btn" href="${ev.url || '#'}" target="_blank">
            BUY TICKETS
          </a>
        </li>
      </ul>
    </div>
    <a class="btn-info" href="${ev.url || '#'}" target="_blank">
      MORE FROM THIS AUTHOR
    </a>
  `;
}

loadEvents();
