import { hasValue } from './Utils';

function getFromStorage(key, obfuscate, initial = null) {
    let value = window.localStorage.getItem(key);
    if (!hasValue(value)) {
        return initial;
    }

    if (obfuscate) {
        value = atob(value);
    }

    return value;
}

function generateSetter(key, obfuscate) {
    return (newValue) => {
        let value = newValue;
        if (!hasValue(value)) {
            window.localStorage.removeItem(key);
            return null;
        }

        if (obfuscate) {
            value = btoa(value);
        }

        window.localStorage.setItem(key, value);
        return value;
    };
}

export default {
    install(Vue) {
        const data = {
            store: {
                url: getFromStorage('jirahub.url', false),
                username: getFromStorage('jirahub.username', false),
                password: getFromStorage('jirahub.password', true),
            },
        };

        const watchers = {
            'store.url': {
                deep: true,
                handler: generateSetter('jirahub.url', false),
            },
            'store.username': {
                deep: true,
                handler: generateSetter('jirahub.username', false),
            },
            'store.password': {
                deep: true,
                handler: generateSetter('jirahub.password', true),
            },
        };

        Vue.mixin({
            data() {
                return data;
            },
            watch: watchers,
        });
    },
};
