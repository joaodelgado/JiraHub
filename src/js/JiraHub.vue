<template>

    <div
        v-if="github.ticket()"
        class="jirahub-end">

        <jirahub-title />
        <ticket />
        <versions v-if="validConfig" />

    </div>

</template>

<script>

import Vue from 'vue';

import './JiraHubTitle.vue';
import './ticket/Ticket.vue';
import './versions/Versions.vue';

import { validConfig } from './Utils';

export default Vue.component('jirahub', {

    data() {
        return {
            validConfig: false,
        };
    },

    created() {
        this.validConfig = validConfig(this.store);
    },

});
</script>

<style>

.jirahub-section {
    font-size: 12px;
    color: #586069;
}

.jirahub-section-title {
    padding-top: 15px;
    font-size: 12px;
    color: #586069;
    margin-top: 15px;
    border-top: 1px solid #e6ebf1;
}

.jirahub-end {
    padding-bottom: 15px;
    border-bottom: 1px solid #e6ebf1;
}

</style>
