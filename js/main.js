document.addEventListener("DOMContentLoaded", function () {
    const bullets = document.querySelectorAll('.hero__slider-pagination span');
    let heroSwiper = new Swiper(".hero__slider", {
        loop: true,
        spaceBetween: 0,
        slidesPerView: 1,
        allowTouchMove: false,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        speed: 500,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        on: {
            slideChange: function () {
            updateCustomPagination(this.realIndex);
            },
        }
    });
    function updateCustomPagination(index) {
        bullets.forEach((el, i) => {
            el.classList.toggle('active', i === index);
        });
    }
    bullets.forEach((el, index) => {
        el.addEventListener('click', () => {
            heroSwiper.slideToLoop(index, 500);
            updateCustomPagination(index);
        });
    });
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
});