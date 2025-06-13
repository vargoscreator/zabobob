if (typeof AOS !== 'undefined') {
  AOS.init({
    once: true,
    duration: 800
  });
}
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


    if(typeof Swiper !== 'undefined' && document.querySelectorAll('.reviews__slider')){
        const siteButtons = document.querySelectorAll(".reviews__sites-item");
    const sliders = document.querySelectorAll(".reviews__slider");
    const paginations = document.querySelectorAll(".reviews__slider-pagination");

    const swiperInstances = {};

    sliders.forEach((slider, index) => {
      const id = slider.getAttribute("id");
      const pagination = paginations[index];

      swiperInstances[id] = new Swiper(`#${id}`, {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1,
        navigation: {
          nextEl: ".reviews__next",
          prevEl: ".reviews__prev",
        },
        pagination: {
          el: pagination,
          clickable: true,
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
    });

    function activateSlider(targetId) {
      sliders.forEach(slider => slider.classList.remove("active"));
      siteButtons.forEach(btn => btn.classList.remove("active"));
      paginations.forEach(pag => pag.classList.remove("active"));

      const targetSlider = document.getElementById(targetId);
      const targetSwiper = swiperInstances[targetId];

      if (targetSlider && targetSwiper) {
        targetSlider.classList.add("active");
        document.querySelector(`[data-review-select="${targetId}"]`).classList.add("active");
        const targetIndex = Array.from(sliders).findIndex(sl => sl.id === targetId);
        if (paginations[targetIndex]) {
          paginations[targetIndex].classList.add("active");
        }
        targetSwiper.update();
      }
    }
    siteButtons.forEach(button => {
      button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-review-select");
        activateSlider(targetId);
      });
    });
    const defaultBtn = document.querySelector(".reviews__sites-item.active");
    if (defaultBtn) {
      activateSlider(defaultBtn.getAttribute("data-review-select"));
    }
    }

    if(typeof Swiper !== 'undefined' && document.querySelectorAll('.productSlider__slider')){
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


    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      const animateItems = document.querySelectorAll('.hits__block .product__item, .blogs__item');
      gsap.set(animateItems, { opacity: 0, y: 50 });
      ScrollTrigger.batch(animateItems, {
          start: "top 80%",
          onEnter: batch => {
          gsap.to(batch, {
              opacity: 1,
              y: 0,
              stagger: 0.2,
              duration: 0.8,
              ease: "power3.out",
              overwrite: true
          });
          },
          once: true
      });
      const worksItems = gsap.utils.toArray(".categories__box");
      if (window.innerWidth >= 768) {
          worksItems.slice(0, -1).forEach((item) => {
              let height = item.querySelector('.categories__title').scrollHeight + 140 + "px";
              gsap.to(item, {
                  height: height,
                  ease: "none",
                  scrollTrigger: {
                      trigger: item,
                      start: "top 70px",
                      end: `+=100% +=${height}`,
                      scrub: true,
                      pin: true,
                      pinSpacing: false,
                      onLeave: () => gsap.set(item, { height: height })
                  }
              });
          });
      }

      if (window.innerWidth < 768) {
        const categoriesBoxItems = document.querySelectorAll('.categories__box');
        gsap.set(categoriesBoxItems, { opacity: 0, y: 50 });
        ScrollTrigger.batch(categoriesBoxItems, {
            start: "top 80%",
            onEnter: batch => {
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power3.out",
                overwrite: true
            });
            },
            once: true
        });
      }
    }
});

resizeHeight()
function resizeHeight(){
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', () => {
  resizeHeight()
});