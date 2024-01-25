'use strict';

// Variables
const hamburger = document.getElementById('hamburger');
const sideBar = document.querySelector('.side-bar');
const cartNotify = document.querySelector('.cart-notification');
const cartImageNotify = document
  .querySelector('.nav-cart')
  .querySelector('img');
const cartLog = document.querySelector('.cart-log');
const emptyCart = document.querySelector('.empty-cart');
const filledCart = document.querySelector('.filled-cart');
const imageDisplay = document
  .querySelector('.img-display')
  .querySelector('img');
const heroCont = document.querySelector('.thumb-display');
const allThumb = document.querySelectorAll('.thumb');
const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
const cartBtn = document.querySelector('.cart-btn');
const discountPrice = document.querySelector('.discount').textContent;
const cartWrap = document.querySelector('.cart-wrap');
let quantity = document.querySelector('.quantity').textContent;

// Functions

const deleteInputCart = function () {
  cartWrap.innerHTML = '';
  emptyCart.classList.remove('hidden');
  cartNotify.classList.add('hidden');
  document.querySelector('.quantity').textContent = 0;
  quantity = 0;
};

const inputCart = function (quantity, price) {
  cartWrap.innerHTML = `<div class="filled-cart cart-items">
  <div class="cart-description">
    <img
      src="./images/image-product-1-thumbnail.jpg"
      alt="product"
      class="product"
    />
    <div class="item-detail">
      <p>Fall Limited Edition Sneakers</p>
      <p>$125.00 &times; ${quantity} <span>${price * quantity}.00</span></p>
    </div>
    <img
      src="./images/icon-delete.svg"
      alt="delete"
      class="delete-btn"
    />
  </div>
  <button type="submit" class="checkout-btn">Checkout</button>
</div>`;
};

// Event Listeners
minus.addEventListener('click', function () {
  if (quantity <= 0) return;
  quantity--;
  document.querySelector('.quantity').textContent = quantity;
});

plus.addEventListener('click', function () {
  if (quantity <= 9) {
    quantity++;
  }
  document.querySelector('.quantity').textContent = quantity;
});

cartBtn.addEventListener('click', function () {
  const price = Number.parseFloat(discountPrice.replace(/[^0-9.]/g, ''));

  if (quantity !== '0') {
    emptyCart.classList.add('hidden');
    cartNotify.classList.remove('hidden');
    cartNotify.textContent = quantity;
    inputCart(quantity, price);
  }

  if (quantity === 0) {
    deleteInputCart();
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  sideBar.classList.toggle('active');
});

cartWrap.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('delete-btn') ||
    e.target.classList.contains('checkout-btn')
  )
    deleteInputCart();
});

window.addEventListener('click', function (e) {
  const cartImgClicked = cartImageNotify.contains(e.target);
  const cartLogClicked = cartLog.contains(e.target);

  if (cartImgClicked) {
    cartLog.classList.toggle('hidden');
  } else {
    cartLog.classList.add('hidden');
  }

  if (cartLog.classList.contains('hidden') && cartLogClicked) {
    cartLog.classList.remove('hidden');
  }

  if (cartImgClicked) {
    sideBar.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

heroCont.addEventListener('click', function (e) {
  const thumb = e.target;
  if (!thumb.classList.contains('thumb')) return;
  imageDisplay.src = `/images/image-product-${thumb.dataset.number}.jpg`;

  allThumb.forEach(c => {
    c.classList.remove('img-active');
    thumb.classList.add('img-active');
  });
});

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const prev = document.querySelector('.slider__btn--left');
  const next = document.querySelector('.slider__btn--right');
  let curSlide = 0;
  const maxSlide = slides.length;
  console.log(slides.length);

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };

  // Prev Slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };

  init();

  next.addEventListener('click', nextSlide);
  prev.addEventListener('click', prevSlide);
};

slider();
