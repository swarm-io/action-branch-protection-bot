const core = require('@actions/core')
const github = require('@actions/github')
const {Octokit} = require("@octokit/rest");

try {
    const token = core.getInput('token')
    const setIncludeAdmins = core.getBooleanInput('set-include-admins')
    const includeAdmins = core.getBooleanInput('include-admins')
    const owner = core.getInput('owner')
    const repo = core.getInput('repo')
    const branch = core.getInput('branch')
    const octokit = new Octokit({
        auth: token,
    });

    if (setIncludeAdmins === true) {
        const params = {
            owner,
            repo,
            branch
        }
        if (includeAdmins === true) {
            octokit.rest.repos.setAdminBranchProtection(params)
                .then(() => {
                    core.info("Enabled include admins setting")
                }).catch(error => {
                    core.error(`Error encountered attempting to enable include admins setting`)
                    core.setFailed(error)
            });
        } else if (includeAdmins === false) {
            octokit.rest.repos.deleteAdminBranchProtection(params)
                .then(() => {
                    core.info("Disabled include admins setting")
                }).catch(error => {
                core.error(`Error encountered attempting to disable include admins setting`)
                core.setFailed(error)
            });
        }
    }

} catch (error) {
    core.setFailed(error)
}