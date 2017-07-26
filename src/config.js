const Config = {
    // The regex will be matched with the PR title
    // It should define 1 group containing the Jira ticket id
    GITHUB_TITLE_REGEX: /^(\w+-\d+)/,
    JIRA_API_BASE: '/rest/api/2/',
    JIRA_REVIWER_KEY: 'customfield_12100',
    JIRA_IN_REVIEW_TRANSITION_ID: '71'
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = Config;
}
