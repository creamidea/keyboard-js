"use strict"
var Keyboard = (function () {
    function __Keyboard() {
        this.keys = {}
        this.register_list = {}
    }
    __Keyboard.prototype.listen = function () {
        document.onkeydown = this.keydown.bind(this);
        document.onkeyup = this.keyup.bind(this);
    }

    __Keyboard.prototype.unlisten = function (callback) {
        document.removeEventListener('keydown', function () {})
        document.removeEventListener('keyup', function () {})
    }

    __Keyboard.prototype.test = function () {
        return this.testRegisters()
    }

    __Keyboard.prototype.testRegisters = function () {
        var register_list = this.register_list
        var register_names = Object.keys(register_list)
        var testKeys = this.testKeys.bind(this)
        var keys = this.keys
        var state = false
        if (register_names.length > 0) {
            register_names.forEach(function (name) {
                var reg = register_list[name]
                var keylist = reg[0]
                var callback = reg[1]
                if (testKeys(keylist)) { // hit the target
                    if (callback && typeof callback === 'function') {
                        callback()
                    }
                    keys = {} // clear the keys to wait a new trigger.
                    state = true
                }
            })
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
            // collect all pressed key now
            allPressedkeys.forEach((function(value, index) {
                if (this.keys[value]) nowPressedkeys.push(value)
            }).bind(this))
            // compare nowPressedkeys and combo
            for (var j = 0, len2 = nowPressedkeys.length; j < len2; j++) {
                if (nowPressedkeys[j] !== combo[j]) {
                    result.push(false)
                    break
                }
            }
            // if j is equal to combo.length, this means that user hit the combo.
            // otherwise, user does't.
            if (j === combo.length) result.push(true)
        }
        result.forEach(function (v, i){
            if (v === true) state = true
        })
        return state
    }

    __Keyboard.prototype.keydown = function (event) {
        var key = event.key;
        event.stopImmediatePropagation();
        this.keys[key] = event.type === 'keydown';
        // this.keys[key] = true;
        // the result of test
        // true: hit the target, then prevent the default action, so return true
        // otherwise, don't prevent it. so return false
        return !this.test();
    }

    __Keyboard.prototype.keyup = function (event) {
        var key = event.key;
        this.keys[key] = false;
        return true;
    }

    __Keyboard.prototype.registe = function (name, callback, keylist) {
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
    var k = new __Keyboard()

    var __instance = {
        start: function () { k.listen() },
        end: function () { k.unlisten(); k.clearRegisterAll(); k.keys = {} },
        registe: function () { k.registe.apply(k, arguments) },
        unregiste: function () { k.clearRegister.apply(k, arguments) },
        // for test
        __keydown: function () { k.keydown.apply(k, arguments) },
        __keyup: function () { k.keyup.apply(k, arguments) },
    }

    return function () {
        return __instance
    }
})()

if (typeof exports !== "undefined") {
    exports.Keyboard = Keyboard
} else if (define !== 'undefined' && typeof define === 'function') {
    define("Keyboard", [], function () {
        return Keyboard
    })
}