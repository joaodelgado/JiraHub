import Vue from 'vue';

import Config from '../Config';

export default class Jira {
    fetchTicket(store, ticketId) {
        const config = {
            headers: {
                Authorization: `Basic ${btoa(`${store.username}:${store.password}`)})`,
            },
        };

        return Vue.http.get(
            `${store.url}${Config.JIRA_API_BASE}/issue/${ticketId}?fields=status,fixVersions,${Config.JIRA_REVIWER_KEY}`,
            config
        );
    }

    fetchTransitions(store, ticketId) {
        const config = {
            headers: {
                Authorization: `Basic ${btoa(`${store.username}:${store.password}`)})`,
            },
        };

        return Vue.http.get(
            `${store.url}${Config.JIRA_API_BASE}/issue/${ticketId}/transitions`,
            config
        );
    }

    performTransition(store, ticket, transition) {
        const payload = {
            transition: transition.id,
        };

        // Add review assignee
        const reviewers = ticket.reviewers || [];
        if (transition.id === Config.JIRA_IN_REVIEW_TRANSITION_ID &&
            reviewers.indexOf(Config.JIRA_USERNAME) === -1
        ) {
            payload.fields = {};
            payload.fields[Config.JIRA_REVIWER_KEY] = reviewers
                .map(reviewer => ({ name: reviewer }));
            payload.fields[Config.JIRA_REVIWER_KEY].push({ name: store.username });
        }

        const config = {
            headers: {
                Authorization: `Basic ${btoa(`${store.username}:${store.password}`)})`,
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        return Vue.http.post(
            `${store.url}${Config.JIRA_API_BASE}/issue/${ticket.id}/transitions`,
            payload,
            config
        );
    }

    getVersions(store, project) {
        const config = {
            headers: {
                Authorization: `Basic ${btoa(`${store.username}:${store.password}`)})`,
            },
        };

        return Vue.http.get(
            `${store.url}${Config.JIRA_API_BASE}/project/${project}/versions`,
            config
        );
    }

    addVersion(store, ticketId, versionId) {
        const config = {
            headers: {
                Authorization: `Basic ${btoa(`${store.username}:${store.password}`)})`,
            },
        };

        const payload = {
            update: {
                fixVersions: [
                    {
                        add: {
                            id: versionId,
                        },
                    },
                ],
            },
        };

        return Vue.http.put(
            `${store.url}${Config.JIRA_API_BASE}/issue/${ticketId}`,
            payload,
            config
        );
    }

    removeVersion(store, ticketId, versionId) {
        const config = {
            headers: {
                Authorization: `Basic ${btoa(`${store.username}:${store.password}`)})`,
            },
        };

        const payload = {
            update: {
                fixVersions: [
                    {
                        remove: {
                            id: versionId,
                        },
                    },
                ],
            },
        };

        return Vue.http.put(
            `${store.url}${Config.JIRA_API_BASE}/issue/${ticketId}`,
            payload,
            config
        );
    }
}
