function toggleText() {
  const btn = document.querySelector('button');
      
  btn.addEventListener('click', () => {
    const text = document.querySelector('#text')

    text.hidden = !text.hidden
  });
}
