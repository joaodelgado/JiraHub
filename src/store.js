class Store {
    constructor() {
        this.username = new StoredItem({
            key: 'jirahub.username',
            initial: () => prompt("Jira username"),
            obfuscate: false
        });
        this.password = new StoredItem({
            key: 'jirahub.password',
            initial: () => prompt("Jira password"),
            obfuscate: true
        });
    }

    getUsername() {
        return this.username.get();
    }

    getPassword() {
        return this.password.get();
    }

}

if (typeof module !== "undefined" && module.exports) {
    module.exports = Store;
}
