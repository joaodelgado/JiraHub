class Transition {

    constructor({ id, name, onClick }) {
        this.id = id;
        this.name = name;
        this.onClick = onClick;
    }

}

if (typeof module !== "undefined" && module.exports) {
    module.exports = Transition;
}

