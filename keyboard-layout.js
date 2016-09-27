"use strict"

if (typeof module !== 'undefined') module.exports = simpleheat;
if (typeof define === 'function') { define('KeyboardLayout', [], function () { return KeyboardLayout }) }

var Layout = {
  default: [
      [{key: "Escape", text: "Esc"}, "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Home", "End", "Insert", "Delete"],
      ["~ `", "! 1", "@ 2", "# 3", "$ 4", "% 5", "^ 6", "& 7", "* 8", "( 9", ") 0", "_ -", "+ =", "Backspace"],
      ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{ [", "} ]", "| \\"],
      ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", "\: ;", "\" '", "Enter"],
      ["Shift", "Z", "X", "C", "V", "B", "N", "M", "< ,", "> .", "? /", "Shift"],
      [{key: "WakeUp", text: "Fn"}, {key: "Control", text: "Ctrl"}, {key: "Meta", text: "Win"}, "Alt", {key: " ", text: "Space"}, "Alt", {key: "PrintScreen", text: "PrtSc"}, {key: "Control", text: "Ctrl"}, {key: "PageUp", text: "PgUp"}, {key: "ArrowUp", text: "Up"}, {key: "PageDown", text: "PgDn"}],
      [{key: "ArrowLeft", text: "Left"}, {key: "ArrowDown", text: "Down"}, {key: "ArrowRight", text: "Right"}]
    ]
}

function KeyboardLayout ($elt, keyboardType) {

  if (!(this instanceof KeyboardLayout)) return new KeyboardLayout()
  this.specialKeys =
    ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
     "CapsLock", "Control", "Option", "Command", "Alt", "Shift",
     "Escape", "Home", "End", "Insert", "Delete",
     "Tab", "Backspace", "Enter",
     "Win", "WakeUp", " ", "PrintScreen", "Meta",
     "PageUp", "PageDown", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"] // modifier && functional
  this.keys = Layout[keyboardType]
  this.$elt = $elt
  this.kbd = new Keyboard({ DEBUG: true })
  this.kbd.start(this.keyDown.bind(this), this.keyUp.bind(this))

  this.init()

  this.$kbd = $elt.querySelector('.keyboard')
  this.ctrlKey = false
  this.shiftKey = false
  this.altKey  = false
  this.metaKey = false
  this.mouseDownEvents = [] // the mouseup event sometimes is different from the mousedown event when user moves the mouse until press the mouse up.

  this.$kbd.addEventListener('mousedown', this.mouseDown.bind(this))
  this.$kbd.addEventListener('mouseup', this.mouseUp.bind(this))

}

KeyboardLayout.prototype = {

  init: function () {
    const keys = this.keys
    const _this = this
    const klHTML = '<div class="keyboard">' +
          keys.map(function (rows) {
            let len = rows.length
            return '<div class="row">' +
              rows.map(function (key) {
                return _this.createKey(key)
              }).join(' ') + '</div>'
          }).join(' ') + '</div>'
    this.$elt.innerHTML = klHTML
  },

  createKey: function (o) {
    var _key, _text, upKey, upKeyText, downKey, downKeyText
    if (typeof o === 'object') {
      var _k = [' '], _t = ['Space']
      _key = o.key
      _text = o.text
      if (_key !== " " && _text !== " ") {
        _k = _key.split(' ')
        _t = _text.split(' ')
      }
      upKey = _k[0] || ""
      downKey = _k[1] || ""
      upKeyText = _t[0] || ""
      downKeyText = _t[1] || ""
    } else {
      var _k2 = [' ']
      if (o !== ' ') _k2 = o.split(' ')
      upKey = _k2[0]
      upKeyText = _k2[0] || ""
      downKey = _k2[1]
      downKeyText = _k2[1] || ""
    }
    return '<div '+ (this.specialKeys.indexOf(upKey) < 0 ?
                     'class="key char-key"':
                     'class="key special-key"') + '>' +
      '<span class="up-key" value="key-'+encodeURIComponent(upKey)+'">'+upKeyText+'</span>' +
      '<span '+ (downKey === '' ?
                 'class="down-key null-key" value="key-null"' :
                 'class="down-key" value="key-'+encodeURIComponent(downKey)+'"') + '>' + downKeyText +'</span>' + '</div>'
  },

  getKeyDOMByKey: function (key) {
    var _k = encodeURIComponent(key)
    if (this.specialKeys.indexOf(key) < 0) {
      // char key
      // TODO: if do according shiftKey
      _k = encodeURIComponent(key.toUpperCase())
    }
    return this.$elt.querySelector('[value="key-'+ _k +'"]').parentElement
  },

  activeKey: function (key) {
    var $t = this.getKeyDOMByKey(key)
    $t.className = $t.className + ' active'
  },
  inactiveKey: function (key) {
    var $t = this.getKeyDOMByKey(key)
    $t.className = $t.className.replace(/\s*active\s*/g, "")
  },

  bindKeyUp: function (cb) {
    this.keyUpCallback = cb
  },
  bindKeyDown: function (cb) {
    this.keyDownCallback = cb
  },
  createKeyboardEvent: function (type, ev, _ev) {
    var $target
    if (_ev) $target = _ev.target
    else $target = ev.target

    var value = $target.attributes.value
    if (typeof value === 'undefined') {
      // click <div class="key" /> the wrapper
      $target = $target.firstChild
      value = $target.attributes.value
    }
    if (typeof value === 'undefined') return // click the blank area, not the key
    value = value.value.split('-')[1]
    if (value === 'null' || value === 'undefined') {
      // TODO: temporary
      $target = $target.previousElementSibling
      value = $target.attributes.value.value.split('-')[1]
    }
    var kev = new KeyboardEvent(type, {
      key: decodeURIComponent(value),
      timeStamp: !!window.CustomEvent ? new CustomEvent('test').timeStamp : document.createEvent('KeyboardEvent').timeStamp,
      ctrlKey: this.ctrlKey,
      shiftKey: this.shiftKey,
      altKey: this.altKey,
      metaKey: this.metaKey
    })
    document.dispatchEvent(kev)
  },
  mouseDown: function (ev) {
    this.mouseDownEvents.push(ev)
    this.createKeyboardEvent('keydown', ev)
  },
  mouseUp: function (ev) {
    var _ev = this.mouseDownEvents.shift()
    this.createKeyboardEvent('keyup', ev, _ev)
  },
  keyDown: function (ev) {
    ev.preventDefault()
    ev.stopPropagation()
    var key = ev.key
    this.activeKey(key)
    if (typeof this.keyDownCallback === 'function') this.keyDownCallback(ev, this.getKeyInfo(key))
  },
  keyUp: function (ev) {
    ev.preventDefault()
    ev.stopPropagation()
    var key = ev.key
    this.inactiveKey(key)
    if (typeof this.keyUpCallback === 'function') this.keyUpCallback(ev, this.getKeyInfo(key))
  },
  getKeyInfo: function (key) {
    var $kbd = this.$kbd
    var $t = this.getKeyDOMByKey(key)
    var b1 = $kbd.getBoundingClientRect()
    var b2 = $t.getBoundingClientRect()
    var x = b2.left + (b2.width / 2) - b1.left
    var y = b2.top + (b2.height / 2) - b1.top
    return {
      x: x, y: y, statistic: this.kbd.getStatistic()[key]
    }
  }
}
