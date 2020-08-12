import { setFailed } from "@actions/core";
import { context } from "@actions/github";

try {
    const payload = JSON.stringify(context.payload, null, 4);
    console.log(payload);
} catch (e) {
    setFailed(e.message);
}
