document.addEventListener('DOMContentLoaded', function () {
    const messageBlockMoreBtn = document.querySelector('.messageBlock__more');
    messageBlockMoreBtn?.addEventListener('click', function () {
        const parent = messageBlockMoreBtn.closest('.messageBlock__inner');
        if (parent) {
            const hiddenBlock = parent.querySelector('.messageBlock-hide');
        if (hiddenBlock) hiddenBlock.remove();
            messageBlockMoreBtn.remove();
        }
    });

    const searchBlock = document.querySelector('.header__search');
    const searchForm = document.querySelector('.header__search-form');
    const closeButton = document.querySelector('.header__search-close');
    searchBlock.addEventListener('click', (e) => {
        e.preventDefault();
        searchForm.classList.toggle('active');
    });
    closeButton.addEventListener('click', () => {
        searchForm.classList.remove('active');
    });
    document.addEventListener('click', (e) => {
        if (!searchForm.contains(e.target) && !searchBlock.contains(e.target)) {
            searchForm.classList.remove('active');
        }
    });
});

function checkHeaderScroll() {
  const header = document.querySelector(".header");
  if (window.innerWidth > 999) {
    if (window.scrollY >= 64) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  else{
    header.classList.remove("scrolled");
  }
}
checkHeaderScroll()
window.addEventListener("scroll", checkHeaderScroll);
window.addEventListener("resize", checkHeaderScroll);

document.querySelectorAll('.header__catalog-open, .header__bg').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('header').classList.toggle('show-catalog');
  });
});
document.querySelector(".header__burger").addEventListener("click", function () {
  document.querySelector(".header").classList.toggle("header-menu-opened");
});

const headerBox = document.querySelector(".header__box");
const headerCatalog = document.querySelector(".header__catalog");
const headerMenu = document.querySelector(".header__menu");
const originalBoxParent = document.querySelector(".header__end");
const originalCatalogParent = document.querySelector(".header__content");
let isBoxMoved = false;
let isCatalogMoved = false;
function moveHeaderElements() {
  if (window.innerWidth < 768) {
    if (!isBoxMoved) {
      headerMenu.appendChild(headerBox);
      isBoxMoved = true;
    }
    if (!isCatalogMoved) {
      headerMenu.appendChild(headerCatalog);
      isCatalogMoved = true;
    }
  } else {
    if (isBoxMoved) {
      originalBoxParent.appendChild(headerBox);
      isBoxMoved = false;
    }
    if (isCatalogMoved) {
      originalCatalogParent.appendChild(headerCatalog);
      isCatalogMoved = false;
    }
  }
}
moveHeaderElements();
window.addEventListener("resize", moveHeaderElements);



document.addEventListener('DOMContentLoaded', () => {
    const headerBasket = document.querySelector('.header__busket');
    if(document.querySelector('.cart')){
      const cart = document.querySelector('.cart');
      const cartInner = document.querySelector('.cart__inner');
      const cartClose = document.querySelector('.cart__close');
      headerBasket.addEventListener('click', () => {
          cart.classList.add('active');
      });
      cartClose.addEventListener('click', () => {
          cart.classList.remove('active');
      });
      document.addEventListener('click', (event) => {
          if (!cartInner.contains(event.target) && !headerBasket.contains(event.target)) {
              cart.classList.remove('active');
          }
      });
    }

});


document.querySelectorAll('.popupOrder__form-input').forEach(input => {
  input.addEventListener('input', () => {
    input.classList.toggle('not-empty', input.value.trim() !== '');
  });
});




document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.reviewsPopup__form-stars label');
    const ratingInput = document.querySelector('.reviewsPopup__form-stars input[name="star"]');
    let currentRating = 1;
    ratingInput.value = currentRating;
    updateStarColors(currentRating);

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            currentRating = index + 1;
            ratingInput.value = currentRating;
            updateStarColors(currentRating);
        });
        star.addEventListener('mouseover', () => {
            updateStarColors(index + 1);
        });
        star.addEventListener('mouseout', () => {
            updateStarColors(currentRating);
        });
    });

    function updateStarColors(rating) {
        stars.forEach((star, index) => {
            const path = star.querySelector('svg path');
            if (index < rating) {
                path.setAttribute('fill', '#31BBDC');
            } else {
                path.setAttribute('fill', '#0F181E');
            }
        });
    }

    const fileInput = document.querySelector('.reviewsPopup__form-file input[type="file"]');
    const fileLabel = document.querySelector('.reviewsPopup__form-file label');
    const fileContent = document.querySelector('.reviewsPopup__form-file--content');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                fileLabel.classList.add('hide');
                const item = document.createElement('div');
                item.className = 'reviewsPopup__form-file--item';
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = '';
                const closeButton = document.createElement('button');
                item.appendChild(img);
                item.appendChild(closeButton);
                fileContent.innerHTML = '';
                fileContent.appendChild(item);
                closeButton.addEventListener('click', () => {
                    fileContent.innerHTML = '';
                    fileInput.value = '';
                    fileLabel.classList.remove('hide');
                });
            };
            reader.readAsDataURL(file);
        }
    });
});