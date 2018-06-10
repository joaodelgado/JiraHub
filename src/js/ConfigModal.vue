<template>

    <div>
        <div
            :style="{ display: isOpen ? 'block' : 'none' }"
            class="select-menu-modal-holder">

            <div class="select-menu-modal">

                <!-- Header -->
                <div class="select-menu-header" >
                    <icon-cross @click.native="close"/>
                    <span class="select-menu-title">Jira credentials</span>
                </div>

                <!-- Content -->
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

            </div>
        </div>

        <div
            v-if="isOpen"
            class="jirahub-backdrop"
            @click="close"/>
    </div>
</template>

<script>
import Vue from 'vue';
import { EventBus, GlobalEvents } from './EventBus';

import './icons/Cross.vue';

export default Vue.component('config-modal', {
    data() {
        return {
            url: undefined,
            username: undefined,
            password: undefined,

            isOpen: false,
        };
    },

    created() {
        EventBus.$on(GlobalEvents.CLOSE_MODAL, this.close);
        EventBus.$on(GlobalEvents.OPEN_MODAL, this.open);

        this.url = this.store.url;
        this.username = this.store.username;
    },

    beforeDestroy() {
        EventBus.$off(GlobalEvents.OPEN_MODAL, this.open);
        EventBus.$off(GlobalEvents.CLOSE_MODAL, this.close);
    },

    methods: {

        open() {
            this.isOpen = true;
            this.focus();
        },

        close() {
            this.isOpen = false;
        },

        focus() {
            Vue.nextTick(() => this.$refs.url.focus());
        },

        submit() {
            this.store.url = this.url;
            this.store.username = this.username;
            this.store.password = this.password;
            this.password = undefined;

            EventBus.$emit(GlobalEvents.CLOSE_MODAL);
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

.jirahub-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    display: block;
    width: 100vw;
    height: 100vh;
}

</style>
