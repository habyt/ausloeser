"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function error(msg) {
    core.setFailed(msg);
    throw new Error(msg);
}
async function run() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    try {
        const payload = github.context.payload;
        const token = core.getInput("pat");
        const octokit = github.getOctokit(token);
        console.log(JSON.stringify(payload, null, 4));
        const owner = (_c = (_b = (_a = payload.repository) === null || _a === void 0 ? void 0 : _a.owner) === null || _b === void 0 ? void 0 : _b.login) !== null && _c !== void 0 ? _c : error("no repository owner found in payload");
        const repo = (_e = (_d = payload.repository) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : error("no repository name found in payload");
        const commentId = (_f = payload.comment) === null || _f === void 0 ? void 0 : _f.id;
        if (commentId === undefined) {
            return;
        }
        if (((_g = payload.issue) === null || _g === void 0 ? void 0 : _g.pull_request) === undefined) {
            core.info("No PR found in event. Ignoring.");
            return;
        }
        await octokit.reactions.createForIssueComment({
            owner,
            repo,
            comment_id: commentId,
            content: "eyes",
        });
        const pullNumber = (_j = (_h = payload.issue) === null || _h === void 0 ? void 0 : _h.number) !== null && _j !== void 0 ? _j : error("no issue number found in payload");
        const issue = await octokit.pulls.get({
            owner,
            repo,
            pull_number: pullNumber,
        });
        const user = issue.data.user.login;
        const comment = (_k = payload.comment) === null || _k === void 0 ? void 0 : _k.body;
        if (comment === undefined || typeof comment !== "string") {
            return;
        }
        const match = comment.match(/^\/(.+?)(\s|$)/);
        if (match === null) {
            console.log("No command found");
            return;
        }
        const command = match[1];
        const trigger = core.getInput("command", { required: true });
        if (command !== trigger) {
            console.log(command + " does not match trigger " + trigger);
            return;
        }
        const workflowName = core.getInput("workflow", { required: true });
        let workflowId = undefined;
        let page = 1;
        while (true) {
            const workflows = await octokit.actions.listRepoWorkflows({
                owner,
                repo,
                page,
                per_page: 50,
            });
            if (workflows.data.workflows.length === 0) {
                break;
            }
            const workflow = workflows.data.workflows.find((it) => it.name === workflowName);
            if (workflow !== undefined) {
                workflowId = workflow.id;
                break;
            }
            page++;
        }
        const pr = issue.data;
        const ref = pr.head.ref;
        if (workflowId === undefined) {
            console.log("did not find workflow " + workflowName);
            return;
        }
        const result = await octokit.actions.createWorkflowDispatch({
            owner,
            repo,
            workflow_id: workflowId,
            ref,
            inputs: {
                comment: comment.toString(),
                user: user.toString(),
                commentId: commentId.toString(),
            },
        });
        return;
    }
    catch (e) {
        core.info("error");
        core.info(e.toString());
        core.setFailed(e.message);
        core.setFailed(e);
    }
}
exports.run = run;
run();
//# sourceMappingURL=index.js.map