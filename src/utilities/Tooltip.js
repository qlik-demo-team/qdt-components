const Tooltip = class {
  constructor() {
    this.div = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      show: false,
      element: document.getElementsByClassName('qdt-tooltip'),
    };
  }
  create() {
    try {
      const div = document.createElement('div');
      div.setAttribute('class', 'qdt-tooltip');
      document.body.appendChild(div);
    } catch (error) {
      console.log(error);
    }
  }
  show(data) {
    try {
      const { div } = this;
      div.element[0].style.display = 'inline-block';
      if (data) {
        const text = `${data[0].values[0].qText}: ${data[1].values[0]}`;
        div.element[0].innerHTML = text;
        const rect = div.element[0].getBoundingClientRect();
        div.w = rect.width;
        div.h = rect.height;
      }
      div.element[0].style.position = 'absolute';
      div.element[0].style.top = `${div.y - div.h - 10}px`;
      div.element[0].style.left = `${(div.x - (div.w / 2))}px`;
    } catch (error) {
      console.log(error);
    }
  }
  hide() {
    try {
      const { div } = this;
      if (div.element[0]) {
        div.element[0].style.display = 'none';
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default Tooltip;
