<template>

    <div>
        <div
            :style="{ display: isOpen ? 'block' : 'none' }"
            class="jirahub-modal select-menu-modal-holder">

            <div class="select-menu-modal position-absolute right-0">

                <!-- Header -->
                <div class="select-menu-header" >
                    <icon-cross @click.native="close"/>
                    <span class="select-menu-title">{{ title }}</span>
                </div>

                <!-- Content -->
                <slot/>

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

import './icons/Cross.vue';

export default Vue.component('modal', {
    props: {
        title: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            isOpen: false,
        };
    },

    methods: {

        open() {
            this.isOpen = true;
        },

        close() {
            this.isOpen = false;
        },

    },

});
</script>

<style>

.jirahub-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    display: block;
    width: 100vw;
    height: 100vh;
}

.jirahub-modal {
    position: relative;
}

</style>
