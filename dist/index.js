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
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        if (github.context.payload.pull_request === undefined) {
            return;
        }
        const payload = github.context.payload;
        const token = core.getInput("pat");
        const octokit = github.getOctokit(token);
        const issue = await octokit.issues.get({
            owner: (_c = (_b = (_a = payload.repository) === null || _a === void 0 ? void 0 : _a.owner) === null || _b === void 0 ? void 0 : _b.login) !== null && _c !== void 0 ? _c : error("no repository owner found in payload"),
            repo: (_e = (_d = payload.repository) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : error("no repository name found in payload"),
            issue_number: (_g = (_f = payload.issue) === null || _f === void 0 ? void 0 : _f.number) !== null && _g !== void 0 ? _g : error("no issue number found in payload"),
        });
        core.info(JSON.stringify(issue, null, 4));
        core.info(JSON.stringify(payload, null, 4));
    }
    catch (e) {
        core.setFailed(e.message);
        core.setFailed(e);
    }
}
main();
//# sourceMappingURL=index.js.map