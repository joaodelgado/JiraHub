<template>

    <modal
        ref="modal"
        title="Versions">

        <div class="select-menu-filters">
            <div class="select-menu-text-filter">
                <input
                    id="jirahub-versions-filter"
                    ref="versionsFilter"
                    v-model="filter"
                    type="text"
                    class="form-control"
                    placeholder="Filter versions">
            </div>
        </div>

        <div v-if="error">
            <span>{{ error }}</span>
        </div>
        <div v-else-if="availableVersions === undefined">
            <span>Loading versions</span>
        </div>
        <div v-else>
            <div
                v-for="version in appliedVersions"
                :key="'applied-' + version.id">

                <version-modal-item
                    :version-id="version.id"
                    :name="version.name"
                    :applied="true" />

            </div>
            <div
                v-for="version in filteredAvailableVersions.slice(0, 5)"
                :key="'available-' + version.id">

                <version-modal-item
                    :version-id="version.id"
                    :name="version.name"
                    :applied="false" />

            </div>
        </div>

    </modal>

</template>

<script>
import Vue from 'vue';

import '../icons/Check.vue';
import '../Modal.vue';
import './VersionModalItem.vue';

import { hasValue } from '../Utils';

export default Vue.component('versions-modal', {
    props: {
        appliedVersions: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            filter: '',
            error: false,
        };
    },

    computed: {
        filteredAvailableVersions: {
            get() {
                if (!hasValue(this.availableVersions)) {
                    return this.availableVersions;
                }
                return this.availableVersions
                    .filter(version => !version.applied)
                    .filter(version => version.name.toLowerCase()
                        .startsWith(this.filter.toLowerCase()))
                    .filter(version => !this.appliedVersions
                        .some(appliedVersion => appliedVersion.id === version.id));
            },

            default: undefined,
        },
    },

    asyncComputed: {
        availableVersions: {
            get() {
                return this.jira.getVersions(this.store, this.github.project())
                    .then(
                        (response) => {
                            const { data } = response;

                            return data
                                .filter(version => !version.archived)
                                .filter(version => !version.released);
                        },
                        () => {
                            this.error = 'Error loading versions';
                            return undefined;
                        }
                    );
            },
            default: undefined,
        },
    },

    methods: {

        open() {
            this.$refs.modal.open();
            Vue.nextTick(() => this.focus());
        },

        close() {
            this.$refs.modal.close();
        },

        focus() {
            this.$refs.versionsFilter.focus();
        },
    },

});
</script>

