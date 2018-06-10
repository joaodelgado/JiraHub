<template>

    <div class="select-menu">
        <button
            type="button"
            class="discussion-sidebar-heading discussion-sidebar-toggle"
            @click="openModal">
            <icon-gear class="octicon" />
            JiraHub
        </button>
        <config-modal ref="configModal"/>
    </div>

</template>

<script>
import Vue from 'vue';

import './icons/Gear.vue';
import './ConfigModal.vue';

export default Vue.component('jirahub-title', {

    methods: {
        openModal() {
            this.$refs.configModal.open();
        },
    },

});

</script>
