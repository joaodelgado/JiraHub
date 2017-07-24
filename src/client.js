const github = new GitHub();
const jira = new Jira();

const pullRequestListener = () => {
    if (!github.isPullRequest()) {
        return;
    }

    jira.loadTicket();

}

document.arrive(github.titleSelector(), pullRequestListener);
pullRequestListener();
