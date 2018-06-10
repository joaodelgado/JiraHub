<template>

    <div class="jirahub-section">
        <div v-if="!versions || versions.length === 0">
            <span>No version</span>
        </div>
        <div v-else>
            <div
                v-for="version in versions"
                :key="version.id">

                <a
                    :href="`${store.url}/projects/${github.project()}/versions/${version.id}`"
                    class="text-bold">
                    {{ version.name }}
                </a>

            </div>
        </div>
    </div>

</template>

<script>

import Vue from 'vue';

export default Vue.component('versions-list', {

    props: {
        versions: {
            type: Array,
            require: true,
            default: () => [],
        },
    },

});
</script>

