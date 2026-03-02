import { Ot as theme, v as defaultRuntime } from "./entry.js";
import "./auth-profiles-CCroWIjr.js";
import "./agent-scope-Cqn0zzij.js";
import "./openclaw-root-DlBiBbD9.js";
import "./exec-BhaMholX.js";
import "./github-copilot-token-DKRiM6oj.js";
import "./host-env-security-BM8ktVlo.js";
import "./env-vars-DPtuUD7z.js";
import "./manifest-registry-DUdP0W0f.js";
import "./dock-DoNeMopA.js";
import "./frontmatter-DzgKaILZ.js";
import "./skills-XqIco29P.js";
import "./path-alias-guards-B-0eXtZD.js";
import "./message-channel-CJUwnCYd.js";
import "./sessions-BI3YGZp9.js";
import "./plugins-L6ij92Mg.js";
import "./accounts-jTTYYc3C.js";
import "./accounts-CnxuiQaw.js";
import "./accounts-DKgW2m_s.js";
import "./bindings-DRmXdWuq.js";
import "./logging-Cr3Gsq0-.js";
import "./paths-ANQqR741.js";
import "./chat-envelope-CrHAOMhr.js";
import "./client-C2kv9X_7.js";
import "./call-CxwFCooR.js";
import "./pairing-token-DzfCmsrM.js";
import "./net-DBrsyv8q.js";
import "./ip-BDxIP8rd.js";
import "./tailnet-Ca1WnFBq.js";
import "./image-ops-WZr1HLCX.js";
import "./pi-embedded-helpers-BGh5Y51s.js";
import "./sandbox-DkcIu9cl.js";
import "./tool-catalog-DABanDxl.js";
import "./chrome-C8Ffx63P.js";
import "./tailscale-Cz0j5H8x.js";
import "./auth-ML-4Xoce.js";
import "./server-context-DYjG-swq.js";
import "./paths-0_BeWGuF.js";
import "./redact-Dcypez3H.js";
import "./errors-Cu3BYw29.js";
import "./fs-safe-aP-y5ePv.js";
import "./ssrf-Bte-xH9B.js";
import "./store-BXu3Rh07.js";
import "./ports-B9YOEPbT.js";
import "./trash-C8oZT55U.js";
import "./server-middleware-CksvUSHW.js";
import "./tool-images-DRFHeGdm.js";
import "./thinking-DW6CKWyf.js";
import "./commands-6JkkpGGO.js";
import "./commands-registry-UNjSqqx3.js";
import "./tool-display-FacPPVzc.js";
import { t as parseTimeoutMs } from "./parse-timeout-D6jdFkXC.js";
import { t as formatDocsLink } from "./links-yQMT2QcX.js";
import { t as runTui } from "./tui-BFMqWcnm.js";

//#region src/cli/tui-cli.ts
function registerTuiCli(program) {
	program.command("tui").description("Open a terminal UI connected to the Gateway").option("--url <url>", "Gateway WebSocket URL (defaults to gateway.remote.url when configured)").option("--token <token>", "Gateway token (if required)").option("--password <password>", "Gateway password (if required)").option("--session <key>", "Session key (default: \"main\", or \"global\" when scope is global)").option("--deliver", "Deliver assistant replies", false).option("--thinking <level>", "Thinking level override").option("--message <text>", "Send an initial message after connecting").option("--timeout-ms <ms>", "Agent timeout in ms (defaults to agents.defaults.timeoutSeconds)").option("--history-limit <n>", "History entries to load", "200").addHelpText("after", () => `\n${theme.muted("Docs:")} ${formatDocsLink("/cli/tui", "docs.openclaw.ai/cli/tui")}\n`).action(async (opts) => {
		try {
			const timeoutMs = parseTimeoutMs(opts.timeoutMs);
			if (opts.timeoutMs !== void 0 && timeoutMs === void 0) defaultRuntime.error(`warning: invalid --timeout-ms "${String(opts.timeoutMs)}"; ignoring`);
			const historyLimit = Number.parseInt(String(opts.historyLimit ?? "200"), 10);
			await runTui({
				url: opts.url,
				token: opts.token,
				password: opts.password,
				session: opts.session,
				deliver: Boolean(opts.deliver),
				thinking: opts.thinking,
				message: opts.message,
				timeoutMs,
				historyLimit: Number.isNaN(historyLimit) ? void 0 : historyLimit
			});
		} catch (err) {
			defaultRuntime.error(String(err));
			defaultRuntime.exit(1);
		}
	});
}

//#endregion
export { registerTuiCli };