export default function promiseClick(button) {
  let promise = new Promise((resolve) => resolve() )
  button.addEventListener('click', (event) => {
    return promise.then(event)
  }, { once: true });
}
