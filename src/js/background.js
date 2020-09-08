/* globals  chrome */
function updateHeader(headers, name, value) {
    let i;
    let l;
    for (i = 0, l = headers.length; i < l; ++i) {
        if (headers[i].name === name) {
            break;
        }
    }
    if (i < headers.length) {
        headers[i].value = value;
        return true;
    }

    return false;
}


function upsertHeader(headers, name, value) {
    if (!updateHeader(headers, name, value)) {
        headers.push({
            name: name,
            value: value,
        });
    }
}


chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
        const headers = details.requestHeaders;
        updateHeader(headers, 'User-Agent', 'JiraHub');
        return { requestHeaders: headers };
    }, {
        urls: ['https://jira.jumia.com/rest/api/*'],
    },
    ['requestHeaders', 'blocking']
);

chrome.webRequest.onHeadersReceived.addListener(
    (details) => {
        const headers = details.responseHeaders;
        upsertHeader(headers, 'Access-Control-Allow-Origin', '*');
        upsertHeader(headers, 'Access-Control-Allow-Headers', '*');
        upsertHeader(headers, 'Access-Control-Allow-Methods', '*');
        return { responseHeaders: headers };
    }, {
        urls: ['https://jira.jumia.com/rest/api/*'],
    }, ['blocking', 'responseHeaders', 'extraHeaders']);
