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
exports.postRun = void 0;
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const _1 = require(".");
async function postRun() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const payload = github.context.payload;
    const token = core.getInput("pat");
    const octokit = github.getOctokit(token);
    const owner = (_c = (_b = (_a = payload.repository) === null || _a === void 0 ? void 0 : _a.owner) === null || _b === void 0 ? void 0 : _b.login) !== null && _c !== void 0 ? _c : _1.error("no repository owner found in payload");
    const repo = (_e = (_d = payload.repository) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : _1.error("no repository name found in payload");
    const commentId = (_g = (_f = payload.comment) === null || _f === void 0 ? void 0 : _f.id) !== null && _g !== void 0 ? _g : (_h = payload.inputs) === null || _h === void 0 ? void 0 : _h.commentId;
    if (commentId === undefined) {
        return;
    }
    console.log(JSON.stringify(github.context, null, 4));
    if (payload.inputs !== undefined) {
        const user = await octokit.users.getAuthenticated();
        user.data.login;
        const reactions = await octokit.reactions.listForIssueComment({
            owner,
            repo,
            comment_id: commentId,
        });
        const reaction = reactions.data.find((it) => it.user.id === user.data.id);
        if (reaction !== undefined) {
            await octokit.reactions.deleteForIssueComment({
                owner,
                repo,
                comment_id: commentId,
                reaction_id: reaction.id,
            });
        }
    }
}
exports.postRun = postRun;
postRun();
//# sourceMappingURL=post.js.map