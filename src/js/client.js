import 'arrive';
import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';
import VueResource from 'vue-resource';

import Jira from './services/Jira';
import GitHub from './services/Github';
import Store from './Store';

import JiraHub from './JiraHub.vue';

const jira = new Jira();
const github = new GitHub();

//
// Configure global Vue mixins and plugins
//

Vue.use(AsyncComputed);
Vue.use(VueResource);
Vue.use(Store);
Vue.mixin({
    data() {
        return {
            github,
            jira,
        };
    },
});


const BASE_ELEMENT_ID = 'jirahub-wrapper';

function init() {
    // If there our vue component already exists
    if (document.getElementsByClassName('jirahub-end').length > 0) {
        return;
    }

    // Create base element
    const jiraWrapperBase = document.querySelector('.sidebar-labels');

    if (!jiraWrapperBase) {
        return;
    }

    const jiraWrapper = document.createElement('div');
    jiraWrapper.id = BASE_ELEMENT_ID;
    jiraWrapper.classList.add('discussion-sidebar-item');
    jiraWrapperBase.after(jiraWrapper);

    /* eslint-disable no-new */
    new Vue({
        el: `#${BASE_ELEMENT_ID}`,
        render: c => c(JiraHub),
    });
    /* eslint-enable no-new */
}

const listener = () => {
    if (!github.isPullRequest()) {
        return;
    }

    init();
};

document.arrive(github.titleSelector(), listener);
listener();
