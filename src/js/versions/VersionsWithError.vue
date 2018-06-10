<template>

    <div>
        <div class="jirahub-section-title select-menu">
            <button
                type="button"
                class="discussion-sidebar-heading discussion-sidebar-toggle"
                @click="openModal">
                <icon-gear class="octicon" />
                Versions
            </button>
        </div>
        <slot />
    </div>

</template>

<script>

import Vue from 'vue';

import './VersionsModal.vue';

export default Vue.component('versions-with-error', {

});
</script>
