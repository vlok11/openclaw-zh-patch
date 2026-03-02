import { Ot as theme } from "./entry.js";
import "./auth-profiles-CCroWIjr.js";
import "./agent-scope-Cqn0zzij.js";
import "./openclaw-root-DlBiBbD9.js";
import "./exec-BhaMholX.js";
import "./github-copilot-token-DKRiM6oj.js";
import "./host-env-security-BM8ktVlo.js";
import "./env-vars-DPtuUD7z.js";
import "./manifest-registry-DUdP0W0f.js";
import "./ip-BDxIP8rd.js";
import { t as formatDocsLink } from "./links-yQMT2QcX.js";
import { n as registerQrCli } from "./qr-cli-DDokP-SJ.js";

//#region src/cli/clawbot-cli.ts
function registerClawbotCli(program) {
	registerQrCli(program.command("clawbot").description("Legacy clawbot command aliases").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/clawbot", "docs.openclaw.ai/cli/clawbot")}\n`));
}

//#endregion
export { registerClawbotCli };