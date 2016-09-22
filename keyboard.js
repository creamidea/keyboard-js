"use strict"
var Keyboard = (function () {
    function __Keyboard() {
        this.keys = {} // to record the pressed key
        this.register_list = {} // to record the registers(key combos)
        this.state = {} // to record every register matching condition. do you want to get this value?
        this.specialKeyString = {
            "altKey": "Alt",
            "ctrlKey": "Control",
            "metaKey": "Meta",
            "shiftKey": "Shift"
        }
    }
    __Keyboard.prototype.listen = function () {
        var option = this.option, element = document
        if (option.element && typeof option.element.addEventListener === 'function') {
            element = option.element
        }
        element.addEventListener('keydown', this.keydown.bind(this), false)
        element.addEventListener('keyup', this.keyup.bind(this), false)
    }

    __Keyboard.prototype.unlisten = function () {
        // maybe you need callback?
        var option = this.option, element = document
        if (option.element && typeof option.element.removeEventListener === 'function') {
            element = option.element
        }
        element.removeEventListener('keydown', function () { })
        element.removeEventListener('keyup', function () { })
    }

    __Keyboard.prototype.test = function (event) {
        return this.testRegisters(event)
    }

    __Keyboard.prototype.testRegisters = function (event) {
        var register_list = this.register_list
        var register_names = Object.keys(register_list)
        var testKeys = this.testKeys.bind(this)
        var state = {}
        for (var i = 0, len = register_names.length; i < len; i++) {
            var regName = register_names[i]
            var reg = register_list[regName]
            var keylist = reg[0]
            var callback = reg[1]

            // hit the target
            if (testKeys(keylist)) {
                if (callback && typeof callback === 'function') {
                    // TODO:
                    // Need event object? or context?
                    var __wrapper_callback = (function () {
                        event.clearKeys = this.clearKeys.bind(this)
                        // inject the event(the last key) object
                        callback(event)

                        // BUG:
                        // when use `alert` or `confirm`, the event(keyup) of the pressed key will lost.
                        // so, you will don't know the key is really pressed or not when you are back.
                        // here code just detects some special keys.
                        // SO DO NOT USE ALERT OR CONFIRM!
                        Array.prototype.map.call(Object.keys(this.specialKeyString), ((function (key) {
                            if (event[key]) this.keys[this.specialKeyString[key]] = true
                        }).bind(this)))
                    }).bind(this)

                    if (window.requestAnimationFrame)
                        window.requestAnimationFrame(__wrapper_callback)
                    else
                        setTimeout(__wrapper_callback, 16)
                }
                state[regName] = true
                // if match successfully, return directly.
                return state
            }
        }
        return state
    }

    // @param keylist Array(Array) [combo1, combo2, ...]
    __Keyboard.prototype.testKeys = function (keylist) {
        var result = [], state = false
        for (var i = 0, len = keylist.length; i < len; i++) {
            var combo = keylist[i]
            var allPressedkeys = Object.keys(this.keys)
            var nowPressedkeys = []
            var __state = 0 // no state. not true or false

            // collect all pressed key now
            allPressedkeys.forEach((function (value, index) {
                if (this.keys[value]) nowPressedkeys.push(value)
            }).bind(this))

            // DEBUG: print the pressing key message
            // console.log(allPressedkeys, this.keys)
            if (this.option.DEBUG === true) {
                var __printKey = nowPressedkeys.map(function (k, i) {
                    if (k === " ") return "Space"
                    else return k
                }).join(" ")
                console.log('[' + Date.now() + '] You hit key: %c' + __printKey, 'color: #ea4335; font-size: 16px')
            }

            // compare nowPressedkeys and combo
            // console.log('compare: ', nowPressedkeys, combo)
            if (nowPressedkeys.length !== combo.length) {
                __state = false
            } else {
                for (var j = 0, len2 = combo.length; j < len2; j++) {
                    if (nowPressedkeys.indexOf(combo[j]) < 0) {
                        // not in the array
                        __state = false
                        break
                    }
                }
                // if j is equal to combo.length, this means that user hit the combo.
                // otherwise, user does't.
                if (j === combo.length && __state !== false) __state = true
            }
            result.push(__state)
        }
        // console.log('> result', result, this.keys)
        result.forEach(function (v, i) {
            if (v === true) state = true
        })
        return state
    }

    __Keyboard.prototype.keydown = function (event) {
        var key = event.key, state = {}, rlt = true, map = Array.prototype.map
        this.keys[key] = event.type === 'keydown'
        // this.keys[key] = true
        // the result of test
        // true: hit the target, then prevent the default action, so return true
        // otherwise, don't prevent it, so return false
        state = this.test(event)
        Object.keys(state).forEach(function (regName, i) {
            if (state[regName] === true) rlt = false
        })
        this.state = state
        if (!rlt) {
            event.preventDefault()
            event.stopPropagation()
            // event.stopImmediatePropagation()
        }
        // console.log(rlt)
        return rlt
    }

    __Keyboard.prototype.keyup = function (event) {
        var key = event.key
        this.keys[key] = false
        return true
    }

    __Keyboard.prototype.register = function (name, callback, keylist) {
        if (typeof name !== 'string') throw new Error('Please input the register name.')
        if (this.register_list[name]) throw new Error('The ' + name + ' has existed!')
        var keylist = Array.prototype.slice.call(arguments, 2)
        if (!(keylist[0] instanceof Array)) keylist = [keylist] // init [combo1:Array, combo2:Array, ....]
        this.register_list[name] = [keylist, callback]
    }

    __Keyboard.prototype.clearRegister = function (name) {
        delete this.register_list[name]
    }
    __Keyboard.prototype.clearRegisterAll = function () {
        this.register_list = {}
    }
    __Keyboard.prototype.clearKeys = function () {
        this.keys = {}
    }
    var k = new __Keyboard()

    var __instance = {
        start: function () { k.listen() },
        end: function () { k.unlisten(); k.clearRegisterAll(); k.clearKeys(); },
        register: function () { k.register.apply(k, arguments) },
        unregister: function () { k.clearRegister.apply(k, arguments) },
        // for test
        __keydown: function () { k.keydown.apply(k, arguments) },
        __keyup: function () { k.keyup.apply(k, arguments) },
    }

    return function (o) {
        k.option = o || {}
        window.addEventListener('focus', function () {
            k.keys = {}
        }, false)
        // window.addEventListener('blur', function () {
        //     k.keys = {}
        // }, false)
        return __instance
    }
})()

if (typeof exports !== "undefined") {
    exports.Keyboard = Keyboard
} else if (typeof define !== 'undefined' && typeof define === 'function') {
    define("Keyboard", [], function () {
        return Keyboard
    })
} else {
    if (window.Keyboard === undefined) window.Keyboard = Keyboard
    else {
        throw new Error('Library Keyboard has existed! Loaded failed.')
    }
}
