<template>
    <div>
        <versions-title :versions="versions"/>
        <versions-list :versions="versions"/>
    </div>
</template>

<script>
import Vue from 'vue';

import './VersionsTitle.vue';
import './VersionsList.vue';

export default Vue.component('versions', {

    props: {
        versions: {
            type: Array,
            required: true,
        },
    },

});
</script>
