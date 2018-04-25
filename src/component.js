import button from './button'
import i from './icon'

export default (text = 'hello,Webpack') => {
  const ele = document.createElement('div')
  ele.innerText = text+ ''
  ele.appendChild(button())
  ele.appendChild(i())
  return ele
}