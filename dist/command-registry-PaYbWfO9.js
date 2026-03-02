import { t as __exportAll } from "./rolldown-runtime-Cbj13DAv.js";
import { fn as hasHelpOrVersion, ln as getPrimaryCommand } from "./entry.js";
import { i as registerSubCliCommands, o as removeCommandByName, s as reparseProgramFromActionArgs } from "./register.subclis-DDy3DlkH.js";

//#region src/cli/program/command-registry.ts
var command_registry_exports = /* @__PURE__ */ __exportAll({
	getCoreCliCommandNames: () => getCoreCliCommandNames,
	getCoreCliCommandsWithSubcommands: () => getCoreCliCommandsWithSubcommands,
	registerCoreCliByName: () => registerCoreCliByName,
	registerCoreCliCommands: () => registerCoreCliCommands,
	registerProgramCommands: () => registerProgramCommands
});
const shouldRegisterCorePrimaryOnly = (argv) => {
	if (hasHelpOrVersion(argv)) return false;
	return true;
};
const coreEntries = [
	{
		commands: [{
			name: "setup",
			description: "初始化本地配置和代理工作区",
			hasSubcommands: false
		}],
		register: async ({ program }) => {
			(await import("./register.setup-B3dAaEOh.js")).registerSetupCommand(program);
		}
	},
	{
		commands: [{
			name: "onboard",
			description: "网关、工作区和技能的交互式引导向导",
			hasSubcommands: false
		}],
		register: async ({ program }) => {
			(await import("./register.onboard-BWn3Snja.js")).registerOnboardCommand(program);
		}
	},
	{
		commands: [{
			name: "configure",
			description: "Interactive setup wizard for credentials, channels, gateway, and agent defaults",
			hasSubcommands: false
		}],
		register: async ({ program }) => {
			(await import("./register.configure-HbXXazAI.js")).registerConfigureCommand(program);
		}
	},
	{
		commands: [{
			name: "config",
			description: "Non-interactive config helpers (get/set/unset). Default: starts setup wizard.",
			hasSubcommands: true
		}],
		register: async ({ program }) => {
			(await import("./config-cli-xoPVgGCw.js")).registerConfigCli(program);
		}
	},
	{
		commands: [
			{
				name: "doctor",
				description: "Health checks + quick fixes for the gateway and channels",
				hasSubcommands: false
			},
			{
				name: "dashboard",
				description: "Open the Control UI with your current token",
				hasSubcommands: false
			},
			{
				name: "reset",
				description: "Reset local config/state (keeps the CLI installed)",
				hasSubcommands: false
			},
			{
				name: "uninstall",
				description: "Uninstall the gateway service + local data (CLI remains)",
				hasSubcommands: false
			}
		],
		register: async ({ program }) => {
			(await import("./register.maintenance-bAVCQybg.js")).registerMaintenanceCommands(program);
		}
	},
	{
		commands: [{
			name: "message",
			description: "Send, read, and manage messages",
			hasSubcommands: true
		}],
		register: async ({ program, ctx }) => {
			(await import("./register.message--BQMzqR6.js")).registerMessageCommands(program, ctx);
		}
	},
	{
		commands: [{
			name: "memory",
			description: "搜索和重建记忆文件索引",
			hasSubcommands: true
		}],
		register: async ({ program }) => {
			(await import("./memory-cli-BFIkywo7.js").then((n) => n.t)).registerMemoryCli(program);
		}
	},
	{
		commands: [{
			name: "agent",
			description: "通过网关运行一次代理",
			hasSubcommands: false
		}, {
			name: "agents",
			description: "管理隔离的代理（工作区、认证、路由）",
			hasSubcommands: true
		}],
		register: async ({ program, ctx }) => {
			(await import("./register.agent-BvRYiqwu.js")).registerAgentCommands(program, { agentChannelOptions: ctx.agentChannelOptions });
		}
	},
	{
		commands: [
			{
				name: "status",
				description: "显示渠道健康状态和最近会话接收者",
				hasSubcommands: false
			},
			{
				name: "health",
				description: "从运行中的网关获取健康状态",
				hasSubcommands: false
			},
			{
				name: "sessions",
				description: "列出已存储的对话会话",
				hasSubcommands: true
			}
		],
		register: async ({ program }) => {
			(await import("./register.status-health-sessions-sfqWZ776.js")).registerStatusHealthSessionsCommands(program);
		}
	},
	{
		commands: [{
			name: "browser",
			description: "管理 OpenClaw 专用浏览器（Chrome/Chromium）",
			hasSubcommands: true
		}],
		register: async ({ program }) => {
			(await import("./browser-cli-Dh8bjAlb.js")).registerBrowserCli(program);
		}
	}
];
function collectCoreCliCommandNames(predicate) {
	const seen = /* @__PURE__ */ new Set();
	const names = [];
	for (const entry of coreEntries) for (const command of entry.commands) {
		if (predicate && !predicate(command)) continue;
		if (seen.has(command.name)) continue;
		seen.add(command.name);
		names.push(command.name);
	}
	return names;
}
function getCoreCliCommandNames() {
	return collectCoreCliCommandNames();
}
function getCoreCliCommandsWithSubcommands() {
	return collectCoreCliCommandNames((command) => command.hasSubcommands);
}
function removeEntryCommands(program, entry) {
	for (const cmd of entry.commands) removeCommandByName(program, cmd.name);
}
function registerLazyCoreCommand(program, ctx, entry, command) {
	const placeholder = program.command(command.name).description(command.description);
	placeholder.allowUnknownOption(true);
	placeholder.allowExcessArguments(true);
	placeholder.action(async (...actionArgs) => {
		removeEntryCommands(program, entry);
		await entry.register({
			program,
			ctx,
			argv: process.argv
		});
		await reparseProgramFromActionArgs(program, actionArgs);
	});
}
async function registerCoreCliByName(program, ctx, name, argv = process.argv) {
	const entry = coreEntries.find((candidate) => candidate.commands.some((cmd) => cmd.name === name));
	if (!entry) return false;
	removeEntryCommands(program, entry);
	await entry.register({
		program,
		ctx,
		argv
	});
	return true;
}
function registerCoreCliCommands(program, ctx, argv) {
	const primary = getPrimaryCommand(argv);
	if (primary && shouldRegisterCorePrimaryOnly(argv)) {
		const entry = coreEntries.find((candidate) => candidate.commands.some((cmd) => cmd.name === primary));
		if (entry) {
			const cmd = entry.commands.find((c) => c.name === primary);
			if (cmd) registerLazyCoreCommand(program, ctx, entry, cmd);
			return;
		}
	}
	for (const entry of coreEntries) for (const cmd of entry.commands) registerLazyCoreCommand(program, ctx, entry, cmd);
}
function registerProgramCommands(program, ctx, argv = process.argv) {
	registerCoreCliCommands(program, ctx, argv);
	registerSubCliCommands(program, argv);
}

//#endregion
export { registerProgramCommands as a, registerCoreCliByName as i, getCoreCliCommandNames as n, getCoreCliCommandsWithSubcommands as r, command_registry_exports as t };