import * as core from "@actions/core"
import * as github from "@actions/github"
import { error } from "."

export async function postRun() {
    const payload = github.context.payload

    const token = core.getInput("pat")
    const octokit = github.getOctokit(token)

    const owner =
        payload.repository?.owner?.login ??
        error("no repository owner found in payload")
    const repo =
        payload.repository?.name ?? error("no repository name found in payload")
    const commentId = payload.comment?.id ?? payload.inputs?.commentId
    if (commentId === undefined) {
        return
    }

    console.log(JSON.stringify(github.context, null, 4))

    if (payload.inputs !== undefined) {
        const user = await octokit.users.getAuthenticated()
        const reactions = await octokit.reactions.listForIssueComment({
            owner,
            repo,
            comment_id: commentId,
        })
        const reaction = reactions.data.find(
            (it) => it.user.id === user.data.id
        )
        if (reaction !== undefined) {
            await octokit.reactions.deleteForIssueComment({
                owner,
                repo,
                comment_id: commentId,
                reaction_id: reaction.id,
            })
        }
    }
}

postRun()
