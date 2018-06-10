import Vue from 'vue';

export const EventBus = new Vue();

export const GlobalEvents = {
    PERFORMED_TRANSITION: 'performed-transition',
    OPEN_MODAL: 'open-modal',
    CLOSE_MODAL: 'close-modal',
};

