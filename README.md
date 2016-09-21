# keyboard-js

A little library for keyboard binding. 
**Now, it just supports chrome**. 

If you want to support more browsers or nodejs platform, just fork it.

XD

## Usage
```js
var Keyboard = require('./keyboard-js/').Keyboard
var keyboard = new Keyboard() // pay more attention: singal instance

// when you hit <kbd>Shift+b</kbd> or <kbd>Shift+e</kbd> will print `> test uk successfully`.
keyboard.registe('uk', function () {
    console.log('test uk successfully.')
}, ["Shift", "b"], ["Shift", "e"])

// start to listen
keyboard.start()

// have fun :)
```

## LICENSE
MIT
