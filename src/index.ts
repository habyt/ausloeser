import * as core from "@actions/core"
import * as github from "@actions/github"

function error(msg: string): never {
    core.setFailed(msg)

    throw new Error(msg)
}

export async function run() {
    try {
        const payload = github.context.payload

        if (payload.issue?.pull_request === undefined) {
            core.info("No PR found in event. Ignoring.")
            return
        }

        const token = core.getInput("pat")
        const octokit = github.getOctokit(token)

        const owner =
            payload.repository?.owner?.login ??
            error("no repository owner found in payload")
        const repo =
            payload.repository?.name ??
            error("no repository name found in payload")

        const pullNumber =
            payload.issue?.number ?? error("no issue number found in payload")

        const issue = await octokit.pulls.get({
            owner,
            repo,
            pull_number: pullNumber,
        })

        let workflowId: number | undefined = undefined
        let page = 0
        while (true) {
            const workflows = await octokit.actions.listRepoWorkflows({
                owner,
                repo,
                page,
                per_page: 50,
            })

            console.log(JSON.stringify(workflows.data, null, 4))

            if (workflows.data.workflows.length === 0) {
                break
            }

            const workflow = workflows.data.workflows.find(
                (it) => it.path === core.getInput("workflow")
            )
            if (workflow !== undefined) {
                workflowId = workflow.id
                break
            }

            page++
        }

        const pr = issue.data
        const ref = pr.head.ref

        console.log(ref)
        console.log(workflowId)

        return
    } catch (e) {
        core.info("error")
        core.setFailed(e.message)
        core.setFailed(e)
    }
}

run()
