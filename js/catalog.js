const rangeMin = document.getElementById('range-min');
const rangeMax = document.getElementById('range-max');
const priceStart = document.getElementById('price-start');
const priceEnd = document.getElementById('price-end');
const track = document.querySelector('.catalog__filter-track::before');
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
function parseFormattedNumber(str) {
  return parseInt(str.replace(/\s/g, ''));
}
function setSliderFill() {
  const min = parseInt(rangeMin.min);
  const max = parseInt(rangeMin.max);
  const minVal = parseInt(rangeMin.value);
  const maxVal = parseInt(rangeMax.value);

  const percent1 = ((minVal - min) / (max - min)) * 100;
  const percent2 = ((maxVal - min) / (max - min)) * 100;

  const track = document.querySelector('.catalog__filter-track');
  track.style.background = `
    linear-gradient(
      to right,
      #141E24 0%,
      #141E24 ${percent1}%,
      #00cfff ${percent1}%,
      #00cfff ${percent2}%,
      #141E24 ${percent2}%,
      #141E24 100%
    )
  `;
}
function syncInputs() {
  let minVal = parseInt(rangeMin.value);
  let maxVal = parseInt(rangeMax.value);
  if (minVal > maxVal - 100) {
    minVal = maxVal - 100;
    rangeMin.value = minVal;
  }
  if (maxVal < minVal + 100) {
    maxVal = minVal + 100;
    rangeMax.value = maxVal;
  }
  priceStart.value = formatNumber(minVal);
  priceEnd.value = formatNumber(maxVal);
  setSliderFill();
}
rangeMin.addEventListener('input', syncInputs);
rangeMax.addEventListener('input', syncInputs);
priceStart.addEventListener('input', () => {
  rangeMin.value = parseFormattedNumber(priceStart.value);
  syncInputs();
});
priceEnd.addEventListener('input', () => {
  rangeMax.value = parseFormattedNumber(priceEnd.value);
  syncInputs();
});

window.addEventListener('load', () => {
  priceStart.value = formatNumber(rangeMin.value);
  priceEnd.value = formatNumber(rangeMax.value);
  setSliderFill();
});



document.querySelectorAll('.catalog__filter-title').forEach(title => {
  title.addEventListener('click', () => {
    const parent = title.closest('.catalog__filter-block');
    if (parent) {
      parent.classList.toggle('active');
    }
  });
});

const filterOpenBtn = document.querySelector('.catalog__filter-open');
const filterCloseBtn = document.querySelectorAll('.catalog__filter-close, .catalog__filter-back');
const filterBlock = document.querySelector('.catalog__filter');
const filterContent = document.querySelector('.catalog__filter-content');
filterOpenBtn.addEventListener('click', () => {
  filterBlock.classList.add('active');
});
filterCloseBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBlock.classList.remove('active');
  });
});
document.addEventListener('click', (e) => {
  if (
    filterBlock.classList.contains('active') &&
    !filterContent.contains(e.target) &&
    !filterOpenBtn.contains(e.target)
  ) {
    filterBlock.classList.remove('active');
  }
});