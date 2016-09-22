// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: './',
    paths: {
        Keyboard: '../keyboard'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['Keyboard'], function (Keyboard) {
    var kbd = new Keyboard({ DEBUG: true })
    function Log() {
        var $message = document.querySelector('#message')
        var count = 0;
        return function (message) {
            var li = document.createElement('li')
            li.innerHTML = message
            $message.appendChild(li)
            count++
            if (count > 10) {
                $message.innerHTML = ""
                count = 0
            }
        }
    }
    var log = Log()

    kbd.registe('Test Bold', function (e) {
        e.preventDefault()
        e.stopImmediatePropagation()
        var p = document.querySelector('#bold p')
        p.style.fontWeight = p.style.fontWeight === "" ? "bold" : ""
    }, ["Control", "b"], [" "])

    kbd.registe('Ctrl Space', function (e) {
        log('You hit Ctrl+Space.')
    }, ["Control", " "])

    kbd.registe('Go homepage', function (e) {
        var timeout = 2000
        log('You will go the project homepage. '+timeout/1000+'s...')
        setTimeout(function () {
            location.href = document.querySelector('#homepage-link').href
        }, timeout)
    }, ["g", "h"])

    kbd.registe('alert', function (e) {
        alert('PLEASE DO NOT USE ALERT OR CONFIRM FOR YOUR FAMILY!')
        e.clearKeys()
    }, ["g", "a"])

    kbd.start()
});
