class Jira {

    constructor() {
        this.github = new GitHub();
        this.store = new Store();
        this.transitions = [];
        this.ticket = undefined;
        this.reviewers = [];
    }

    loadTicket() {
        this.ticket = new Ticket({ id: this.github.ticket() });
        chrome.extension.sendRequest("deleteCookie");
        $.ajax({
            type: 'GET',
            url: this.store.getJiraUrl() + Config.JIRA_API_BASE + 'issue/' + this.ticket.id + '?fields=status,' + Config.JIRA_REVIWER_KEY,
            headers: {
                "Authorization": "Basic " + btoa(this.store.getUsername() + ":" + this.store.getPassword())
            },
            error: () => alert('Error loading ticket'),
            context: this,
            success: data => {
                this.ticket.status = data.fields.status.name;
                if (data.fields && data.fields[Config.JIRA_REVIWER_KEY]) {
                    this.ticket.reviewers = data.fields[Config.JIRA_REVIWER_KEY].map(reviewer => reviewer.name);
                }
                this._loadTransitions();
            }
        });
    }

    _loadTransitions(data) {
        $.ajax({
            type: 'GET',
            url: this.store.getJiraUrl() + Config.JIRA_API_BASE + 'issue/' + this.ticket.id + '/transitions',
            headers: {
                "Authorization": "Basic " + btoa(Config.JIRA_USERNAME + ":" + Config.JIRA_PASSWORD)
            },
            error: () => alert('Error loading transitions'),
            context: this,
            success: data => {
                this.ticket.transitions = data['transitions']
                    .map(transition => new Transition({
                        id: transition['id'],
                        name: transition["name"],
                        ticket: this.ticket
                    }))
                    .map(transition => {
                        transition.onClick = this._transitionOnClick(transition)
                        return transition
                    });

                this.github.renderTicket(this.ticket);
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
                url: this.store.getJiraUrl() + Config.JIRA_API_BASE + 'issue/' + context.ticket.id + '/transitions',
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

