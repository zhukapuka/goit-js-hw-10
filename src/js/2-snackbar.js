import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = parseInt(form.elements.delay.value);
  const state = form.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  promise
    .then(message => {
      iziToast.success({
        message: `:white_tick: ${message}`,
        position: 'topRight',
      });
    })
    .catch(message => {
      iziToast.error({
        message: `:x: ${message}`,
        position: 'topRight',
      });
    });
  form.reset();
});
