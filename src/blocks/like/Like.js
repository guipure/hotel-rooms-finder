import bind from 'bind-decorator';

class Like {
  constructor(element) {
    this._init(element);
  }

  _init(element) {
    element.addEventListener('click', this._handleLikeClick);
  }

  @bind
  _handleLikeClick(event) {
    const likeDiv = event.currentTarget;
    const iconSpan = likeDiv.querySelector('.js-like__icon');
    const numberSpan = likeDiv.querySelector('.js-like__number');

    likeDiv.classList.toggle('like_liked');
    this._iconToggle(iconSpan);
    this._numberToggle(numberSpan);
  }

  _iconToggle(iconSpan) {
    iconSpan.innerHTML = iconSpan.innerHTML === 'favorite_border' ? 'favorite' : 'favorite_border';
  }

  _numberToggle(numberSpan) {
    const number = Number(numberSpan.innerHTML);
    const isLiked = !!numberSpan.closest('.like_liked');
    numberSpan.innerHTML = isLiked ? (number + 1).toString() : (number - 1).toString();
  }
}

export { Like };
