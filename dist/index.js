"use strict";
const core = require("@actions/core");
const github = require("@actions/github");
async function main() {
    try {
        if (github.context.payload.pull_request === undefined) {
            return;
        }
        const payload = github.context.payload;
        const token = core.getInput("pat");
        const octokit = github.getOctokit(token);
        const issue = await octokit.issues.get({
            owner: payload.repository.owner,
            repo: payload.repository.name,
            issue_number: payload.issue.number,
        });
        core.info(JSON.stringify(issue, null, 4));
        core.info(payload);
    }
    catch (e) {
        core.setFailed(e.message);
        core.setFailed(e);
    }
}
main().catch((e) => core.setFailed(e.message));
//# sourceMappingURL=index.js.map