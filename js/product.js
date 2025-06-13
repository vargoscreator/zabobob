document.addEventListener('DOMContentLoaded', () => {
    const reviewsPopup = document.querySelector('.reviewsPopup');
    const reviewsPopupInner = document.querySelector('.reviewsPopup__inner');
    const reviewsPopupClose = document.querySelector('.reviewsPopup__close');
    const reviewsPopupOpen = document.querySelector('.reviewsPopup-open');
    reviewsPopupOpen.addEventListener('click', () => {
        reviewsPopup.classList.add('active');
    });
    function closePopup(event) {
        if (event.target === reviewsPopupClose || !reviewsPopupInner.contains(event.target)) {
            reviewsPopup.classList.remove('active');
        }
    }
    reviewsPopupClose.addEventListener('click', closePopup);
    reviewsPopup.addEventListener('click', closePopup);

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
                path.setAttribute('fill', '#85898B');
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

    const thumbnailSlider = new Swiper('.product__slider-thumbnail', {
        spaceBetween: 10,
        slidesPerView: "auto",
        watchSlidesProgress: true,
    });

    const mainSlider = new Swiper('.product__slider', {
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.product__slider-next',
            prevEl: '.product__slider-prev',
        },
        thumbs: {
            swiper: thumbnailSlider,
        },
    });

    const videoBlock = document.querySelector('.videoBlock__video');
    const playButton = videoBlock.querySelector('.videoBlock__video-start');
    const video = videoBlock.querySelector('video');
    playButton.addEventListener('click', () => {
        video.play();
        video.setAttribute('controls', '');
        playButton.style.display = 'none';
    });

    let productAboutSwiper = new Swiper(".productAbout__slider", {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 1,
        pagination:{
            el: '.productAbout__slider-pagination'
        },
        navigation: {
            nextEl: '.productAbout__slider-next',
            prevEl: '.productAbout__slider-prev',
        },
    });
    const tabButtons = document.querySelectorAll('.reviewProduct__info-item');
    const tabContents = document.querySelectorAll('.reviewProduct__left-content');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.dataset.reviewSelect;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabContents.forEach(content => {
                if (content.dataset.reviewContent === target) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
});