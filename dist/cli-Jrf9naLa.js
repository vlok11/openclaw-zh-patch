import "./paths-B4BZAPZh.js";
import "./utils-BKDT474X.js";
import "./thinking-EAliFiVK.js";
import { ht as loadOpenClawPlugins } from "./reply-Cd47NANO.js";
import { d as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-B8pKj4S2.js";
import { t as createSubsystemLogger } from "./subsystem-DypCPrmP.js";
import "./openclaw-root-COHVwJ9B.js";
import "./exec-X_fw5eJV.js";
import { Bt as loadConfig } from "./model-selection-BBF__Y3p.js";
import "./github-copilot-token-nncItI8D.js";
import "./boolean-Wzu0-e0P.js";
import "./env-B5XQ5e-9.js";
import "./host-env-security-lcjXF83D.js";
import "./env-vars-Duxu9t5m.js";
import "./manifest-registry-BkakDeG2.js";
import "./dock-wsoCVMBL.js";
import "./message-channel-BFAJAoI_.js";
import "./send-B1lWtsSh.js";
import "./runner-Dd0vnbPj.js";
import "./image-jhTinSd6.js";
import "./models-config-CY9aqXjb.js";
import "./pi-model-discovery-CN9Vzcp9.js";
import "./pi-embedded-helpers-BZgCWDz1.js";
import "./sandbox-BJ98wR5R.js";
import "./tool-catalog-BWgva5h1.js";
import "./chrome-Ba8SKxst.js";
import "./tailscale-DgFgUW99.js";
import "./ip-DK-vcRii.js";
import "./tailnet-kbXXH7kK.js";
import "./ws-zZ6eXqMi.js";
import "./auth-DokunS-s.js";
import "./server-context-6oaBUDvN.js";
import "./frontmatter-C8fqIiB_.js";
import "./skills-78tBsqAH.js";
import "./path-alias-guards-C03BRMtn.js";
import "./paths-Bv4nQKyP.js";
import "./redact-B76y7XVG.js";
import "./errors-8IxbaLwV.js";
import "./fs-safe-CbqCTZDS.js";
import "./ssrf-DN6IsWAy.js";
import "./image-ops-DKdGMPEO.js";
import "./store-5dMbPc1E.js";
import "./ports-Cyh6xQxA.js";
import "./trash-Dd-0scMD.js";
import "./server-middleware-BqKURFqJ.js";
import "./sessions-BSbjZ5qr.js";
import "./plugins-DUfQp9H2.js";
import "./accounts-CbSDbxsL.js";
import "./accounts-B-amtsmS.js";
import "./accounts-by8A9Yl7.js";
import "./bindings-D4FakUsM.js";
import "./logging-_TuF9Wz5.js";
import "./send-CJdsflMs.js";
import "./paths-CxPj6Z2y.js";
import "./chat-envelope-CZCr0x5F.js";
import "./tool-images-UJsxlzPQ.js";
import "./tool-display-CERZKWmU.js";
import "./fetch-guard-CVpSbg3c.js";
import "./api-key-rotation-DuKQqHzz.js";
import "./local-roots-JoIYHchA.js";
import "./model-catalog-CdZtthLU.js";
import "./tokens-LFopHMoh.js";
import "./deliver-Cs0GfXNu.js";
import "./commands-Bo8Neixn.js";
import "./commands-registry-BFqUs_CX.js";
import "./client-EwxHy0Jk.js";
import "./call-ZwtMGKn2.js";
import "./pairing-token-BdLe8Jtz.js";
import "./fetch-CfmRs4ph.js";
import "./retry-DaYeUuIS.js";
import "./pairing-store-BIGKmxbu.js";
import "./exec-approvals-Coe3V-Ad.js";
import "./exec-approvals-allowlist-BTX79wZV.js";
import "./exec-safe-bin-runtime-policy-BXSdAA4g.js";
import "./nodes-screen-BJA7sZ0c.js";
import "./target-errors-C-BLJJgu.js";
import "./diagnostic-session-state-BCQ_xRK9.js";
import "./with-timeout-BJ4BYMBE.js";
import "./diagnostic-nLkEtXii.js";
import "./send-CJhpQlrD.js";
import "./model-DkF0AErV.js";
import "./reply-prefix-DDC9K4aF.js";
import "./memory-cli-xv7oIePK.js";
import "./manager-CFRkrYbL.js";
import "./query-expansion-CJ6fu-ua.js";
import "./chunk-B8zx2WnL.js";
import "./markdown-tables-t-aeRfb1.js";
import "./ir-QAa2l1hP.js";
import "./render-CAaBsF7l.js";
import "./pi-tools.policy-BnZiciSw.js";
import "./channel-activity-ChavUAf9.js";
import "./tables-Cww2SiqC.js";
import "./send-C6KCz57O.js";
import "./proxy-DZJY4nKm.js";
import "./links-_OmPhBsv.js";
import "./cli-utils-CzIyxbam.js";
import "./help-format-CWJQePOA.js";
import "./progress-OUlzaka3.js";
import "./resolve-route-IPjPs3wC.js";
import "./replies-C01ZlzMn.js";
import "./skill-commands-D37h1iqI.js";
import "./workspace-dirs-B5cOGZC0.js";
import "./plugin-auto-enable-B1WLFcJc.js";
import "./channel-selection-DxABYCoi.js";
import "./outbound-attachment-Dj2JOV8y.js";
import "./delivery-queue-C9RsX5zv.js";
import "./session-cost-usage-CjEHEp-I.js";
import "./send-DRLt5IaL.js";
import "./onboard-helpers-VrDt5aca.js";
import "./prompt-style-CQUEv9Gp.js";
import "./pairing-labels-tKSq8sOL.js";
import "./server-lifecycle-C57TnJFF.js";
import "./stagger-DCVgoPuj.js";
import "./system-run-command-k7fJ4TOr.js";

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