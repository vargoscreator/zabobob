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

document.querySelectorAll('.header__catalog-open').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('header').classList.toggle('show-catalog');
  });
});
document.querySelector('.header__bg').addEventListener('click', () => {
  document.querySelector('header').classList.remove('show-catalog');
      document.querySelector('header').classList.remove('header-menu-opened');
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

    if(document.querySelectorAll('.reviews__slider')){
      let reviewsSwiper = new Swiper(".reviews__slider", {
            loop: true,
            spaceBetween: 20,
            slidesPerView: 1,
            navigation: {
                nextEl: ".reviews__next",
                prevEl: ".reviews__prev",
            },
            pagination:{
                el: '.reviews__slider-pagination'
            },
            breakpoints: {
                768: {
                    spaceBetween: 30,
                    slidesPerView: 2,
                },
                1280: {
                    spaceBetween: 25,
                    slidesPerView: 3,
                },
            },
        });
    }

    if(document.querySelectorAll('.productSlider__slider')){
      let productSliderSwiper = new Swiper(".productSlider__slider", {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 2,
      navigation: {
          nextEl: ".productSlider__next",
          prevEl: ".productSlider__prev",
      },
      pagination:{
          el: '.productSlider__pagination'
      },
      breakpoints: {
          1000: {
              slidesPerView: 3,
          },
          1280: {
              spaceBetween: 24,
              slidesPerView: 4,
          },
      },
    });
    }
    

    document.querySelectorAll('.popupOrder__form-input').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.toggle('not-empty', input.value.trim() !== '');
      });
    });

    document.querySelectorAll('.faq__item-title').forEach(title => {
      title.addEventListener('click', function() {
        const item = this.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq__item').forEach(el => el.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
});
    



document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('.popupOrder')){
      const popupOrder = document.querySelector('.popupOrder');
      const popupOrderInner = document.querySelector('.popupOrder__inner');
      const popupOrderClose = document.querySelector('.popupOrder__close');
      const popupOrderOpen = document.querySelector('.popupOrder-open');
      popupOrderOpen.addEventListener('click', () => {
          popupOrder.classList.add('active');
      });
      function closePopup(event) {
          if (event.target === popupOrderClose || !popupOrderInner.contains(event.target)) {
              popupOrder.classList.remove('active');
          }
      }
      popupOrderClose.addEventListener('click', closePopup);
      popupOrder.addEventListener('click', closePopup);
    }    
});
