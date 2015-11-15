const KEY_CODE = 27;

chrome.extension.sendMessage({}, (response) => {
    const readyStateCheckInterval = setInterval(() => {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            document.body.addEventListener('keydown', (event) => {
                if (event.keyCode == KEY_CODE) {
                    debugger;
                }
            }, true);
        }
    }, 10);
});
