"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const github_1 = __importDefault(require("@actions/github"));
function error(msg) {
    core_1.default.setFailed(msg);
    throw new Error(msg);
}
async function main() {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        if (github_1.default.context.payload.pull_request === undefined) {
            return;
        }
        const payload = github_1.default.context.payload;
        const token = core_1.default.getInput("pat");
        const octokit = github_1.default.getOctokit(token);
        const issue = await octokit.issues.get({
            owner: (_c = (_b = (_a = payload.repository) === null || _a === void 0 ? void 0 : _a.owner) === null || _b === void 0 ? void 0 : _b.login) !== null && _c !== void 0 ? _c : error("no repository owner found in payload"),
            repo: (_e = (_d = payload.repository) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : error("no repository name found in payload"),
            issue_number: (_g = (_f = payload.issue) === null || _f === void 0 ? void 0 : _f.number) !== null && _g !== void 0 ? _g : error("no issue number found in payload"),
        });
        core_1.default.info(JSON.stringify(issue, null, 4));
        core_1.default.info(JSON.stringify(payload, null, 4));
    }
    catch (e) {
        core_1.default.setFailed(e.message);
        core_1.default.setFailed(e);
    }
}
main().catch((e) => core_1.default.setFailed(e.message));
//# sourceMappingURL=index.js.map