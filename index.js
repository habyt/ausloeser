const core = require("@actions/core");
const github = require("@actions/github");

try {
    const payload = JSON.stringify(github.context.payload, null, 4);
    console.log(payload);
} catch (e) {
    core.setFailed(e.message);
}
