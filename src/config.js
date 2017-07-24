const Config = {
    JIRA_USERNAME: 'USERNAME',
    JIRA_PASSWORD: 'PASSWORD',
    JIRA_BASE_URL: 'https://jira.jumia.com/rest/api/2/',
    JIRA_REVIWER_KEY: 'customfield_12100',
    JIRA_IN_REVIEW_TRANSITION_ID: '71'
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = Config;
}
