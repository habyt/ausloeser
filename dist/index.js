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
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function error(msg) {
    core.setFailed(msg);
    throw new Error(msg);
}
async function main() {
    try {
        if (github.context.payload.pull_request === undefined) {
            return;
        }
        const payload = github.context.payload;
        const token = core.getInput("pat");
        const octokit = github.getOctokit(token);
        //const issue = await octokit.issues.get({
        //    owner:
        //        payload.repository?.owner?.login ??
        //        error("no repository owner found in payload"),
        //    repo:
        //        payload.repository?.name ??
        //        error("no repository name found in payload"),
        //    issue_number:
        //        payload.issue?.number ??
        //        error("no issue number found in payload"),
        //})
        //core.info(JSON.stringify(issue, null, 4))
        core.info(JSON.stringify(payload, null, 4));
    }
    catch (e) {
        core.setFailed(e.message);
        core.setFailed(e);
    }
}
main().catch((e) => {
    console.log(JSON.stringify(e));
    core.setFailed(JSON.stringify(e));
});
//# sourceMappingURL=index.js.map