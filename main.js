const apiLink = "https://cloud.codesupply.co/endpoint/react/data.json";
const postsBlock = document.querySelector('.js-posts');

let lastScrollY = window.scrollY;
const menu = document.querySelector('.menu');

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
    fetch(apiLink).then(response => {
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(posts => {
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
    
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
}

loadingPosts();