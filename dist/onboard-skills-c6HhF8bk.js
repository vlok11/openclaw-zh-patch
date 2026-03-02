import { t as __exportAll } from "./rolldown-runtime-Cbj13DAv.js";
import { Jr as normalizeSecretInput } from "./model-selection-BBF__Y3p.js";
import { t as formatCliCommand } from "./command-format-ChfKqObn.js";
import { _ as resolveNodeManagerOptions, r as detectBinary } from "./onboard-helpers-VrDt5aca.js";
import { t as buildWorkspaceSkillStatus } from "./skills-status-KF27cA6G.js";
import { t as installSkill } from "./skills-install-BBRkC0yK.js";

//#region src/commands/onboard-skills.ts
var onboard_skills_exports = /* @__PURE__ */ __exportAll({ setupSkills: () => setupSkills });
function summarizeInstallFailure(message) {
	const cleaned = message.replace(/^Install failed(?:\s*\([^)]*\))?\s*:?\s*/i, "").trim();
	if (!cleaned) return;
	const maxLen = 140;
	return cleaned.length > maxLen ? `${cleaned.slice(0, maxLen - 1)}…` : cleaned;
}
function formatSkillHint(skill) {
	const desc = skill.description?.trim();
	const installLabel = skill.install[0]?.label?.trim();
	const combined = desc && installLabel ? `${desc} — ${installLabel}` : desc || installLabel;
	if (!combined) return "install";
	const maxLen = 90;
	return combined.length > maxLen ? `${combined.slice(0, maxLen - 1)}…` : combined;
}
function upsertSkillEntry(cfg, skillKey, patch) {
	const entries = { ...cfg.skills?.entries };
	entries[skillKey] = {
		...entries[skillKey] ?? {},
		...patch
	};
	return {
		...cfg,
		skills: {
			...cfg.skills,
			entries
		}
	};
}
async function setupSkills(cfg, workspaceDir, runtime, prompter) {
	const report = buildWorkspaceSkillStatus(workspaceDir, { config: cfg });
	const eligible = report.skills.filter((s) => s.eligible);
	const unsupportedOs = report.skills.filter((s) => !s.disabled && !s.blockedByAllowlist && s.missing.os.length > 0);
	const missing = report.skills.filter((s) => !s.eligible && !s.disabled && !s.blockedByAllowlist && s.missing.os.length === 0);
	const blocked = report.skills.filter((s) => s.blockedByAllowlist);
	await prompter.note([
		`可用: ${eligible.length}`,
		`缺少依赖: ${missing.length}`,
		`Unsupported on this OS: ${unsupportedOs.length}`,
		`被白名单阻止: ${blocked.length}`
	].join("\n"), "技能状态");
	if (!await prompter.confirm({
		message: "现在配置技能？（推荐）",
		initialValue: true
	})) return cfg;
	const installable = missing.filter((skill) => skill.install.length > 0 && skill.missing.bins.length > 0);
	let next = cfg;
	if (installable.length > 0) {
		const selected = (await prompter.multiselect({
			message: "安装缺失的技能依赖",
			options: [{
				value: "__skip__",
				label: "暂时跳过",
				hint: "不安装依赖继续"
			}, ...installable.map((skill) => ({
				value: skill.name,
				label: `${skill.emoji ?? "🧩"} ${skill.name}`,
				hint: formatSkillHint(skill)
			}))]
		})).filter((name) => name !== "__skip__");
		const selectedSkills = selected.map((name) => installable.find((s) => s.name === name)).filter((item) => Boolean(item));
		if (process.platform !== "win32" && selectedSkills.some((skill) => skill.install.some((option) => option.kind === "brew")) && !await detectBinary("brew")) {
			await prompter.note(["许多技能依赖通过 Homebrew 分发。", "没有 brew，你需要从源码构建或手动下载。"].join("\n"), "建议安装 Homebrew");
			if (await prompter.confirm({
				message: "显示 Homebrew 安装命令？",
				initialValue: true
			})) await prompter.note(["运行:", "/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""].join("\n"), "Homebrew 安装");
		}
		if (selectedSkills.some((skill) => skill.install.some((option) => option.kind === "node"))) {
			const nodeManager = await prompter.select({
				message: "技能安装使用的 Node 包管理器",
				options: resolveNodeManagerOptions()
			});
			next = {
				...next,
				skills: {
					...next.skills,
					install: {
						...next.skills?.install,
						nodeManager
					}
				}
			};
		}
		for (const name of selected) {
			const target = installable.find((s) => s.name === name);
			if (!target || target.install.length === 0) continue;
			const installId = target.install[0]?.id;
			if (!installId) continue;
			const spin = prompter.progress(`正在安装 ${name}…`);
			const result = await installSkill({
				workspaceDir,
				skillName: target.name,
				installId,
				config: next
			});
			const warnings = result.warnings ?? [];
			if (result.ok) {
				spin.stop(warnings.length > 0 ? `Installed ${name} (with warnings)` : `已安装 ${name}`);
				for (const warning of warnings) runtime.log(warning);
				continue;
			}
			const code = result.code == null ? "" : ` (退出码 ${result.code})`;
			const detail = summarizeInstallFailure(result.message);
			spin.stop(`安装失败: ${name}${code}${detail ? ` — ${detail}` : ""}`);
			for (const warning of warnings) runtime.log(warning);
			if (result.stderr) runtime.log(result.stderr.trim());
			else if (result.stdout) runtime.log(result.stdout.trim());
			runtime.log(`提示: 运行 \`${formatCliCommand("openclaw doctor")}\` 查看技能和依赖状态。`);
			runtime.log("文档: https://docs.openclaw.ai/skills");
		}
	}
	for (const skill of missing) {
		if (!skill.primaryEnv || skill.missing.env.length === 0) continue;
		if (!await prompter.confirm({
			message: `设置 ${skill.primaryEnv} 用于 ${skill.name}？`,
			initialValue: false
		})) continue;
		const apiKey = String(await prompter.text({
			message: `输入 ${skill.primaryEnv}`,
			validate: (value) => value?.trim() ? void 0 : "Required"
		}));
		next = upsertSkillEntry(next, skill.skillKey, { apiKey: normalizeSecretInput(apiKey) });
	}
	return next;
}

//#endregion
export { setupSkills as n, onboard_skills_exports as t };