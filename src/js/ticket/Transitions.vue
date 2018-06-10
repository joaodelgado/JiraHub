<template>
    <div>
        <span v-if="error">{{ error }}</span>
        <span v-else>
            <button
                v-for="transition in transitions"
                :key="transition.id"
                class="jirahub-transition btn btn-sm"
                @click="performTransition(transition)">

                {{ transition.name }}

            </button>
        </span>
    </div>
</template>

<script>
import Vue from 'vue';

import { EventBus, GlobalEvents } from '../EventBus';

export default Vue.component('transitions', {
    props: {
        ticket: {
            type: Object,
            default: () => {},
        },
    },

    data() {
        return {
            error: false,
        };
    },

    asyncComputed: {
        transitions: {
            get() {
                return this.jira.fetchTransitions(this.store, this.ticket.id)
                    .then(
                        response => response.data.transitions
                            .map(transition => ({
                                id: transition.id,
                                name: transition.name,
                            })),
                        () => {
                            this.error = 'Error loading transitions';
                            return undefined;
                        }
                    );
            },
            default: [],
        },
    },

    methods: {
        performTransition(transition) {
            this.jira.performTransition(this.store, this.ticket, transition)
                .then(
                    () => {
                        EventBus.$emit(GlobalEvents.PERFORMED_TRANSITION);
                    },
                    () => {
                        this.error = 'Error performing transition';
                        EventBus.$emit(GlobalEvents.PERFORMED_TRANSITION);
                    }
                );
        },
    },
});
</script>

<style>

.jirahub-transition {
    display: block;
    width: 100%;
    margin-bottom: 3px;
}

</style>
