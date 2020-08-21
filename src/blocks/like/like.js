const likes = document.querySelectorAll('.js-like');
likes.forEach((like) => like.addEventListener('click', handleLikeClick));

function handleLikeClick(event) {
  const likeDiv = event.currentTarget;
  const iconSpan = likeDiv.querySelector('.js-like__icon');
  const numberSpan = likeDiv.querySelector('.js-like__number');
  likeDiv.classList.toggle('like_liked');
  iconToggle(iconSpan);
  numberToggle(numberSpan);
}

function iconToggle(iconSpan) {
  iconSpan.innerHTML = iconSpan.innerHTML === 'favorite_border' ? 'favorite' : 'favorite_border';
}

function numberToggle(numberSpan) {
  const number = Number(numberSpan.innerHTML);
  const isLiked = !!numberSpan.closest('.like_liked');
  numberSpan.innerHTML = isLiked ? (number + 1).toString() : (number - 1).toString();
}
