<template>

    <div class="jirahub-section-title select-menu">
        <button
            type="button"
            class="discussion-sidebar-heading discussion-sidebar-toggle"
            @click="openModal">
            <icon-gear class="octicon" />
            Versions
        </button>
        <versions-modal
            ref="versionsModal"
            :applied-versions="versions" />
    </div>

</template>

<script>

import Vue from 'vue';

import './VersionsModal.vue';

export default Vue.component('versions-title', {

    props: {
        versions: {
            type: Array,
            required: true,
        },
    },

    methods: {
        openModal() {
            this.$refs.versionsModal.open();
        },
    },

});
</script>
