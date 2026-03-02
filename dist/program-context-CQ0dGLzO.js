import { t as isTruthyEnvValue } from "./env-B5XQ5e-9.js";
import { o as hasHelpOrVersion, r as getPrimaryCommand, t as buildParseArgv } from "./argv-Bt72XfcP.js";
import { r as resolveActionArgs } from "./helpers-BjRf8izo.js";

//#region src/cli/program/action-reparse.ts
async function reparseProgramFromActionArgs(program, actionArgs) {
	const actionCommand = actionArgs.at(-1);
	const rawArgs = (actionCommand?.parent ?? program).rawArgs;
	const actionArgsList = resolveActionArgs(actionCommand);
	const fallbackArgv = actionCommand?.name() ? [actionCommand.name(), ...actionArgsList] : actionArgsList;
	const parseArgv = buildParseArgv({
		programName: program.name(),
		rawArgs,
		fallbackArgv
	});
	await program.parseAsync(parseArgv);
}

//#endregion
//#region src/cli/program/command-tree.ts
function removeCommand(program, command) {
	const commands = program.commands;
	const index = commands.indexOf(command);
	if (index < 0) return false;
	commands.splice(index, 1);
	return true;
}
function removeCommandByName(program, name) {
	const existing = program.commands.find((command) => command.name() === name);
	if (!existing) return false;
	return removeCommand(program, existing);
}

//#endregion
//#region src/cli/program/register.subclis.ts
const shouldRegisterPrimaryOnly = (argv) => {
	if (isTruthyEnvValue(process.env.OPENCLAW_DISABLE_LAZY_SUBCOMMANDS)) return false;
	if (hasHelpOrVersion(argv)) return false;
	return true;
};
const shouldEagerRegisterSubcommands = (_argv) => {
	return isTruthyEnvValue(process.env.OPENCLAW_DISABLE_LAZY_SUBCOMMANDS);
};
const loadConfig = async () => {
	return (await import("./model-selection-BBF__Y3p.js").then((n) => n.It)).loadConfig();
};
const entries = [
	{
		name: "acp",
		description: "Agent Control Protocol tools",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./acp-cli-Cutbam0v.js")).registerAcpCli(program);
		}
	},
	{
		name: "gateway",
		description: "运行、检查和查询 WebSocket 网关",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./gateway-cli-CRa8-nUx.js")).registerGatewayCli(program);
		}
	},
	{
		name: "daemon",
		description: "Gateway service (legacy alias)",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./daemon-cli-yE76QInm.js").then((n) => n.t)).registerDaemonCli(program);
		}
	},
	{
		name: "logs",
		description: "通过 RPC 查看网关日志",
		hasSubcommands: false,
		register: async (program) => {
			(await import("./logs-cli-BAbXJzqI.js")).registerLogsCli(program);
		}
	},
	{
		name: "system",
		description: "System events, heartbeat, and presence",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./system-cli-gqyzyUMM.js")).registerSystemCli(program);
		}
	},
	{
		name: "models",
		description: "发现、扫描和配置模型",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./models-cli-BDVWQQUt.js")).registerModelsCli(program);
		}
	},
	{
		name: "approvals",
		description: "管理执行审批（网关或节点主机）",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./exec-approvals-cli-aF8TC4u5.js")).registerExecApprovalsCli(program);
		}
	},
	{
		name: "nodes",
		description: "管理网关节点配对和节点命令",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./nodes-cli-DYSNSoOp.js")).registerNodesCli(program);
		}
	},
	{
		name: "devices",
		description: "Device pairing + token management",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./devices-cli-B7z1pGik.js")).registerDevicesCli(program);
		}
	},
	{
		name: "node",
		description: "运行和管理无头节点主机服务",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./node-cli-DIhPsd-E.js")).registerNodeCli(program);
		}
	},
	{
		name: "sandbox",
		description: "管理沙箱容器以隔离代理",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./sandbox-cli-Bbp-MiSh.js")).registerSandboxCli(program);
		}
	},
	{
		name: "tui",
		description: "打开连接到网关的终端界面",
		hasSubcommands: false,
		register: async (program) => {
			(await import("./tui-cli-BEtbxEnG.js")).registerTuiCli(program);
		}
	},
	{
		name: "cron",
		description: "通过网关调度器管理定时任务",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./cron-cli-Drp48xLq.js")).registerCronCli(program);
		}
	},
	{
		name: "dns",
		description: "DNS 工具 - 广域发现（Tailscale + CoreDNS）",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./dns-cli-B2a-PAAo.js")).registerDnsCli(program);
		}
	},
	{
		name: "docs",
		description: "搜索 OpenClaw 在线文档",
		hasSubcommands: false,
		register: async (program) => {
			(await import("./docs-cli-8tEpKGKv.js")).registerDocsCli(program);
		}
	},
	{
		name: "hooks",
		description: "管理内部代理 Hooks",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./hooks-cli-C3BoJgah.js")).registerHooksCli(program);
		}
	},
	{
		name: "webhooks",
		description: "Webhook 工具与集成",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./webhooks-cli-DmUAfiHR.js")).registerWebhooksCli(program);
		}
	},
	{
		name: "qr",
		description: "生成 iOS 配对二维码/设置码",
		hasSubcommands: false,
		register: async (program) => {
			(await import("./qr-cli-DN5UAHyy.js").then((n) => n.t)).registerQrCli(program);
		}
	},
	{
		name: "clawbot",
		description: "旧版 clawbot 命令别名",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./clawbot-cli-r6w6goT_.js")).registerClawbotCli(program);
		}
	},
	{
		name: "pairing",
		description: "安全私信配对（审批入站请求）",
		hasSubcommands: true,
		register: async (program) => {
			const { registerPluginCliCommands } = await import("./cli-Jrf9naLa.js");
			registerPluginCliCommands(program, await loadConfig());
			(await import("./pairing-cli-DhFOGCdw.js")).registerPairingCli(program);
		}
	},
	{
		name: "plugins",
		description: "管理 OpenClaw 插件和扩展",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./plugins-cli-rZGqEJH0.js")).registerPluginsCli(program);
			const { registerPluginCliCommands } = await import("./cli-Jrf9naLa.js");
			registerPluginCliCommands(program, await loadConfig());
		}
	},
	{
		name: "channels",
		description: "管理已连接的聊天渠道（Telegram、Discord 等）",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./channels-cli-BXX-2ufZ.js")).registerChannelsCli(program);
		}
	},
	{
		name: "directory",
		description: "查询支持渠道的联系人和群组 ID",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./directory-cli-B2MH5B_f.js")).registerDirectoryCli(program);
		}
	},
	{
		name: "security",
		description: "安全工具和本地配置审计",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./security-cli-BPhNarz7.js")).registerSecurityCli(program);
		}
	},
	{
		name: "secrets",
		description: "Secrets runtime reload controls",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./secrets-cli-C5NtDsma.js")).registerSecretsCli(program);
		}
	},
	{
		name: "skills",
		description: "列出和检查可用技能",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./skills-cli-BsP58_16.js")).registerSkillsCli(program);
		}
	},
	{
		name: "update",
		description: "更新 OpenClaw 并检查更新渠道状态",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./update-cli-Dp3a_dcw.js")).registerUpdateCli(program);
		}
	},
	{
		name: "completion",
		description: "Generate shell completion script",
		hasSubcommands: false,
		register: async (program) => {
			(await import("./completion-cli-CQelzVT2.js").then((n) => n.n)).registerCompletionCli(program);
		}
	}
];
function getSubCliEntries() {
	return entries;
}
function getSubCliCommandsWithSubcommands() {
	return entries.filter((entry) => entry.hasSubcommands).map((entry) => entry.name);
}
async function registerSubCliByName(program, name) {
	const entry = entries.find((candidate) => candidate.name === name);
	if (!entry) return false;
	removeCommandByName(program, entry.name);
	await entry.register(program);
	return true;
}
function registerLazyCommand(program, entry) {
	const placeholder = program.command(entry.name).description(entry.description);
	placeholder.allowUnknownOption(true);
	placeholder.allowExcessArguments(true);
	placeholder.action(async (...actionArgs) => {
		removeCommand(program, placeholder);
		await entry.register(program);
		await reparseProgramFromActionArgs(program, actionArgs);
	});
}
function registerSubCliCommands(program, argv = process.argv) {
	if (shouldEagerRegisterSubcommands(argv)) {
		for (const entry of entries) entry.register(program);
		return;
	}
	const primary = getPrimaryCommand(argv);
	if (primary && shouldRegisterPrimaryOnly(argv)) {
		const entry = entries.find((candidate) => candidate.name === primary);
		if (entry) {
			registerLazyCommand(program, entry);
			return;
		}
	}
	for (const candidate of entries) registerLazyCommand(program, candidate);
}

//#endregion
//#region src/cli/program/command-registry.ts
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
			(await import("./register.setup-DUncmjqv.js")).registerSetupCommand(program);
		}
	},
	{
		commands: [{
			name: "onboard",
			description: "网关、工作区和技能的交互式引导向导",
			hasSubcommands: false
		}],
		register: async ({ program }) => {
			(await import("./register.onboard-B8z1gUeF.js")).registerOnboardCommand(program);
		}
	},
	{
		commands: [{
			name: "configure",
			description: "Interactive setup wizard for credentials, channels, gateway, and agent defaults",
			hasSubcommands: false
		}],
		register: async ({ program }) => {
			(await import("./register.configure-D_pmh-1T.js")).registerConfigureCommand(program);
		}
	},
	{
		commands: [{
			name: "config",
			description: "Non-interactive config helpers (get/set/unset). Default: starts setup wizard.",
			hasSubcommands: true
		}],
		register: async ({ program }) => {
			(await import("./config-cli-l1RVZcnX.js")).registerConfigCli(program);
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
			(await import("./register.maintenance-DWGq-w3T.js")).registerMaintenanceCommands(program);
		}
	},
	{
		commands: [{
			name: "message",
			description: "Send, read, and manage messages",
			hasSubcommands: true
		}],
		register: async ({ program, ctx }) => {
			(await import("./register.message-Cly2yfjT.js")).registerMessageCommands(program, ctx);
		}
	},
	{
		commands: [{
			name: "memory",
			description: "搜索和重建记忆文件索引",
			hasSubcommands: true
		}],
		register: async ({ program }) => {
			(await import("./memory-cli-xv7oIePK.js").then((n) => n.t)).registerMemoryCli(program);
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
			(await import("./register.agent-8MiJ64HO.js")).registerAgentCommands(program, { agentChannelOptions: ctx.agentChannelOptions });
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
			(await import("./register.status-health-sessions-DR6dTVkJ.js")).registerStatusHealthSessionsCommands(program);
		}
	},
	{
		commands: [{
			name: "browser",
			description: "管理 OpenClaw 专用浏览器（Chrome/Chromium）",
			hasSubcommands: true
		}],
		register: async ({ program }) => {
			(await import("./browser-cli-C8MH_0Cx.js")).registerBrowserCli(program);
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
//#region src/cli/program/program-context.ts
const PROGRAM_CONTEXT_SYMBOL = Symbol.for("openclaw.cli.programContext");
function setProgramContext(program, ctx) {
	program[PROGRAM_CONTEXT_SYMBOL] = ctx;
}
function getProgramContext(program) {
	return program[PROGRAM_CONTEXT_SYMBOL];
}

//#endregion
export { registerCoreCliByName as a, getSubCliEntries as c, getCoreCliCommandsWithSubcommands as i, registerSubCliByName as l, setProgramContext as n, registerProgramCommands as o, getCoreCliCommandNames as r, getSubCliCommandsWithSubcommands as s, getProgramContext as t };