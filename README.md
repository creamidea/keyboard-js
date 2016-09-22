# keyboard-js

A little library for keyboard binding.
**Now, it just supports chrome**.

If you want to support more browsers or nodejs platform, just fork it.

Have fun, XD.

## Usage

Full list of [key values](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)

### Try it
Now, you can try it [here](https://creamidea.github.io/keyboard-js/).
([source](https://github.com/creamidea/keyboard-js/tree/master/samples))

### Quickly start
```js
var Keyboard = require('keyboard-js').Keyboard
var keyboard = new Keyboard() // pay more attention: singal instance

// start to listen
keyboard.start()

// registe
// when you hit <kbd>Shift+b</kbd> or <kbd>Shift+e</kbd> will print `> test uk successfully`.
keyboard.registe('uk', function () {
    console.log('test uk successfully.')
}, ["Shift", "b"], ["Shift", "e"])

// have fun :)
```

### PLEASE DO NOT USE ALERT OR CONFIRM FOR YOUR FAMILY!
**Dialog boxes are modal windows - they prevent the user from accessing the rest of the program's interface until the dialog box is closed**
+ [Window.alert()](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)
+ Open [this](http://stackoverflow.com/a/12444641/1925954) and then press <kbd>Ctrl</kbd> + <kbd>F</kbd> to find `This key combo keeps activating even though I'm not pressing the keys`
+ If you really want to use, please don't forget to call `event.clearKeys()` in the callback

OMG! Please forgive me.

### Attention
Please pay more attention to the key combo.
You should avoid the key conflict.
For example, if you registe the **Shortcut Key: Shift + B**,
you will be confused when you hit <kbd>Shift</kbd> + <kbd>B</kbd> in the textarea.
So, be careful.

However, you can use `API::Keyboard.end()` to end when the textarea is focused
and use `API::Keyboard.start()` to restart when it blurs.
Also, you can discard the **Shortcut Key: Shift + B**.

## API
```js
Keyboard.start(): start to listen the keypress event
Keyboard.end():  end to listen keypress event and clean some resource
Keyboard.registe(name:String, callback:Function, [key1:String, key2:String,...], ...): registe the keyboard binding
Keyboard.unregiste(name:String): remove the register by name
```

And the callback defination:
```js
// callback
function callback (event) {
    // Object.assign ({}, Event, {
    //     clearKeys: function () { [code] }
    // })
    // your code here
    // ...
}
```

## LICENSE
MIT
