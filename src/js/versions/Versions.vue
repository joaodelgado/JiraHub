<template>
    <div v-if="error">
        <versions-with-error />
    </div>
    <div v-else-if="versions !== undefined">
        <versions-title
            :versions="versions"
            :on-click="openModal">

            <versions-modal
                ref="versionsModal"
                :applied-versions="versions" />

        </versions-title>
        <versions-list :versions="versions" />
    </div>
</template>

<script>
import Vue from 'vue';

import './VersionsTitle.vue';
import './VersionsList.vue';

import { EventBus, GlobalEvents } from '../EventBus';

export default Vue.component('versions', {

    data() {
        return {
            error: false,
            shouldReload: false,
        };
    },

    created() {
        EventBus.$on(GlobalEvents.CHANGED_VERSIONS, this.reload);
    },

    beforeDestroy() {
        EventBus.$off(GlobalEvents.CHANGED_VERSIONS, this.reload);
    },

    asyncComputed: {
        versions: {
            get() {
                this.shouldReload = false;
                const ticketId = this.github.ticket();
                return this.jira.fetchVersions(this.store, ticketId)
                    .then(
                        (response) => {
                            const { data } = response;

                            return data.fields.fixVersions;
                        },
                        () => {
                            this.error = true;
                            return undefined;
                        }
                    );
            },

            watch() {
                return this.shouldReload;
            },

            default: undefined,
        },
    },

    methods: {
        reload() {
            this.shouldReload = true;
            this.$refs.versionsModal.close();
        },

        openModal() {
            this.$refs.versionsModal.open();
        },

    },

});
</script>
