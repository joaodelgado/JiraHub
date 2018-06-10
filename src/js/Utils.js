export function hasValue(obj) {
    return obj !== undefined && obj !== null;
}

export function validConfig(store) {
    return store.url
            && store.username
            && store.password;
}
