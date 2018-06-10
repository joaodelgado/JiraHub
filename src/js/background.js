/* globals  chrome */
chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
        const headers = details.requestHeaders;
        let i;
        let l;
        for (i = 0, l = headers.length; i < l; ++i) {
            if (headers[i].name === 'User-Agent') {
                break;
            }
        }
        if (i < headers.length) {
            headers[i].value = 'JiraHub';
        }
        return { requestHeaders: headers };
    }, {
        urls: ['https://jira.jumia.com/*'],
    },
    ['requestHeaders', 'blocking']
);
