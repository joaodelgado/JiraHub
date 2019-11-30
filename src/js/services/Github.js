import { hasValue } from '../Utils';
import Config from '../Config';

export default class GitHub {
    ticket() {
        const titleMatch = this.title().match(Config.GITHUB_TITLE_REGEX);

        if (titleMatch) {
            return titleMatch[1].replace(' ', '-').toUpperCase();
        }

        const branchMatch = this.branch().match(Config.GITHUB_TITLE_REGEX);

        if (branchMatch) {
            return branchMatch[1].replace(' ', '-').toUpperCase();
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

    branch() {
        return document.querySelector(this.branchSelector()).textContent.trim();
    }

    branchSelector() {
        return '.head-ref';
    }

    isPullRequest() {
        return !!this._pullRequestPath() && hasValue(this.ticket());
    }

    _pullRequestPath() {
        return window.location.pathname.match(/\/[\w-]+\/[-\w]+\/pull\/\d+$/);
    }
}
