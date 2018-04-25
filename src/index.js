import "purecss"
import component from './component'
import './scss/test.scss'

let demoComponent = component();
document.body.appendChild(demoComponent);

if (module.hot) {
  module.hot.accept("./component", () => {
    const nextComponent = component();
    document.body.replaceChild(nextComponent, demoComponent);
    demoComponent = nextComponent;
  });
}