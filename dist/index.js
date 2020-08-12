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
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        const payload = github.context.payload;
        console.log("hallo");
        core.info("hallo");
        core.debug("hallo");
        core.info(JSON.stringify(payload, null, 4));
        if (((_a = payload.issue) === null || _a === void 0 ? void 0 : _a.pull_request) === undefined) {
            core.info("hallo2");
            return;
        }
        const token = core.getInput("pat");
        const octokit = github.getOctokit(token);
        core.info("hallo3");
        const issue = await octokit.issues.get({
            owner: (_d = (_c = (_b = payload.repository) === null || _b === void 0 ? void 0 : _b.owner) === null || _c === void 0 ? void 0 : _c.login) !== null && _d !== void 0 ? _d : error("no repository owner found in payload"),
            repo: (_f = (_e = payload.repository) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : error("no repository name found in payload"),
            issue_number: (_h = (_g = payload.issue) === null || _g === void 0 ? void 0 : _g.number) !== null && _h !== void 0 ? _h : error("no issue number found in payload"),
        });
        core.info("hallo4");
        core.info(JSON.stringify(issue, null, 4));
        core.info(JSON.stringify(payload, null, 4));
        return;
    }
    catch (e) {
        core.info("error");
        core.setFailed(e.message);
        core.setFailed(e);
    }
}
exports.run = run;
run();
//# sourceMappingURL=index.js.map