'use strict';

let SHORTCUT = {
    shiftKey: false,
    altKey: false,
    ctrlKey: false,
    keyCode: 27
};
chrome.storage.local.get('SHORTCUT', (value) => {
    if (value && typeof value.SHORTCUT === 'object') {
        SHORTCUT = value.SHORTCUT;
    }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.SHORTCUT) {
        SHORTCUT = changes.SHORTCUT.newValue;
    }
});

chrome.extension.sendMessage({}, (response) => {
    const readyStateCheckInterval = setInterval(() => {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            document.body.addEventListener('keydown', (event) => {
                if (
                    event.keyCode === SHORTCUT.keyCode &&
                    event.ctrlKey === SHORTCUT.ctrlKey &&
                    event.altKey === SHORTCUT.altKey &&
                    event.shiftKey === SHORTCUT.shiftKey
                ) {
                    debugger;
                }
            }, true);
        }
    }, 10);
});
