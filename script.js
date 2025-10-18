const input = document.getElementById('inputField');
const banner = document.getElementById('banner');

input.addEventListener('focus', () => {
  banner.style.opacity = '1';
});

input.addEventListener('blur', () => {
  banner.style.opacity = '0';
});