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

## API
```js
Keyboard.start: start to listen the keypress event
Keyboard.end:  end to listen keypress event and clean some resource
Keyboard.registe: registe(bind) the keyboard binding
Keyboard.unregiste: remove the register by name
```

## LICENSE
MIT
