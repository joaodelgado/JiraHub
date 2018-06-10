import { hasValue } from '../Utils';
import Config from '../Config';

export default class GitHub {
    ticket() {
        const match = this.title().match(Config.GITHUB_TITLE_REGEX);

        if (match) {
            return match[1];
        }

        return null;
    }

    project() {
        const ticket = this.ticket();

        if (ticket) {
            return ticket.split('-')[0];
        }

        return null;
    }

    title() {
        return document.querySelector(this.titleSelector()).textContent.trim();
    }

    titleSelector() {
        return '.js-issue-title';
    }

    isPullRequest() {
        return !!this._pullRequestPath() && hasValue(this.ticket());
    }

    _pullRequestPath() {
        return window.location.pathname.match(/\/[\w-]+\/[-\w]+\/pull\/\d+$/);
    }
}
