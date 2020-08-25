import { Like } from './Like';

function onLoad() {
  const likes = document.querySelectorAll('.js-like');
  likes.forEach((like) =>  new Like(like));
}

window.addEventListener('load', onLoad);
