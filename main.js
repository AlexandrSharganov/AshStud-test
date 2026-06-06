const API_LINK = "https://cloud.codesupply.co/endpoint/react/data.json";
const postsBlock = document.querySelector('.js-posts');
const searchInput = document.querySelector('.js-search-input');
const menu = document.querySelector('.menu');
const searchBtn = document.querySelector('.js-search-btn');
const searchForm = document.querySelector('.js-search-form');
const popup = document.querySelector('.js-popup');
const popupTitle = popup.querySelector('h3');
const popupText = popup.querySelector("p");
const burger = document.querySelector('.js-burger');
const mobileMenu = document.querySelector('.js-mobile-menu');
const closeBtn = document.querySelector('.js-mobile-close');
let allPosts = [];
let lastScrollY = window.scrollY;
let isMobileMenuOpen = false;

burger.addEventListener('click', () => {
    isMobileMenuOpen = true;
    mobileMenu.classList.add('active');
    document.body.style.overflow = "hidden";
});

function closeMenu() {
    isMobileMenuOpen = false;
    mobileMenu.classList.remove('active');
    document.body.style.overflow = "auto";
}

mobileMenu.addEventListener('click', (event) => {
    if (event.target.classList.contains('js-mobile-close') || event.target.classList.contains('js-mobile-menu')) {
       closeMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && isMobileMenuOpen) {
        closeMenu();
    }
});

function renderPosts(posts) {
    postsBlock.innerHTML = "";

    posts.forEach(element => {
        let post = `<div class="posts__item">
                <div class="posts__item-img">
                    <img src="${element.img}" srcset="${element.img_2x} 2x" alt=""> 
                    
                </div>
                <span class="posts__item-tag">${element.tags}</span>
                <h2 class="posts__item-title">${element.title}</h2>
                <div class="posts__item-info">
                    <a href="#" class="posts__item-author">${element.autor}</a>
                    <span class="posts__item-date">${element.date}</span>
                    <span class="posts__item-views"><span class="posts__item-count">${element.views}</span> Views</span>
                </div>
                <p class="posts__item-text">
                    ${element.text}
                </p>
            </div>`;
        postsBlock.innerHTML += post;
    });
}

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();

    const filtered = allPosts.filter(post => {
        return (
            post.title.toLowerCase().includes(query) ||
            post.text.toLowerCase().includes(query)
        );
    });

    renderPosts(filtered);
});

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < 200) {
        menu.classList.remove('hidden');
        lastScrollY = currentScrollY;
        return;
    }

    if (currentScrollY > lastScrollY) {
        menu.classList.add('hidden');
    } 
    else {
        menu.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
});

function loadingPosts() {
    fetch(API_LINK).then(response => {
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(posts => {
    allPosts = posts;
    renderPosts(posts);
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
}

searchBtn.addEventListener('click', () => {
    searchBtn.classList.add('hide');
    searchForm.classList.remove('hide');
    searchInput.focus();
});

searchInput.addEventListener('blur', () => {
    if (!searchInput.value) {
        searchForm.classList.add('hide');
        searchBtn.classList.remove('hide');
    }
});

postsBlock.addEventListener('click', (event) => {
    const postElement = event.target.closest('.posts__item');

    if (!postElement) {
        return;
    }

    popupTitle.textContent = postElement.querySelector('.posts__item-title').textContent;
    popupText.textContent = postElement.querySelector('.posts__item-text').textContent;

    popup.classList.remove('hide');
    document.body.style.overflow = "hidden";
});

popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close-btn') || event.target.classList.contains('js-popup')) {
        popup.classList.add('hide');
        document.body.style.overflow = "auto";
    }
});

loadingPosts();