class Ticket {
    constructor({ id, status, reviewers = [], transitions = [] }) {
        this.id = id;
        this.status = status;
        this.reviewers = reviewers;
        this.transitions = transitions;
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = Ticket;
}
