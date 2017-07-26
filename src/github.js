class GitHub {

    ticket() {
        const match = this.title().match(Config.GITHUB_TITLE_REGEX);
        if (match) {
            return match[1];
        } else {
            return null;
        }
    }

    title() {
        return $(this.titleSelector()).text().trim()
    }

    titleSelector() {
        return '.js-issue-title'
    }

    renderTransitions({ transitions, jira }) {
        $('#jirahub-wrapper').remove();

        const wrapper = $(document.createElement('div'))
            .attr('id', 'jirahub-wrapper')
            .addClass('discussion-sidebar-item')

        wrapper.insertAfter($('.sidebar-labels'));

        transitions.forEach(transition => wrapper.append(this._renderTransition(transition, jira)));
    }

    _renderTransition(transition, jira) {
        return $(document.createElement('button'))
            .attr({ id: 'jirahub-' + transition.id})
            .addClass('btn btn-sm')
            .css('display', 'block')
            .css('width', '100%')
            .css('margin-bottom', '3px')
            .html(transition.name)
            .click(transition.onClick);
    }

    isPullRequest() {
        return !!this._pullRequestPath() && this.title().match(Config.GITHUB_TITLE_REGEX);
    }

    _pullRequestPath() {
        return window.location.pathname.match(/\/[\w-]+\/[-\w]+\/pull\/\d+$/);
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = GitHub;
}
