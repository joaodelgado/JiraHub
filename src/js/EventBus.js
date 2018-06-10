import Vue from 'vue';

export const EventBus = new Vue();

export const GlobalEvents = {
    PERFORMED_TRANSITION: 'performed-transition',
    CHANGED_VERSIONS: 'changed-versions',
};

