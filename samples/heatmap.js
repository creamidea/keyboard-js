// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
  baseUrl: './',
  paths: {
    Keyboard: '../keyboard',
    KeyboardLayout: '../keyboard-layout',
    KeyboardLayoutDefault: '../keyboard-layout/default',
    // KeyboardLayoutMac: '../keyboard-layout/mac',
    simpleheat: './simpleheat/simpleheat'
  },
  shim: {
    'simpleheat': {
      exports: 'simpleheat'
    }
  }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['Keyboard', 'KeyboardLayout', 'KeyboardLayoutDefault', 'simpleheat'], function (Keyboard, KeyboardLayout, kbdLayoutConfig, simpleheat) {
  var kbdLayout = new KeyboardLayout(
    document.querySelector('#keyboard-layout'), kbdLayoutConfig)

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

  function Log(keyboardInfo) {
    var log = keyboardInfo.querySelector('ul')
    var st = keyboardInfo.querySelector('.statistic')
    var totalAvgTime = 0
    var totalCount = 0
    return function (key, statistic) {
      var count = statistic.count
      var average = statistic.average
      totalCount = totalCount + 1
      totalAvgTime = totalAvgTime + statistic.average
      totalAvg = +(totalAvgTime/totalCount).toFixed(2) || 0

      var li = document.createElement('li')
      li.className = "bounceIn animated"
      li.innerHTML = '<kbd>'+key+'</kbd><div><p><span class="avg">avg: </span><span class="value">'+average.toFixed(2)+'</span>ms</p><p><span class="count">count: </span><span class="value">'+count+'</span></p></div>'
      log.insertBefore(li, log.firstChild) // http://callmenick.com/post/prepend-child-javascript
      if (log.children.length > 10) {
        log.lastChild.remove()
      }
      st.innerHTML = '<div><span class="avg">Total Avg: </span><span class="value">'+totalAvg+' ms</span></div><div><span class="count">Total Count: </span><span class="value">'+totalCount+'</span></div>'
    }
  }

  function RandomEmoji ($elt) {
    var emojis = [
      127829, // >= 200
      128515, // < 200
      128516, // < 150
      128518, // < 130
      128526, // < 110
      128530, // < 90
      128544, // < 80
      128545, // < 70
      128107, // < 50 Good End
      128125  // Alien
    ]

    return function (key, statistic) {
      var time = statistic.average
      var emoji
      if (time > 200) {
        emoji = emojis[0]
      } else if (time > 150) {
        // 'SMILE'
        emoji = emojis[1]
      } else if (time > 130) {
        // 'SMILINGEYES'
        emoji = emojis[2]
      } else if (time > 110) {
        // 'TIGHTLYCLOSEDEYES'
        emoji = emojis[3]
      } else if (time > 90) {
        // 'SMILESUNGLASSES'
        emoji = emojis[4]
      } else if (time > 80) {
        // 'UNAMUSED'
        emoji = emojis[5]
      } else if (time > 70) {
        // 'ANGRY'
        emoji = emojis[6]
      } else if (time > 50) {
        // 'POUTING'
        emoji = emojis[7]
      } else if (time > 0) {
        // 'GOODEND'
        emoji = emojis[8]
      } else {
        // 'ALIEN'
        emoji = emojis[9]
      }
      $elt.innerHTML = '<p style="margin: 0" class="zoomIn animated">&#'+emoji+';</p>'
    }
  }

  var log = Log(document.querySelector('#keyboard-info'))
  var randomEmoji = RandomEmoji(document.querySelector('#input-content'))
  var heat = new simpleheat('heatmap').max(100)
  var userInput = document.querySelector('#user-input')
  heat.radius(10, 60)
  kbdLayout.bindKeyUp(function (ev, option, inputs) {
    var key = ev.key
    var statistic = option.statistic
    if (key === " ") key = "Space"
    heat.add([option.x, option.y, statistic.count])
    window.requestAnimationFrame(heat.draw.bind(heat))
    log(key, statistic)
    randomEmoji(key, statistic)
    window.requestAnimationFrame(function () {
      var pg = [], pgs = []
      for (var i = 0, len = inputs.length; i < len; i++) {
        if (inputs[i] === '\n') {
          pgs.push('<p>'+pg.join('')+'</p>')
          pg = []
        } else {
          pg.push(inputs[i])
          if (i === len - 1)
            pg.push('<span class=curosr>|</span>')
        }
      }
      pgs.push('<p>'+pg.join('')+'</p>')
      userInput.innerHTML = pgs.join('')
    })
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
