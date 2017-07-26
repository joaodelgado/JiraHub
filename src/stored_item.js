class StoredItem {
    constructor({ key, initial, obfuscate = false }) {
        this.key = key;
        this.initial = initial;
        this.obfuscate = obfuscate;
    }

    get() {
        var value = window.localStorage.getItem(this.key);
        if (value === null) {
            value = this._getInitial();
        }

        if (this.obfuscate) {
            value = atob(value);
        }

        return JSON.parse(value);
    }

    _getInitial() {
        var value = this.initial();

        if (value === null) {
            return value;
        }

        value = JSON.stringify(value);
        if (this.obfuscate) {
            value = btoa(value);
        }
        window.localStorage.setItem(this.key, value);
        return value;
    }

}

if (typeof module !== "undefined" && module.exports) {
    module.exports = StoredItem;
}
