<template>

    <div
        :class="hovered ? 'navigation-focus' : ''"
        class="select-menu-item label-select-menu-item"
        @click="changeVersion"
        @mouseover="hovered = true"
        @mouseout="hovered = false">

        <icon-check
            :style="{ visibility: applied ? 'visible' : 'invisible' }" />

        <div class="select-menu-item-text">
            <span class="name">{{ error || name }}</span>
        </div>

    </div>

</template>

<script>
import Vue from 'vue';

import '../icons/Check.vue';

import { EventBus, GlobalEvents } from '../EventBus';

export default Vue.component('version-modal-item', {
    props: {
        versionId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        applied: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            error: false,
            hovered: false,
        };
    },

    methods: {
        toggleHover() {
            this.hovered = !this.hovered;
        },


        changeVersion() {
            return this.applied ? this.removeVersion() : this.addVersion();
        },

        addVersion() {
            this.jira.addVersion(this.store, this.github.ticket(), this.versionId)
                .then(
                    () => {
                        EventBus.$emit(GlobalEvents.CHANGED_VERSIONS);
                        this.$refs.modal.close();
                    },
                    () => {
                        this.error = 'Error removing version';
                        EventBus.$emit(GlobalEvents.CHANGED_VERSIONS);
                    }
                );
        },

        removeVersion() {
            this.jira.removeVersion(this.store, this.github.ticket(), this.versionId)
                .then(
                    () => {
                        EventBus.$emit(GlobalEvents.CHANGED_VERSIONS);
                        this.$refs.modal.close();
                    },
                    () => {
                        this.error = 'Error removing version';
                        EventBus.$emit(GlobalEvents.CHANGED_VERSIONS);
                    }
                );
        },
    },

});
</script>
