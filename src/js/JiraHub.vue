<template>

    <div
        v-if="github.ticket()"
        class="discussion-sidebar-item">

        <jirahub-title />
        <ticket />

    </div>

</template>

<script>

import Vue from 'vue';

import './JiraHubTitle.vue';
import './ticket/Ticket.vue';

export default Vue.component('jirahub', {
});
</script>
