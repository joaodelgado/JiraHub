<template>

    <modal
        ref="modal"
        title="Jira credentials">

        <div class="jirahub-form">
            <input
                ref="url"
                v-model="url"
                placeholder="https://jira.example.com"
                type="text"
                class="form-control input-monospace input-sm">

            <input
                ref="username"
                v-model="username"
                placeholder="username"
                type="text"
                class="form-control input-monospace input-sm">

            <input
                ref="password"
                v-model="password"
                placeholder="password"
                type="password"
                class="form-control input-monospace input-sm">

            <button
                class="btn btn-sm btn-primary"
                @click="submit">
                Submit
            </button>
        </div>
    </modal>

</template>

<script>
import Vue from 'vue';

import './Modal.vue';

export default Vue.component('config-modal', {
    data() {
        return {
            url: undefined,
            username: undefined,
            password: undefined,
        };
    },

    created() {
        this.url = this.store.url;
        this.username = this.store.username;
    },

    methods: {

        open() {
            this.$refs.modal.open();
            Vue.nextTick(() => this.focus());
        },

        focus() {
            this.$refs.url.focus();
        },

        submit() {
            this.store.url = this.url;
            this.store.username = this.username;
            this.store.password = this.password;
            this.password = undefined;

            this.$refs.modal.close();
        },
    },

});
</script>

<style>

.jirahub-form {
    padding: 10px;
}

.jirahub-form input {
    display: block;
    width: 100%;
    max-width: 100%;
    padding: 5px;
    border: 1px solid #dfe2e5;
    border-radius: 3px;
}

.jirahub-form button {
    display: block;
    width: 100%;
    max-width: 100%;
    padding: 5px;
}

</style>
