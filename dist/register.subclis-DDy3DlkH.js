import { t as __exportAll } from "./rolldown-runtime-Cbj13DAv.js";
import { an as buildParseArgv, fn as hasHelpOrVersion, ln as getPrimaryCommand, r as isTruthyEnvValue } from "./entry.js";
import { r as resolveActionArgs } from "./helpers-3Jby5ubi.js";

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
var register_subclis_exports = /* @__PURE__ */ __exportAll({
	getSubCliCommandsWithSubcommands: () => getSubCliCommandsWithSubcommands,
	getSubCliEntries: () => getSubCliEntries,
	registerSubCliByName: () => registerSubCliByName,
	registerSubCliCommands: () => registerSubCliCommands
});
const shouldRegisterPrimaryOnly = (argv) => {
	if (isTruthyEnvValue(process.env.OPENCLAW_DISABLE_LAZY_SUBCOMMANDS)) return false;
	if (hasHelpOrVersion(argv)) return false;
	return true;
};
const shouldEagerRegisterSubcommands = (_argv) => {
	return isTruthyEnvValue(process.env.OPENCLAW_DISABLE_LAZY_SUBCOMMANDS);
};
const loadConfig = async () => {
	return (await import("./auth-profiles-CCroWIjr.js").then((n) => n.D)).loadConfig();
};
const entries = [
	{
		name: "acp",
		description: "Agent Control Protocol tools",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./acp-cli-D3eLihdk.js")).registerAcpCli(program);
		}
	},
	{
		name: "gateway",
		description: "运行、检查和查询 WebSocket 网关",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./gateway-cli-e4-jf5mY.js")).registerGatewayCli(program);
		}
	},
	{
		name: "daemon",
		description: "Gateway service (legacy alias)",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./daemon-cli-CWT5vDVm.js").then((n) => n.t)).registerDaemonCli(program);
		}
	},
	{
		name: "logs",
		description: "通过 RPC 查看网关日志",
		hasSubcommands: false,
		register: async (program) => {
			(await import("./logs-cli-QjEGaX1x.js")).registerLogsCli(program);
		}
	},
	{
		name: "system",
		description: "System events, heartbeat, and presence",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./system-cli-Bt1NsIQZ.js")).registerSystemCli(program);
		}
	},
	{
		name: "models",
		description: "发现、扫描和配置模型",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./models-cli--l746tDx.js")).registerModelsCli(program);
		}
	},
	{
		name: "approvals",
		description: "管理执行审批（网关或节点主机）",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./exec-approvals-cli-JlbP1LBv.js")).registerExecApprovalsCli(program);
		}
	},
	{
		name: "nodes",
		description: "管理网关节点配对和节点命令",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./nodes-cli-DMzKvcUP.js")).registerNodesCli(program);
		}
	},
	{
		name: "devices",
		description: "Device pairing + token management",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./devices-cli-B2iWK-S-.js")).registerDevicesCli(program);
		}
	},
	{
		name: "node",
		description: "运行和管理无头节点主机服务",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./node-cli-Cq78CBlJ.js")).registerNodeCli(program);
		}
	},
	{
		name: "sandbox",
		description: "管理沙箱容器以隔离代理",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./sandbox-cli-CJ66_I3K.js")).registerSandboxCli(program);
		}
	},
	{
		name: "tui",
		description: "打开连接到网关的终端界面",
		hasSubcommands: false,
		register: async (program) => {
			(await import("./tui-cli-fmZh0bVL.js")).registerTuiCli(program);
		}
	},
	{
		name: "cron",
		description: "通过网关调度器管理定时任务",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./cron-cli-hAsHLzUr.js")).registerCronCli(program);
		}
	},
	{
		name: "dns",
		description: "DNS 工具 - 广域发现（Tailscale + CoreDNS）",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./dns-cli-Dw-NQzsb.js")).registerDnsCli(program);
		}
	},
	{
		name: "docs",
		description: "搜索 OpenClaw 在线文档",
		hasSubcommands: false,
		register: async (program) => {
			(await import("./docs-cli-BlKkyRVa.js")).registerDocsCli(program);
		}
	},
	{
		name: "hooks",
		description: "管理内部代理 Hooks",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./hooks-cli-D4tDJ0zL.js")).registerHooksCli(program);
		}
	},
	{
		name: "webhooks",
		description: "Webhook 工具与集成",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./webhooks-cli-BcSM9CuM.js")).registerWebhooksCli(program);
		}
	},
	{
		name: "qr",
		description: "生成 iOS 配对二维码/设置码",
		hasSubcommands: false,
		register: async (program) => {
			(await import("./qr-cli-DDokP-SJ.js").then((n) => n.t)).registerQrCli(program);
		}
	},
	{
		name: "clawbot",
		description: "旧版 clawbot 命令别名",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./clawbot-cli-BPms8yEb.js")).registerClawbotCli(program);
		}
	},
	{
		name: "pairing",
		description: "安全私信配对（审批入站请求）",
		hasSubcommands: true,
		register: async (program) => {
			const { registerPluginCliCommands } = await import("./cli-8Vt_Rey7.js");
			registerPluginCliCommands(program, await loadConfig());
			(await import("./pairing-cli-CsED1jLR.js")).registerPairingCli(program);
		}
	},
	{
		name: "plugins",
		description: "管理 OpenClaw 插件和扩展",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./plugins-cli-D2mKUvgA.js")).registerPluginsCli(program);
			const { registerPluginCliCommands } = await import("./cli-8Vt_Rey7.js");
			registerPluginCliCommands(program, await loadConfig());
		}
	},
	{
		name: "channels",
		description: "管理已连接的聊天渠道（Telegram、Discord 等）",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./channels-cli-Dmv-dMQ0.js")).registerChannelsCli(program);
		}
	},
	{
		name: "directory",
		description: "查询支持渠道的联系人和群组 ID",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./directory-cli-KXwd36fp.js")).registerDirectoryCli(program);
		}
	},
	{
		name: "security",
		description: "安全工具和本地配置审计",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./security-cli-CtQNFfFU.js")).registerSecurityCli(program);
		}
	},
	{
		name: "secrets",
		description: "Secrets runtime reload controls",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./secrets-cli-DhVkLvpy.js")).registerSecretsCli(program);
		}
	},
	{
		name: "skills",
		description: "列出和检查可用技能",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./skills-cli-BuAzg9N3.js")).registerSkillsCli(program);
		}
	},
	{
		name: "update",
		description: "更新 OpenClaw 并检查更新渠道状态",
		hasSubcommands: true,
		register: async (program) => {
			(await import("./update-cli-CyrEdUgg.js")).registerUpdateCli(program);
		}
	},
	{
		name: "completion",
		description: "Generate shell completion script",
		hasSubcommands: false,
		register: async (program) => {
			(await import("./completion-cli-BDFedY1m.js").then((n) => n.n)).registerCompletionCli(program);
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
export { register_subclis_exports as a, registerSubCliCommands as i, getSubCliEntries as n, removeCommandByName as o, registerSubCliByName as r, reparseProgramFromActionArgs as s, getSubCliCommandsWithSubcommands as t };