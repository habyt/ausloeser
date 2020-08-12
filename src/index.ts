import core from "@actions/core"
import github from "@actions/github"

function error(msg: string): never {
    core.setFailed(msg)

    throw new Error(msg)
}

async function main() {
    try {
        if (github.context.payload.pull_request === undefined) {
            return
        }

        const payload = github.context.payload

        const token = core.getInput("pat")
        const octokit = github.getOctokit(token)

        const issue = await octokit.issues.get({
            owner:
                payload.repository?.owner?.login ??
                error("no repository owner found in payload"),
            repo:
                payload.repository?.name ??
                error("no repository name found in payload"),
            issue_number:
                payload.issue?.number ??
                error("no issue number found in payload"),
        })

        core.info(JSON.stringify(issue, null, 4))

        core.info(JSON.stringify(payload, null, 4))
    } catch (e) {
        core.setFailed(e.message)
        core.setFailed(e)
    }
}

main().catch((e) => core.setFailed(e.message))
