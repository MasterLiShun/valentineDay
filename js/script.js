(() => {
  'use strict';
  window.addEventListener('DOMContentLoaded', () => {
    const CANVAS = document.getElementById('c'),
          C = CANVAS.getContext('2d'),
          spans = document.getElementsByTagName('span'),
          h2 = document.getElementsByTagName('h2')[0];
    
    /**
     * operate dom. add class.
     */
    for (let i = 0; i < spans.length; i++) {
      spans[i].classList.add('delay');
    }
    h2.classList.add('delay');
    
    let w = CANVAS.width = window.innerWidth,
        h = CANVAS.height = window.innerHeight,
        hw = w / 2, // center width
        hh = h / 2, // center height
        version = 'line', // version particle or line
        x = 0, // init x
        y = 0, // init y
        r = 5, // particle radius or line width
        maxR = 15, // radius or line width
        s = 500, // scale
        itr = 720, // number of iteration
        color = 350, // init color
        gco = 'lighter', // global composite operation value
        t = Date.now(), // time into math
        tScale = 100;
    
    /**
     * draw particle.
     * @param {Number} x, y | Vectors
     */
    const particle = (x, y) => {
      C.beginPath();
      C.arc(x * s, y * s, r, 0, Math.PI * 2, false);
      C.fill();
    };
    
    /**
     * draw line.
     * @param {Number} x, y, i | Vectors, index
     */
    const line = (x, y, i) => {
      if (i === 0) {
        C.beginPath();
        C.moveTo(x * s, y * s);
      } else {
        C.lineTo(x * s, y * s);
      }
      if (i === itr - 1) C.stroke();
    };
    
    /**
     * draw all.
     */
    const draw = () => {
      C.save();
      C.fillStyle = 'hsl(' + color +', 80%, 60%)';
      C.strokeStyle = 'hsl(' + color +', 80%, 60%)';
      C.lineWidth = r;
      C.globalCompositeOperation = gco;
      C.translate(hw, hh);
      C.rotate(180 * Math.PI / 180);
      for (let i = 0; i < itr; i++) {
        const rad = i * Math.PI / 180;
        const rand = 1 - (Math.random() * Math.random());
        /**
         * Formula of Heart
         * Referenced / https://mathworld.wolfram.com/HeartCurve.html
         */
        const nx = 16 * Math.sin(rad) * Math.sin(rad) * Math.sin(rad);
        const ny = 13 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad);
        
        x = nx * rand;
        y = ny * rand;
        if (version === 'particle') particle(x, y);
        if (version === 'line') line(x, y, i);
      }
      C.restore();
    };
    
    /**
     * update parameters.
     */ 
    const update = () => {
      color = Math.sin(t / 3000) * 360;
      r = Math.sin(t / tScale) * maxR + 1;
      t = Date.now();
      if (s > 10) s -= 5;
      if (s < 10) s = 10;
      /**
       * If value is negative, reverse these.
       */
      if (r < 0) r *= -1;
      if (color < 0) color *= -1;
    };
    
    /**
     * rendering.
     */
    const render = () => {
      /**
       * clear canvas.
       */
      //C.clearRect(0, 0, w, h);
      
      /**
       * If need after image.
       */
      C.globalCompositeOperation = 'darken';
      C.globalAlpha = 0.1;
      C.fillStyle = 'rgb(0, 0, 0)';
      C.fillRect(0, 0, w, h);
      C.globalCompositeOperation = 'source-over';
      C.globalAlpha = 1;
      
      draw();
      update();
      window.requestAnimationFrame(render);
    };
    
    render();
    
    /**
     * If window size is changed, change these.
     */
    window.addEventListener('resize', () => {
      w = CANVAS.width = window.innerWidth;
      h = CANVAS.height = window.innerHeight;
      hw = w / 2;
      hh = h / 2;
    }, false);
  }, false);
})();