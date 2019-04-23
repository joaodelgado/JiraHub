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
        urls: ['https://jira.jumia.com/rest/api/*'],
    },
    ['requestHeaders', 'blocking']
);

chrome.webRequest.onHeadersReceived.addListener(
    (details) => {
        const headers = details.responseHeaders;
        let i = 0;
        for (i = 0; i < headers.length; ++i) {
            if (headers[i].name === 'User-Agent') {
                break;
            }
        }
        if (i < headers.length) {
            headers[i] = {
                name: 'Access-Control-Allow-Origin',
                value: '*',
            };
        } else {
            headers.push({
                name: 'Access-Control-Allow-Origin',
                value: '*',
            });
        }
        return { responseHeaders: headers };
    }, {
        urls: ['https://jira.jumia.com/rest/api/*'],
    }, ['blocking', 'responseHeaders', 'extraHeaders']);
