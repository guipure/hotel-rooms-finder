class Carousel {
    constructor(element) {
        this.carousel = element;
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
        let prev = this.carousel.querySelector('.js-carousel__prev');
        let next = this.carousel.querySelector('.js-carousel__next');
        let dots = Array.from(this.carousel.querySelectorAll('.js-carousel__dot'));
        prev.addEventListener('click', () => this.plusSlides(-1))
        next.addEventListener('click', () => this.plusSlides(1))
        dots.map((dot, i) => dot.addEventListener('click', () => this.currentSlide(i)));
    }


    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }
      
      
    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }
      
      
    showSlides(n) {
        let i;
        const slides = this.carousel.getElementsByClassName('js-carousel__image');
        const dots = this.carousel.getElementsByClassName('js-carousel__dot');
        if (n > slides.length) {this.slideIndex = 1}
          if (n < 1) {this.slideIndex = slides.length}
          for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
          }
          for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" js-carousel__dot_active", "");
          }
        slides[this.slideIndex-1].style.display = "block";
        dots[this.slideIndex-1].className += " js-carousel__dot_active";
    }
}


const carousels = Array.from(document.querySelectorAll('.js-carousel'));
carousels.forEach(carousel => new Carousel(carousel));