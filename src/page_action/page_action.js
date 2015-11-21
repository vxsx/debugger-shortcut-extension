'use strict';

const KEYMAP = {
    3: 'break',
    8: 'backspace / delete',
    9: 'tab',
    12: 'clear',
    13: 'enter',
    19: 'pause/break',
    20: 'caps lock',
    27: 'Esc',
    32: 'space',
    33: 'page up',
    34: 'page down',
    35: 'end',
    36: 'home',
    37: 'left arrow',
    38: 'up arrow',
    39: 'right arrow',
    40: 'down arrow',
    41: 'select',
    42: 'print',
    43: 'execute',
    44: 'Print Screen',
    45: 'insert',
    46: 'delete',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'w',
    88: 'x',
    89: 'y',
    90: 'z',
    92: 'right window key',
    96: 'numpad 0',
    97: 'numpad 1',
    98: 'numpad 2',
    99: 'numpad 3',
    100: 'numpad 4',
    101: 'numpad 5',
    102: 'numpad 6',
    103: 'numpad 7',
    104: 'numpad 8',
    105: 'numpad 9',
    106: '*',
    107: '+',
    109: '-',
    110: 'decimal point',
    111: '/',
    112: 'f1',
    113: 'f2',
    114: 'f3',
    115: 'f4',
    116: 'f5',
    117: 'f6',
    118: 'f7',
    119: 'f8',
    120: 'f9',
    121: 'f10',
    122: 'f11',
    123: 'f12',
    124: 'f13',
    125: 'f14',
    126: 'f15',
    127: 'f16',
    128: 'f17',
    129: 'f18',
    130: 'f19',
    144: 'num lock',
    145: 'scroll lock',
    173: 'mute/unmute',
    174: 'decrease volume level',
    175: 'increase volume level',
    186: ';',
    187: '=',
    188: ',',
    189: '-',
    190: '.',
    191: '/',
    192: '`',
    219: '[',
    220: '\\',
    221: ']',
    222: '\'',
    225: 'altgr'
};

const input = document.querySelector('#shortcut');
const ctrl = document.querySelector('#modifier-ctrl');
const alt = document.querySelector('#modifier-alt');
const shift = document.querySelector('#modifier-shift');
const save = document.querySelector('button');

let SHORTCUT = {
    shiftKey: false,
    altKey: false,
    ctrlKey: false,
    keyCode: 27
};
let shortcut;

const updateDom = event => {
    ctrl.classList.remove('active');
    alt.classList.remove('active');
    shift.classList.remove('active');
    if (event.ctrlKey) {
        ctrl.classList.add('active');
    }
    if (event.shiftKey) {
        shift.classList.add('active');
    }
    if (event.altKey) {
        alt.classList.add('active');
    }
    if (KEYMAP[event.keyCode]) {
        input.value = KEYMAP[event.keyCode];
    } else {
        input.value = '';
    }
};

input.addEventListener('keydown', event => {
    event.preventDefault();

    shortcut = {
        keyCode: event.keyCode,
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey
    };

    updateDom(event);

    if (
        shortcut.keyCode !== SHORTCUT.keyCode ||
        shortcut.shiftKey !== SHORTCUT.shiftKey ||
        shortcut.altKey !== SHORTCUT.altKey ||
        shortcut.ctrlKey !== SHORTCUT.ctrlKey
    ) {
        save.removeAttribute('disabled');
    } else {
        save.setAttribute('disabled', true);
    }
});

save.addEventListener('click', e => {
    e.preventDefault();
    chrome.storage.local.set({ SHORTCUT: shortcut }, () => {
        save.setAttribute('disabled', true);
    });
});

chrome.storage.local.get('SHORTCUT', value => {
    if (value && typeof value.SHORTCUT === 'object') {
        SHORTCUT = value.SHORTCUT;
    }
    updateDom(SHORTCUT);
});
