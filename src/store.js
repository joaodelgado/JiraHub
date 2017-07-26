class Store {
    constructor() {
        this.username = new StoredItem({
            key: 'jirahub.username',
            initial: () => prompt("Jira username"),
        });
        this.password = new StoredItem({
            key: 'jirahub.password',
            initial: () => prompt("Jira password"),
            obfuscate: true
        });
        this.jiraUrl = new StoredItem({
            key: 'jirahub.jiraurl',
            initial: () => prompt("Jira URL (don't include the trailing /)"),
        });

    }

    getUsername() {
        return this.username.get();
    }

    getPassword() {
        return this.password.get();
    }

    getJiraUrl() {
        return this.jiraUrl.get();
    }

}

if (typeof module !== "undefined" && module.exports) {
    module.exports = Store;
}
