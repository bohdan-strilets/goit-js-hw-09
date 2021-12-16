import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  inputs: document.querySelectorAll('input'),
};

function onSubmitForm(e) {
  e.preventDefault();

  const dataForm = {
    delay: refs.inputs[0].value,
    step: refs.inputs[1].value,
    amount: refs.inputs[2].value,
  };

  let step = 0;
  let delay = Number(dataForm.delay);

  setTimeout(() => {
    const intervalID = setInterval(() => {
      step += 1;
      if (step > 1) {
        delay += Number(dataForm.step);
      }

      createPromise(step, delay)
        .then(result => Notify.success(result))
        .catch(error => Notify.failure(error));

      if (step >= dataForm.amount) {
        clearInterval(intervalID);
      }
    }, dataForm.step);
  }, dataForm.delay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }
    reject(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}

refs.form.addEventListener('submit', onSubmitForm);
