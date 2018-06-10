<template>

    <div class="jirahub-section-title select-menu">
        <button
            type="button"
            class="discussion-sidebar-heading discussion-sidebar-toggle"
            @click="onClick">
            <icon-gear class="octicon" />
            Versions
        </button>
        <slot />
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
        onClick: {
            type: Function,
            default: () => {},
        },
    },

});
</script>
