'use strict';

let SHORTCUT = {
    shiftKey: false,
    altKey: false,
    ctrlKey: false,
    keyCode: 27
};
const INTERVAL = 100;

const inject = function inject(doc) {
    const readyStateCheckInterval = setInterval(() => {
        if (doc.readyState === 'complete') {
            clearInterval(readyStateCheckInterval);

            doc.body.addEventListener('keydown', event => {
                if (
                    event.keyCode === SHORTCUT.keyCode &&
                    event.ctrlKey === SHORTCUT.ctrlKey &&
                    event.altKey === SHORTCUT.altKey &&
                    event.shiftKey === SHORTCUT.shiftKey
                ) {
                    debugger; // eslint-disable-line no-debugger
                }
            }, true);
        }
    }, INTERVAL);

    new MutationObserver(mutations => {
        mutations.some(mutation => {
            // if iframe is added dynamically to the page
            if (mutation.type === 'childList' && mutation.addedNodes.length) {
                const iframes = document.querySelectorAll('iframe');

                Array.from(iframes).forEach(iframe => {
                    if (!iframe.ready) {
                        iframe.ready = true;
                        if (iframe.getAttribute('src') && !iframe.getAttribute('src').match(/javascript:/)) {
                            iframe.addEventListener('load', () => {
                                let iframeDoc;

                                try {
                                    iframeDoc = iframe.contentDocument;
                                } catch(e) {}

                                if (iframeDoc) {
                                    inject(iframe.contentDocument);
                                }
                            });
                        } else {
                            // if iframe has no src but still has content
                            // or if it doesn't have src at the moment of creation
                            // should be setInterval probably
                            setTimeout(() => {
                                inject(iframe.contentDocument);
                            }, INTERVAL);
                        }
                    }
                });
            }

            return false;
        });
    }).observe(doc.body, {
        childList: true,
        subtree: true
    });
};

chrome.storage.local.get('SHORTCUT', value => {
    if (value && typeof value.SHORTCUT === 'object') {
        SHORTCUT = value.SHORTCUT;
    }
});

chrome.storage.onChanged.addListener(changes => {
    if (changes.SHORTCUT) {
        SHORTCUT = changes.SHORTCUT.newValue;
    }
});

chrome.extension.sendMessage({}, () => {
    inject(document);
});
