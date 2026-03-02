import { s as createSubsystemLogger } from "./entry.js";
import { j as loadConfig } from "./auth-profiles-CCroWIjr.js";
import { d as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-Cqn0zzij.js";
import "./openclaw-root-DlBiBbD9.js";
import "./exec-BhaMholX.js";
import "./github-copilot-token-DKRiM6oj.js";
import "./host-env-security-BM8ktVlo.js";
import "./env-vars-DPtuUD7z.js";
import "./manifest-registry-DUdP0W0f.js";
import "./dock-DoNeMopA.js";
import "./model-BAxKkGzb.js";
import "./pi-model-discovery-D9FivFR5.js";
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
import "./send-CbrFsCD2.js";
import "./send-DvyC7dym.js";
import { _ as loadOpenClawPlugins } from "./subagent-registry-gheT8zqW.js";
import "./paths-ANQqR741.js";
import "./chat-envelope-CrHAOMhr.js";
import "./client-C2kv9X_7.js";
import "./call-CxwFCooR.js";
import "./pairing-token-DzfCmsrM.js";
import "./net-DBrsyv8q.js";
import "./ip-BDxIP8rd.js";
import "./tailnet-Ca1WnFBq.js";
import "./tokens-DytUXmpb.js";
import "./with-timeout-3FuiVV0x.js";
import "./deliver-B34AklnL.js";
import "./diagnostic-ilkPeYFb.js";
import "./diagnostic-session-state-Cw3EMvZy.js";
import "./send-IrF5F7V9.js";
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
import "./models-config-BzCJ51uy.js";
import "./exec-approvals-allowlist-dZySVop0.js";
import "./exec-safe-bin-runtime-policy-Bw1QcMM_.js";
import "./reply-prefix-uJIUoXFx.js";
import "./memory-cli-BFIkywo7.js";
import "./manager-BLmQp9SO.js";
import "./gemini-auth-BuhzVOat.js";
import "./fetch-guard-DVFm6--m.js";
import "./query-expansion-CP14Ly4R.js";
import "./retry-DRMxSLyf.js";
import "./target-errors-DxuxEzkD.js";
import "./chunk-BzS5RYkf.js";
import "./markdown-tables-VBjPTnhJ.js";
import "./local-roots-CLyxXgFw.js";
import "./ir-lWeyBEGr.js";
import "./render-C1H8wE-4.js";
import "./commands-6JkkpGGO.js";
import "./commands-registry-UNjSqqx3.js";
import "./image-Jtyrj0lr.js";
import "./tool-display-FacPPVzc.js";
import "./runner-jh93Z0iJ.js";
import "./model-catalog-CNqouy97.js";
import "./fetch-CgA7FwwB.js";
import "./pairing-store-BneTqcNI.js";
import "./exec-approvals-UjbIDJw1.js";
import "./nodes-screen-BNq9DmvM.js";
import "./session-utils-Bm6bvSEI.js";
import "./session-cost-usage-B1Kk2v41.js";
import "./skill-commands-BCGigbmQ.js";
import "./workspace-dirs-C4DhsbZL.js";
import "./channel-activity-wMIoQsvx.js";
import "./tables-DZQsQueJ.js";
import "./server-lifecycle-C6vA34h0.js";
import "./stagger-BJGKxryR.js";
import "./channel-selection-CkYwg1X0.js";
import "./plugin-auto-enable-xva3bT1N.js";
import "./send-DlbG5-Nq.js";
import "./outbound-attachment-CixfYhOl.js";
import "./delivery-queue-C7pBPro_.js";
import "./send-DgwnbcsQ.js";
import "./resolve-route-B78qPj32.js";
import "./system-run-command-CA4aZBEu.js";
import "./pi-tools.policy-Dp2cgsNC.js";
import "./proxy-C-FYeH9g.js";
import "./links-yQMT2QcX.js";
import "./cli-utils-CKDCmKAq.js";
import "./help-format-Du-bXlH0.js";
import "./progress-bvyZjsUc.js";
import "./replies-vyXk-zuk.js";
import "./onboard-helpers-9g7UgWKP.js";
import "./prompt-style-wsroINzm.js";
import "./pairing-labels-DZiJTyb5.js";

//#region src/plugins/cli.ts
const log = createSubsystemLogger("plugins");
function registerPluginCliCommands(program, cfg) {
	const config = cfg ?? loadConfig();
	const workspaceDir = resolveAgentWorkspaceDir(config, resolveDefaultAgentId(config));
	const logger = {
		info: (msg) => log.info(msg),
		warn: (msg) => log.warn(msg),
		error: (msg) => log.error(msg),
		debug: (msg) => log.debug(msg)
	};
	const registry = loadOpenClawPlugins({
		config,
		workspaceDir,
		logger
	});
	const existingCommands = new Set(program.commands.map((cmd) => cmd.name()));
	for (const entry of registry.cliRegistrars) {
		if (entry.commands.length > 0) {
			const overlaps = entry.commands.filter((command) => existingCommands.has(command));
			if (overlaps.length > 0) {
				log.debug(`plugin CLI register skipped (${entry.pluginId}): command already registered (${overlaps.join(", ")})`);
				continue;
			}
		}
		try {
			const result = entry.register({
				program,
				config,
				workspaceDir,
				logger
			});
			if (result && typeof result.then === "function") result.catch((err) => {
				log.warn(`plugin CLI register failed (${entry.pluginId}): ${String(err)}`);
			});
			for (const command of entry.commands) existingCommands.add(command);
		} catch (err) {
			log.warn(`plugin CLI register failed (${entry.pluginId}): ${String(err)}`);
		}
	}
}

//#endregion
export { registerPluginCliCommands };