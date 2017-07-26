chrome.webRequest.onBeforeSendHeaders.addListener(details => {
    var headers = details.requestHeaders;
    for (var i = 0, l = headers.length; i < l; ++i) {
        if( headers[i].name == 'User-Agent' ) {
            break;
        }
    }
    if (i < headers.length) {
        headers[i].value = 'JiraHub';
    }
    return {requestHeaders: headers};
}, {
    urls: [
        "https://jira.jumia.com/*"
    ],
},
    ['requestHeaders', 'blocking']
);
