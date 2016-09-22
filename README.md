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

And, you can find **which key(key combo will print on the console.)** do you press at that page,
when you find your code didn't run.

### Quickly start
```js
var Keyboard = require('keyboard-js').Keyboard
var keyboard = new Keyboard() // pay more attention: singal instance

// start to listen
keyboard.start()

// register
// when you hit <kbd>Shift+e</kbd> or <kbd>Ctrl+e</kbd> that will print `> test uk successfully`.
keyboard.register('uk', function (event) {
    // event.preventDefault()
    // event.stopPropagation()
    // event.stopImmediatePropagation()

    console.log('test uk successfully.')

    // event.clearKeys() // if you use function::alert or function::confirm
}, ["Shift", "E"], ["Control", "e"]) // attention: Shift E (not e)

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
Constructor Options
```js
{
    DEBUG: [boolen], // default: false. If true, it will print key message on the console.
    element: [DOM Element], // default: document. Use this to listen the keydown or keyup.
}
```

Exposed Interface:
```js
Keyboard.start(): start to listen the keypress event
Keyboard.end():  end to listen keypress event and clean some resource
Keyboard.register(name:String, callback:Function, [key1:String, key2:String,...], ...): registe the keyboard binding
Keyboard.unregister(name:String): remove the register by name
```

And the callback defination:
```js
// callback
function callback (event) {
    // event.preventDefault()
    // event.stopPropagation()
    // event.stopImmediatePropagation()

    // your code here
    // ...

    // event.clearKeys() // if you use function::alert or function::confirm
}
```

# Bug
如果你发现bug、疑问或者需要改进的地方可以在这个地方提出 [issue](https://github.com/creamidea/keyboard-js/issues)

## LICENSE
MIT
