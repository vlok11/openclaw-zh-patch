import { t as formatCliCommand } from "./command-format-CDHXQh1_.js";
import { d as resolveDefaultAgentId, u as resolveAgentWorkspaceDir } from "./agent-scope-Cqn0zzij.js";
import "./openclaw-root-DlBiBbD9.js";
import "./exec-BhaMholX.js";
import "./frontmatter-DzgKaILZ.js";
import "./workspace-EdbZE9ww.js";
import { t as buildWorkspaceHookStatus } from "./hooks-status-D9FQr5KE.js";

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