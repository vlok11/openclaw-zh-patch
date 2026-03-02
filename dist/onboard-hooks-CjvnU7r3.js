import "./paths-B4BZAPZh.js";
import "./utils-BKDT474X.js";
import { d as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-B8pKj4S2.js";
import "./subsystem-DypCPrmP.js";
import "./openclaw-root-COHVwJ9B.js";
import "./exec-X_fw5eJV.js";
import { t as formatCliCommand } from "./command-format-ChfKqObn.js";
import "./boolean-Wzu0-e0P.js";
import "./frontmatter-C8fqIiB_.js";
import "./workspace-Bh5bqzse.js";
import { t as buildWorkspaceHookStatus } from "./hooks-status-jophEP-G.js";

//#region src/commands/onboard-hooks.ts
async function setupInternalHooks(cfg, runtime, prompter) {
	await prompter.note([
		"Hooks 让你在触发 Agent 命令时自动执行操作。",
		"示例：当你执行 /new 或 /reset 时保存会话上下文到记忆。",
		"",
		"了解更多：https://docs.openclaw.ai/automation/hooks"
	].join("\n"), "Hooks");
	const eligibleHooks = buildWorkspaceHookStatus(resolveAgentWorkspaceDir(cfg, resolveDefaultAgentId(cfg)), { config: cfg }).hooks.filter((h) => h.eligible);
	if (eligibleHooks.length === 0) {
		await prompter.note("未找到符合条件的 Hook。你可以在配置中稍后设置。", "No Hooks Available");
		return cfg;
	}
	const selected = (await prompter.multiselect({
		message: "启用 Hooks？",
		options: [{
			value: "__skip__",
			label: "暂时跳过"
		}, ...eligibleHooks.map((hook) => ({
			value: hook.name,
			label: `${hook.emoji ?? "🔗"} ${hook.name}`,
			hint: hook.description
		}))]
	})).filter((name) => name !== "__skip__");
	if (selected.length === 0) return cfg;
	const entries = { ...cfg.hooks?.internal?.entries };
	for (const name of selected) entries[name] = { enabled: true };
	const next = {
		...cfg,
		hooks: {
			...cfg.hooks,
			internal: {
				enabled: true,
				entries
			}
		}
	};
	await prompter.note([
		`已启用 ${selected.length} 个 Hook：${selected.join(", ")}`,
		"",
		"你可以稍后通过以下命令管理 Hooks：",
		`  ${formatCliCommand("openclaw hooks list")}`,
		`  ${formatCliCommand("openclaw hooks enable <name>")}`,
		`  ${formatCliCommand("openclaw hooks disable <name>")}`
	].join("\n"), "Hooks Configured");
	return next;
}

//#endregion
export { setupInternalHooks };