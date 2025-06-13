document.addEventListener("DOMContentLoaded", function () {
    const bullets = document.querySelectorAll('.hero__slider-pagination span');
    
    let heroSwiper = new Swiper(".hero__slider", {
        loop: true,
        spaceBetween: 0,
        slidesPerView: 1,
        allowTouchMove: false,
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
});