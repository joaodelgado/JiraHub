class Jira {

    constructor() {
        this.github = new GitHub();
        this.transitions = [];
        this.ticket = undefined;
        this.reviewers = [];
    }

    loadTicket() {
        this.ticket = this.github.ticket();
        chrome.extension.sendRequest("deleteCookie");
        $.ajax({
            type: 'GET',
            url: Config.JIRA_BASE_URL + 'issue/' + this.ticket + '?fields=' + Config.JIRA_REVIWER_KEY,
            headers: {
                "Authorization": "Basic " + btoa(Config.JIRA_USERNAME + ":" + Config.JIRA_PASSWORD)
            },
            error: () => alert('Error loading ticket'),
            context: this,
            success: data => {
                if (data.fields && data.fields[Config.JIRA_REVIWER_KEY]) {
                    this.reviewers = data.fields[Config.JIRA_REVIWER_KEY].map(reviewer => reviewer.name);
                }
                this._loadTransitions();
            }
        });
    }

    _loadTransitions(data) {
        $.ajax({
            type: 'GET',
            url: Config.JIRA_BASE_URL + 'issue/' + this.ticket + '/transitions',
            headers: {
                "Authorization": "Basic " + btoa(Config.JIRA_USERNAME + ":" + Config.JIRA_PASSWORD)
            },
            error: () => alert('Error loading transitions'),
            context: this,
            success: data => {
                console.log(data);
                this.transitions = data['transitions']
                    .map(transition => new Transition({
                        id: transition['id'],
                        name: transition["name"],
                        ticket: this.ticket
                    }))
                    .map(transition => {
                        transition.onClick = this._transitionOnClick(transition)
                        return transition
                    });

                this.github.renderTransitions({ transitions: this.transitions });
            }
        });
    }

    _transitionOnClick(transition) {
        const context = this;
        return () => {
            chrome.extension.sendRequest("deleteCookie");
            // Add review assignee

            var data = { transition: transition.id }
            if (transition.id === Config.JIRA_IN_REVIEW_TRANSITION_ID && context.reviewers.indexOf(Config.JIRA_USERNAME) === -1) {
                data.fields = {};
                data.fields[Config.JIRA_REVIWER_KEY] = context.reviewers.map(reviewer => { name: reviewer });
                data.fields[Config.JIRA_REVIWER_KEY].push({name: Config.JIRA_USERNAME});
            }

            $.ajax({
                type: 'POST',
                url: Config.JIRA_BASE_URL + 'issue/' + context.ticket + '/transitions',
                headers: {
                    "Authorization": "Basic " + btoa(Config.JIRA_USERNAME + ":" + Config.JIRA_PASSWORD)
                },
                data: JSON.stringify(data),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: context.loadTicket,
                error: () => alert('Error performing transition'),
                context: context
            });
        }
    }

}

if (typeof module !== "undefined" && module.exports) {
    module.exports = Jira;
}

