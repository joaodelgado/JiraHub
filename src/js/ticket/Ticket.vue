<template>

    <div>
        <span v-if="!validConfig">
            Configure JiraHub
        </span>
        <span v-else-if="error">
            Error loading Jira ticket
        </span>
        <span v-else-if="ticket === undefined">
            Loading Jira ticket
        </span>
        <div v-else>
            <a
                :href="store.url + '/browse/' + ticket.id"
                class="text-bold">
                {{ ticket.id + ' - ' + ticket.status }}
            </a>
            <transitions :ticket="ticket" />
        </div>
    </div>

</template>

<script>

import Vue from 'vue';

import './Transitions.vue';

import Config from '../Config';
import { EventBus, GlobalEvents } from '../EventBus';
import { validConfig } from '../Utils';

export default Vue.component('ticket', {

    data() {
        return {
            validConfig: false,
            error: false,
            shouldReload: false,
        };
    },

    created() {
        EventBus.$on(GlobalEvents.PERFORMED_TRANSITION, this.reload);
        this.validConfig = validConfig(this.store);
    },

    beforeDestroy() {
        EventBus.$off(GlobalEvents.PERFORMED_TRANSITION, this.reload);
    },

    asyncComputed: {
        ticket: {
            get() {
                const ticketId = this.github.ticket();
                return this.jira.fetchTicket(this.store, ticketId)
                    .then(
                        (response) => {
                            const { data } = response;

                            let reviewers;
                            if (data.fields && data.fields[Config.JIRA_REVIWER_KEY]) {
                                reviewers = data.fields[Config.JIRA_REVIWER_KEY]
                                    .map(reviewer => reviewer.name);
                            }

                            this.shouldReload = false;
                            return {
                                id: ticketId,
                                status: data.fields.status.name,
                                reviewers,
                            };
                        },
                        () => {
                            this.shouldReload = false;
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
            this.ticket = undefined;
            this.shouldReload = true;
        },
    },

});
</script>

