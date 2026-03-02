import { qt as resolveGatewayPort, st as resolveUserPath, v as defaultRuntime, zt as DEFAULT_GATEWAY_PORT } from "./entry.js";
import { L as writeConfigFile, N as readConfigFileSnapshot } from "./auth-profiles-CCroWIjr.js";
import { t as formatCliCommand } from "./command-format-CDHXQh1_.js";
import { t as WizardCancelledError } from "./prompts-Xu2Sveka.js";

//#region src/wizard/onboarding.ts
async function requireRiskAcknowledgement(params) {
	if (params.opts.acceptRisk === true) return;
	await params.prompter.note([
		"安全警告 — 请仔细阅读。",
		"",
		"OpenClaw 是一个业余项目，仍处于测试阶段。请注意可能存在的问题。",
		"默认情况下，OpenClaw 是个人代理：单一可信操作者边界。",
		"如果启用了工具，这个机器人可以读取文件并执行操作。",
		"恶意提示可能诱使它做出不安全的事情。",
		"",
		"OpenClaw 默认不是对抗性多租户边界。",
		"如果多个用户可以向同一个启用工具的代理发消息，他们将共享该代理的工具权限。",
		"",
		"如果你不熟悉安全加固和访问控制，请不要运行 OpenClaw。",
		"在启用工具或将其暴露到互联网之前，请寻求有经验的人帮助。",
		"",
		"建议的基线配置：",
		"- 配对/白名单 + 提及控制。",
		"- 多用户/共享信箱：拆分信任边界（独立网关/凭证，最好使用独立的系统用户/主机）。",
		"- 沙箱 + 最小权限工具。",
		"- 共享信箱：隔离私信会话 (`session.dmScope: per-channel-peer`) 并保持最小工具访问权限。",
		"- 将密钥保存在代理无法访问的文件系统之外。",
		"- 对于任何带有工具或不受信任收件箱的机器人，使用最强大的可用模型。",
		"",
		"定期运行：",
		"openclaw security audit --deep",
		"openclaw security audit --fix",
		"",
		"必读文档：https://docs.openclaw.ai/gateway/security",
		"",
		"汉化版社区：QQ群 https://qt.cool/c/OpenClaw | 微信群 https://qt.cool/c/OpenClawWx"
	].join("\n"), "安全");
	if (!await params.prompter.confirm({
		message: "我理解这默认是个人使用的，共享/多用户使用需要安全加固。是否继续？",
		initialValue: false
	})) throw new WizardCancelledError("风险未被接受");
}
async function runOnboardingWizard(opts, runtime = defaultRuntime, prompter) {
	const onboardHelpers = await import("./onboard-helpers-9g7UgWKP.js").then((n) => n.d);
	onboardHelpers.printWizardHeader(runtime);
	await prompter.intro("OpenClaw 初始化向导");
	await requireRiskAcknowledgement({
		opts,
		prompter
	});
	const snapshot = await readConfigFileSnapshot();
	let baseConfig = snapshot.valid ? snapshot.config : {};
	if (snapshot.exists && !snapshot.valid) {
		await prompter.note(onboardHelpers.summarizeExistingConfig(baseConfig), "Invalid config");
		if (snapshot.issues.length > 0) await prompter.note([
			...snapshot.issues.map((iss) => `- ${iss.path}: ${iss.message}`),
			"",
			"Docs: https://docs.openclaw.ai/gateway/configuration"
		].join("\n"), "Config issues");
		await prompter.outro(`Config invalid. Run \`${formatCliCommand("openclaw doctor")}\` to repair it, then re-run onboarding.`);
		runtime.exit(1);
		return;
	}
	const quickstartHint = `Configure details later via ${formatCliCommand("openclaw configure")}.`;
	const manualHint = "Configure port, network, Tailscale, and auth options.";
	const explicitFlowRaw = opts.flow?.trim();
	const normalizedExplicitFlow = explicitFlowRaw === "manual" ? "advanced" : explicitFlowRaw;
	if (normalizedExplicitFlow && normalizedExplicitFlow !== "quickstart" && normalizedExplicitFlow !== "advanced") {
		runtime.error("Invalid --flow (use quickstart, manual, or advanced).");
		runtime.exit(1);
		return;
	}
	let flow = (normalizedExplicitFlow === "quickstart" || normalizedExplicitFlow === "advanced" ? normalizedExplicitFlow : void 0) ?? await prompter.select({
		message: "初始化模式",
		options: [{
			value: "quickstart",
			label: "快速开始",
			hint: quickstartHint
		}, {
			value: "advanced",
			label: "手动配置",
			hint: manualHint
		}],
		initialValue: "quickstart"
	});
	if (opts.mode === "remote" && flow === "quickstart") {
		await prompter.note("快速开始仅支持本地网关。正在切换到手动配置模式。", "QuickStart");
		flow = "advanced";
	}
	if (snapshot.exists) {
		await prompter.note(onboardHelpers.summarizeExistingConfig(baseConfig), "检测到现有配置");
		if (await prompter.select({
			message: "配置处理方式",
			options: [
				{
					value: "keep",
					label: "使用现有值"
				},
				{
					value: "modify",
					label: "更新配置"
				},
				{
					value: "reset",
					label: "重置"
				}
			]
		}) === "reset") {
			const workspaceDefault = baseConfig.agents?.defaults?.workspace ?? onboardHelpers.DEFAULT_WORKSPACE;
			const resetScope = await prompter.select({
				message: "重置范围",
				options: [
					{
						value: "config",
						label: "仅配置文件"
					},
					{
						value: "config+creds+sessions",
						label: "配置 + 凭证 + 会话"
					},
					{
						value: "full",
						label: "完全重置 (配置 + 凭证 + 会话 + 工作区)"
					}
				]
			});
			await onboardHelpers.handleReset(resetScope, resolveUserPath(workspaceDefault), runtime);
			baseConfig = {};
		}
	}
	const quickstartGateway = (() => {
		const hasExisting = typeof baseConfig.gateway?.port === "number" || baseConfig.gateway?.bind !== void 0 || baseConfig.gateway?.auth?.mode !== void 0 || baseConfig.gateway?.auth?.token !== void 0 || baseConfig.gateway?.auth?.password !== void 0 || baseConfig.gateway?.customBindHost !== void 0 || baseConfig.gateway?.tailscale?.mode !== void 0;
		const bindRaw = baseConfig.gateway?.bind;
		const bind = bindRaw === "loopback" || bindRaw === "lan" || bindRaw === "auto" || bindRaw === "custom" || bindRaw === "tailnet" ? bindRaw : "loopback";
		let authMode = "token";
		if (baseConfig.gateway?.auth?.mode === "token" || baseConfig.gateway?.auth?.mode === "password") authMode = baseConfig.gateway.auth.mode;
		else if (baseConfig.gateway?.auth?.token) authMode = "token";
		else if (baseConfig.gateway?.auth?.password) authMode = "password";
		const tailscaleRaw = baseConfig.gateway?.tailscale?.mode;
		const tailscaleMode = tailscaleRaw === "off" || tailscaleRaw === "serve" || tailscaleRaw === "funnel" ? tailscaleRaw : "off";
		return {
			hasExisting,
			port: resolveGatewayPort(baseConfig),
			bind,
			authMode,
			tailscaleMode,
			token: baseConfig.gateway?.auth?.token,
			password: baseConfig.gateway?.auth?.password,
			customBindHost: baseConfig.gateway?.customBindHost,
			tailscaleResetOnExit: baseConfig.gateway?.tailscale?.resetOnExit ?? false
		};
	})();
	if (flow === "quickstart") {
		const formatBind = (value) => {
			if (value === "loopback") return "Loopback (127.0.0.1)";
			if (value === "lan") return "LAN";
			if (value === "custom") return "Custom IP";
			if (value === "tailnet") return "Tailnet (Tailscale IP)";
			return "Auto";
		};
		const formatAuth = (value) => {
			if (value === "token") return "Token (default)";
			return "Password";
		};
		const formatTailscale = (value) => {
			if (value === "off") return "Off";
			if (value === "serve") return "Serve";
			return "Funnel";
		};
		const quickstartLines = quickstartGateway.hasExisting ? [
			"保留当前网关设置：",
			`网关端口: ${quickstartGateway.port}`,
			`网关绑定: ${formatBind(quickstartGateway.bind)}`,
			...quickstartGateway.bind === "custom" && quickstartGateway.customBindHost ? [`Gateway custom IP: ${quickstartGateway.customBindHost}`] : [],
			`网关认证: ${formatAuth(quickstartGateway.authMode)}`,
			`Tailscale 暴露: ${formatTailscale(quickstartGateway.tailscaleMode)}`,
			"直接连接聊天频道。"
		] : [
			`网关端口: ${DEFAULT_GATEWAY_PORT}`,
			"网关绑定: 回环地址 (127.0.0.1)",
			"网关认证: 令牌 (默认)",
			"Tailscale 暴露: 关闭",
			"直接连接聊天频道。"
		];
		await prompter.note(quickstartLines.join("\n"), "QuickStart");
	}
	const localPort = resolveGatewayPort(baseConfig);
	const localUrl = `ws://127.0.0.1:${localPort}`;
	const localProbe = await onboardHelpers.probeGatewayReachable({
		url: localUrl,
		token: baseConfig.gateway?.auth?.token ?? process.env.OPENCLAW_GATEWAY_TOKEN,
		password: baseConfig.gateway?.auth?.password ?? process.env.OPENCLAW_GATEWAY_PASSWORD
	});
	const remoteUrl = baseConfig.gateway?.remote?.url?.trim() ?? "";
	const remoteProbe = remoteUrl ? await onboardHelpers.probeGatewayReachable({
		url: remoteUrl,
		token: baseConfig.gateway?.remote?.token
	}) : null;
	const mode = opts.mode ?? (flow === "quickstart" ? "local" : await prompter.select({
		message: "你想设置什么？",
		options: [{
			value: "local",
			label: "本地网关 (本机)",
			hint: localProbe.ok ? `网关可达 (${localUrl})` : `未检测到网关 (${localUrl})`
		}, {
			value: "remote",
			label: "远程网关 (仅信息)",
			hint: !remoteUrl ? "尚未配置远程 URL" : remoteProbe?.ok ? `网关可达 (${remoteUrl})` : `已配置但无法访问 (${remoteUrl})`
		}]
	}));
	if (mode === "remote") {
		const { promptRemoteGatewayConfig } = await import("./onboard-remote-CK0Lvye_.js").then((n) => n.t);
		const { logConfigUpdated } = await import("./logging-DY1J23zp.js").then((n) => n.r);
		let nextConfig = await promptRemoteGatewayConfig(baseConfig, prompter);
		nextConfig = onboardHelpers.applyWizardMetadata(nextConfig, {
			command: "onboard",
			mode
		});
		await writeConfigFile(nextConfig);
		logConfigUpdated(runtime);
		await prompter.outro("远程网关已配置。");
		return;
	}
	const workspaceDir = resolveUserPath((opts.workspace ?? (flow === "quickstart" ? baseConfig.agents?.defaults?.workspace ?? onboardHelpers.DEFAULT_WORKSPACE : await prompter.text({
		message: "工作区目录",
		initialValue: baseConfig.agents?.defaults?.workspace ?? onboardHelpers.DEFAULT_WORKSPACE
	}))).trim() || onboardHelpers.DEFAULT_WORKSPACE);
	const { applyOnboardingLocalWorkspaceConfig } = await import("./onboard-config-Dbw_yTW4.js").then((n) => n.n);
	let nextConfig = applyOnboardingLocalWorkspaceConfig(baseConfig, workspaceDir);
	const { ensureAuthProfileStore } = await import("./auth-profiles-CCroWIjr.js").then((n) => n.t);
	const { promptAuthChoiceGrouped } = await import("./auth-choice-prompt-CpL-zjIJ.js").then((n) => n.t);
	const { promptCustomApiConfig } = await import("./onboard-custom-BT2oTJ7M.js").then((n) => n.r);
	const { applyAuthChoice, resolvePreferredProviderForAuthChoice, warnIfModelConfigLooksOff } = await import("./auth-choice-Bjx_6hla.js").then((n) => n.t);
	const { applyPrimaryModel, promptDefaultModel } = await import("./model-picker-CU-vG_F7.js").then((n) => n.i);
	const authStore = ensureAuthProfileStore(void 0, { allowKeychainPrompt: false });
	const authChoiceFromPrompt = opts.authChoice === void 0;
	const authChoice = opts.authChoice ?? await promptAuthChoiceGrouped({
		prompter,
		store: authStore,
		includeSkip: true
	});
	if (authChoice === "custom-api-key") nextConfig = (await promptCustomApiConfig({
		prompter,
		runtime,
		config: nextConfig,
		secretInputMode: opts.secretInputMode
	})).config;
	else nextConfig = (await applyAuthChoice({
		authChoice,
		config: nextConfig,
		prompter,
		runtime,
		setDefaultModel: true,
		opts: {
			tokenProvider: opts.tokenProvider,
			token: opts.authChoice === "apiKey" && opts.token ? opts.token : void 0
		}
	})).config;
	if (authChoiceFromPrompt && authChoice !== "custom-api-key") {
		const modelSelection = await promptDefaultModel({
			config: nextConfig,
			prompter,
			allowKeep: true,
			ignoreAllowlist: true,
			includeVllm: true,
			preferredProvider: resolvePreferredProviderForAuthChoice(authChoice)
		});
		if (modelSelection.config) nextConfig = modelSelection.config;
		if (modelSelection.model) nextConfig = applyPrimaryModel(nextConfig, modelSelection.model);
	}
	await warnIfModelConfigLooksOff(nextConfig, prompter);
	const { configureGatewayForOnboarding } = await import("./onboarding.gateway-config-DnahIeBl.js");
	const gateway = await configureGatewayForOnboarding({
		flow,
		baseConfig,
		nextConfig,
		localPort,
		quickstartGateway,
		prompter,
		runtime
	});
	nextConfig = gateway.nextConfig;
	const settings = gateway.settings;
	if (opts.skipChannels ?? opts.skipProviders) await prompter.note("跳过频道设置。", "频道");
	else {
		const { listChannelPlugins } = await import("./plugins-L6ij92Mg.js").then((n) => n.i);
		const { setupChannels } = await import("./onboard-channels-Du0iYBIG.js").then((n) => n.n);
		const quickstartAllowFromChannels = flow === "quickstart" ? listChannelPlugins().filter((plugin) => plugin.meta.quickstartAllowFrom).map((plugin) => plugin.id) : [];
		nextConfig = await setupChannels(nextConfig, runtime, prompter, {
			allowSignalInstall: true,
			forceAllowFromChannels: quickstartAllowFromChannels,
			skipDmPolicyPrompt: flow === "quickstart",
			skipConfirm: flow === "quickstart",
			quickstartDefaults: flow === "quickstart"
		});
	}
	await writeConfigFile(nextConfig);
	const { logConfigUpdated } = await import("./logging-DY1J23zp.js").then((n) => n.r);
	logConfigUpdated(runtime);
	await onboardHelpers.ensureWorkspaceAndSessions(workspaceDir, runtime, { skipBootstrap: Boolean(nextConfig.agents?.defaults?.skipBootstrap) });
	if (opts.skipSkills) await prompter.note("跳过技能设置。", "技能");
	else {
		const { setupSkills } = await import("./onboard-skills-C9tDKxK7.js").then((n) => n.t);
		nextConfig = await setupSkills(nextConfig, workspaceDir, runtime, prompter);
	}
	const { setupInternalHooks } = await import("./onboard-hooks-D0_OHZtJ.js");
	nextConfig = await setupInternalHooks(nextConfig, runtime, prompter);
	nextConfig = onboardHelpers.applyWizardMetadata(nextConfig, {
		command: "onboard",
		mode
	});
	await writeConfigFile(nextConfig);
	const { finalizeOnboardingWizard } = await import("./onboarding.finalize-BFH5f5BU.js");
	const { launchedTui } = await finalizeOnboardingWizard({
		flow,
		opts,
		baseConfig,
		nextConfig,
		workspaceDir,
		settings,
		prompter,
		runtime
	});
	if (launchedTui) return;
}

//#endregion
export { runOnboardingWizard as t };