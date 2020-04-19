const toggles = document.querySelectorAll('.js-toggle');
toggles.forEach((toggle) => toggle.addEventListener('click', (e) => toggleClassName(e)))

function toggleClassName(event) {
    const toggleDiv = event.currentTarget;
    const toggleBtn = toggleDiv.firstElementChild;
    toggleBtn.classList.toggle('js-toggle__btn_on');
}