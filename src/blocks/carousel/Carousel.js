class Carousel {
  constructor(element) {
    this._init(element);
    this._showSlides(this.slideIndex);
    this._addEventListeners();
  }

  _init(element) {
    this.carousel = element;
    this.slideIndex = 1;
  }

  _addEventListeners() {
    const prev = this.carousel.querySelector('.js-carousel__button-prev');
    prev.addEventListener('click', this._handleArrowClick.bind(this, -1));

    const next = this.carousel.querySelector('.js-carousel__button-next');
    next.addEventListener('click', this._handleArrowClick.bind(this, 1));

    const dots = Array.from(
      this.carousel.querySelectorAll('.js-carousel__dot')
    );
    dots.map((dot, i) =>
      dot.addEventListener('click', this._handleDotClick.bind(this, i + 1))
    );
  }

  _handleArrowClick(n) {
    this._showSlides((this.slideIndex += n));
  }

  _handleDotClick(n) {
    this._showSlides((this.slideIndex = n));
  }

  _showSlides(n) {
    let i;
    const slides = this.carousel.getElementsByClassName('js-carousel__image');
    const dots = this.carousel.getElementsByClassName('js-carousel__dot');

    n > slides.length && (this.slideIndex = 1);
    n < 1 && (this.slideIndex = slides.length);

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(
        ' carousel__dot_active',
        ''
      );
    }

    slides[this.slideIndex - 1].style.display = 'block';
    dots[this.slideIndex - 1].className += ' carousel__dot_active';
  }
}

export { Carousel };
