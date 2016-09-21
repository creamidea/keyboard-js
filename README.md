# keyboard-js

A little library for keyboard binding. 
**Now, it just supports chrome**. 

If you want to support more browsers or nodejs platform, just fork it.

BTW, please pay more attention to the key combo.
You should avoid the key conflict.
For example, if you registe the **Shortcut Key: Shift + B**,
you will be confused when you hit <kbd>Shift</kbd> + <kbd>B</kbd> in the textarea.
So, be careful.

However, you can use `API::Keyboard.end()` to end when the textarea is focused
and use `API::Keyboard.start()` to restart when it blurs.
On the other hand, you can discard the **Shortcut Key: Shift + B**.

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

Or you can try it [here](https://creamidea.github.io/keyboard-js/).
And the source is [here](https://github.com/creamidea/keyboard-js/tree/master/samples)

## API
```js
Keyboard.start(): start to listen the keypress event
Keyboard.end():  end to listen keypress event and clean some resource
Keyboard.registe(name:String, callback:Function, [key1:String, key2:String,...], ...): registe the keyboard binding
Keyboard.unregiste(name:String): remove the register by name
```

## LICENSE
MIT
