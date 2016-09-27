const keyboard = [
  [{key: "Escape", text: "Esc"}, "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Home", "End", "Insert", "Delete"],
  ["~ `", "! 1", "@ 2", "# 3", "$ 4", "% 5", "^ 6", "& 7", "* 8", "( 9", ") 0", "_ -", "+ =", "Backspace"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{ [", "} ]", "| \\"],
  ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", "\: ;", "\" '", "Enter"],
  ["Shift", "Z", "X", "C", "V", "B", "N", "M", "< ,", "> .", "? /", "Shift"],
  [{key: "WakeUp", text: "Fn"}, {key: "Control", text: "Ctrl"}, {key: "Meta", text: "&#127830;"}, "Alt", {key: " ", text: "Space"}, "Alt", {key: "PrintScreen", text: "PrtSc"}, {key: "Control", text: "Ctrl"}, {key: "PageUp", text: "PgUp"}, {key: "ArrowUp", text: "&#8593;"}, {key: "PageDown", text: "PgDn"}],
  [{key: "ArrowLeft", text: "&#8592;"}, {key: "ArrowDown", text: "&#8595;"}, {key: "ArrowRight", text: "&#8594;"}]
]

if (typeof module !== 'undefined') module.exports = keyboard
if (typeof define === 'function') { define('KeyboardLayoutDefault', [], function () { return keyboard }) }
