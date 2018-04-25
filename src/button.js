export default () => {
  const btn = document.createElement('button')
  btn.classList.add('btn')
  btn.classList.add('pure-button')
  btn.innerText = 'click'
  return btn
}