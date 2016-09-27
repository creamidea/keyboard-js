const keyboard = [
  [{key: "Escape", text: "esc"}, "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", {key: "Eject", text: "&#9167;"}],
  ["~ `", "! 1", "@ 2", "# 3", "$ 4", "% 5", "^ 6", "& 7", "* 8", "( 9", ") 0", "_ -", "+ =", {key: "Delete", text: "&#9003;"}],
  [{key: "Tab", text: "tab"}, "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{ [", "} ]", "| \\"],
  [{key: "CapsLock", text: "capslock"}, "A", "S", "D", "F", "G", "H", "J", "K", "L", "\: ;", "\" '", {key: "Enter", text: "return"}],
  [{key: "Shift", text: "shift"}, "Z", "X", "C", "V", "B", "N", "M", "< ,", "> .", "? /", {key: "Shift", text: "shift"}],
  [{key: "WakeUp", text: "fn"}, {key: "Control", text: "ctrl"}, {key: "Alt Option", text: "alt &#8997;"}, {key: "Meta", text: "&#8984;"}, {key: " ", text: " "}, {key: "Meta", text: "&#8984;"}, {key: "Alt Option", text: "alt &#8997;"}, {key: "ArrowUp", text: "&#8593;"}],
  [{key: "ArrowLeft", text: "&#8592;"}, {key: "ArrowDown", text: "&#8595;"}, {key: "ArrowRight", text: "&#8594;"}]
]

if (typeof module !== 'undefined') module.exports = keyboard
if (typeof define === 'function') { define('KeyboardLayoutMac', [], function () { return keyboard }) }
