<template>

    <div class="select-menu">
        <button
            type="button"
            class="discussion-sidebar-heading discussion-sidebar-toggle"
            @click="openModal">
            <icon-gear class="octicon" />
            JiraHub
        </button>
        <config-modal/>
    </div>

</template>

<script>
import Vue from 'vue';

import './icons/Gear.vue';
import './ConfigModal.vue';
import { EventBus, GlobalEvents } from './EventBus';

export default Vue.component('jirahub-title', {

    methods: {
        openModal() {
            EventBus.$emit(GlobalEvents.OPEN_MODAL);
        },
    },

});

</script>
