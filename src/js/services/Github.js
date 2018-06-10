import { hasValue } from '../Utils';
import Config from '../Config';

export default class GitHub {
    // constructor() {
    // this.store = new Store();
    // }

    ticket() {
        const match = this.title().match(Config.GITHUB_TITLE_REGEX);

        if (match) {
            return match[1];
        }

        return null;
    }

    title() {
        return document.querySelector(this.titleSelector()).textContent.trim();
    }

    titleSelector() {
        return '.js-issue-title';
    }

    // renderTicket(ticket) {
    // $('#jirahub-wrapper').remove();

    // const wrapper = $(document.createElement('div'))
    // .attr('id', 'jirahub-wrapper')
    // .addClass('discussion-sidebar-item')

    // wrapper.insertAfter($('.sidebar-labels'));

    // const linkWrapper = $(document.createElement('div'))
    // .addClass('discussion-sidebar-heading text-bold');
    // const link = $(document.createElement('a'))
    // .attr({ href: this.store.getJiraUrl() + '/browse/' + ticket.id })
    // .text('Jira - ' + ticket.status);
    // linkWrapper.append(link);
    // wrapper.append(linkWrapper);

    // ticket.transitions.forEach(transition => wrapper.append(this._renderTransition(transition)));
    // }

    // _renderTransition(transition) {
    // return $(document.createElement('button'))
    // .attr({ id: 'jirahub-' + transition.id})
    // .addClass('btn btn-sm')
    // .css('display', 'block')
    // .css('width', '100%')
    // .css('margin-bottom', '3px')
    // .html(transition.name)
    // .click(transition.onClick);
    // }

    isPullRequest() {
        return !!this._pullRequestPath() && hasValue(this.ticket());
    }

    _pullRequestPath() {
        return window.location.pathname.match(/\/[\w-]+\/[-\w]+\/pull\/\d+$/);
    }
}
