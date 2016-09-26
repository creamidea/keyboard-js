// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
  baseUrl: './',
  paths: {
    Keyboard: '../keyboard',
    KeyboardLayout: '../keyboard-layout',
    simpleheat: './simpleheat/simpleheat'
  }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['Keyboard', 'KeyboardLayout', 'simpleheat'], function (Keyboard, KeyboardLayout, simpleheat) {

  var kbdLayout = new KeyboardLayout(
    document.querySelector('#keyboard-layout'), "default")

  var boundingClientRect = kbdLayout.$kbd.getBoundingClientRect()
  var canvas = document.createElement('canvas')
  document.querySelector('body').appendChild(canvas)
  canvas.id = "heatmap"
  canvas.style.position = 'absolute'
  canvas.style.pointerEvents = 'none'
  canvas.style.top = boundingClientRect.top + 'px'
  canvas.style.left = boundingClientRect.left + 'px'
  canvas.width = boundingClientRect.width
  canvas.height = boundingClientRect.height
  // canvas.style.zIndex = 10

  function Log() {
    var keyboardInfo = document.querySelector('#keyboard-info')
    var log = keyboardInfo.querySelector('ul')
    return function (key, statistic) {
      var count = statistic.count
      var average = statistic.average
      var li = document.createElement('li')
      li.innerHTML = '<kbd>'+key+'</kbd><div><p><span class="avg">avg: </span><span class="value">'+average.toFixed(2)+'</span>ms</p><p><span class="count">count: </span><span class="value">'+count+'</span></p></div>'
      log.insertBefore(li, log.firstChild)
      if (log.children.length > 10) {
        log.lastChild.remove()
      }

    }
  }

  var log = Log()
  var heat = new simpleheat('heatmap').max(100)
  heat.radius(10, 60)
  kbdLayout.bindKeyUp(function (ev, option) {
    var key = ev.key
    var statistic = option.statistic
    if (key === " ") key = "Space"
    heat.add([option.x, option.y, statistic.count])
    window.requestAnimationFrame(heat.draw.bind(heat))
    log(key, statistic)
  })
});

// some knowledge points
// drawImage(image, dx, dy)
// drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
// rlt = getImageData(x, y, width, height)
// rlt.data[i][0,1,2,3] -> R,G,B,Alpha

// putImageData(imgData, x, y)

// createLinearGradient(x0, y0, x1, y1)
// start(x0, y0) end(x1, y1)
// x0=y0=0 && x1=y1=100 -> diagonal
