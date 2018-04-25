import button from './button'
import i from './icon'
import img from './img/1894897091-5834f2bab5271_articlex.jpg'

export default (text = 'hello,Webpack') => {
  const ele = document.createElement('div')
  ele.innerText = text+ ''
  ele.appendChild(button())
  ele.appendChild(i())
  return ele
}