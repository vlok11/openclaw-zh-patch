import "./paths-B4BZAPZh.js";
import "./utils-BKDT474X.js";
import "./agent-scope-B8pKj4S2.js";
import "./subsystem-DypCPrmP.js";
import "./openclaw-root-COHVwJ9B.js";
import "./exec-X_fw5eJV.js";
import "./model-selection-BBF__Y3p.js";
import "./github-copilot-token-nncItI8D.js";
import "./boolean-Wzu0-e0P.js";
import "./env-B5XQ5e-9.js";
import "./host-env-security-lcjXF83D.js";
import "./env-vars-Duxu9t5m.js";
import "./manifest-registry-BkakDeG2.js";
import "./dock-wsoCVMBL.js";
import "./message-channel-BFAJAoI_.js";
import { a as findTailscaleBinary } from "./tailscale-DgFgUW99.js";
import "./ip-DK-vcRii.js";
import "./tailnet-kbXXH7kK.js";
import "./ws-zZ6eXqMi.js";
import "./sessions-BSbjZ5qr.js";
import "./plugins-DUfQp9H2.js";
import "./accounts-CbSDbxsL.js";
import "./accounts-B-amtsmS.js";
import "./accounts-by8A9Yl7.js";
import "./bindings-D4FakUsM.js";
import "./logging-_TuF9Wz5.js";
import "./paths-CxPj6Z2y.js";
import "./chat-envelope-CZCr0x5F.js";
import "./client-EwxHy0Jk.js";
import "./call-ZwtMGKn2.js";
import "./pairing-token-BdLe8Jtz.js";
import { h as randomToken, u as normalizeGatewayTokenInput, y as validateGatewayPasswordInput } from "./onboard-helpers-VrDt5aca.js";
import "./prompt-style-CQUEv9Gp.js";
import { i as TAILSCALE_MISSING_BIN_NOTE_LINES, n as TAILSCALE_DOCS_LINES, r as TAILSCALE_EXPOSURE_OPTIONS, t as validateIPv4AddressInput } from "./ipv4-Un01sQUC.js";

//#region src/wizard/onboarding.gateway-config.ts
const DEFAULT_DANGEROUS_NODE_DENY_COMMANDS = [
	"camera.snap",
	"camera.clip",
	"screen.record",
	"calendar.add",
	"contacts.add",
	"reminders.add"
];
function buildDefaultControlUiAllowedOrigins(params) {
	const origins = new Set([`http://localhost:${params.port}`, `http://127.0.0.1:${params.port}`]);
	if (params.bind === "custom" && params.customBindHost) origins.add(`http://${params.customBindHost}:${params.port}`);
	return [...origins];
}
async function configureGatewayForOnboarding(opts) {
	const { flow, localPort, quickstartGateway, prompter } = opts;
	let { nextConfig } = opts;
	const port = flow === "quickstart" ? quickstartGateway.port : Number.parseInt(String(await prompter.text({
		message: "网关端口",
		initialValue: String(localPort),
		validate: (value) => Number.isFinite(Number(value)) ? void 0 : "无效端口"
	})), 10);
	let bind = flow === "quickstart" ? quickstartGateway.bind : await prompter.select({
		message: "网关绑定",
		options: [
			{
				value: "loopback",
				label: "回环 (127.0.0.1)"
			},
			{
				value: "lan",
				label: "局域网 (0.0.0.0)"
			},
			{
				value: "tailnet",
				label: "Tailnet (Tailscale IP)"
			},
			{
				value: "auto",
				label: "自动 (回环 → 局域网)"
			},
			{
				value: "custom",
				label: "自定义 IP"
			}
		]
	});
	let customBindHost = quickstartGateway.customBindHost;
	if (bind === "custom") {
		if (flow !== "quickstart" || !customBindHost) {
			const input = await prompter.text({
				message: "自定义 IP 地址",
				placeholder: "192.168.1.100",
				initialValue: customBindHost ?? "",
				validate: validateIPv4AddressInput
			});
			customBindHost = typeof input === "string" ? input.trim() : void 0;
		}
	}
	let authMode = flow === "quickstart" ? quickstartGateway.authMode : await prompter.select({
		message: "网关认证",
		options: [{
			value: "token",
			label: "令牌",
			hint: "推荐默认 (本地 + 远程)"
		}, {
			value: "password",
			label: "密码"
		}],
		initialValue: "token"
	});
	const tailscaleMode = flow === "quickstart" ? quickstartGateway.tailscaleMode : await prompter.select({
		message: "Tailscale 暴露",
		options: [...TAILSCALE_EXPOSURE_OPTIONS]
	});
	if (tailscaleMode !== "off") {
		if (!await findTailscaleBinary()) await prompter.note(TAILSCALE_MISSING_BIN_NOTE_LINES.join("\n"), "Tailscale Warning");
	}
	let tailscaleResetOnExit = flow === "quickstart" ? quickstartGateway.tailscaleResetOnExit : false;
	if (tailscaleMode !== "off" && flow !== "quickstart") {
		await prompter.note(TAILSCALE_DOCS_LINES.join("\n"), "Tailscale");
		tailscaleResetOnExit = Boolean(await prompter.confirm({
			message: "退出时重置 Tailscale serve/funnel？",
			initialValue: false
		}));
	}
	if (tailscaleMode !== "off" && bind !== "loopback") {
		await prompter.note("Tailscale 需要 bind=loopback。正在调整为 loopback。", "Note");
		bind = "loopback";
		customBindHost = void 0;
	}
	if (tailscaleMode === "funnel" && authMode !== "password") {
		await prompter.note("Tailscale funnel 需要密码认证。", "Note");
		authMode = "password";
	}
	let gatewayToken;
	if (authMode === "token") if (flow === "quickstart") gatewayToken = quickstartGateway.token ?? randomToken();
	else gatewayToken = normalizeGatewayTokenInput(await prompter.text({
		message: "网关令牌 (留空生成)",
		placeholder: "多机或非回环访问需要",
		initialValue: quickstartGateway.token ?? ""
	})) || randomToken();
	if (authMode === "password") {
		const password = flow === "quickstart" && quickstartGateway.password ? quickstartGateway.password : await prompter.text({
			message: "网关密码",
			validate: validateGatewayPasswordInput
		});
		nextConfig = {
			...nextConfig,
			gateway: {
				...nextConfig.gateway,
				auth: {
					...nextConfig.gateway?.auth,
					mode: "password",
					password: String(password ?? "").trim()
				}
			}
		};
	} else if (authMode === "token") nextConfig = {
		...nextConfig,
		gateway: {
			...nextConfig.gateway,
			auth: {
				...nextConfig.gateway?.auth,
				mode: "token",
				token: gatewayToken
			}
		}
	};
	nextConfig = {
		...nextConfig,
		gateway: {
			...nextConfig.gateway,
			port,
			bind,
			...bind === "custom" && customBindHost ? { customBindHost } : {},
			tailscale: {
				...nextConfig.gateway?.tailscale,
				mode: tailscaleMode,
				resetOnExit: tailscaleResetOnExit
			}
		}
	};
	const controlUiEnabled = nextConfig.gateway?.controlUi?.enabled ?? true;
	const hasExplicitControlUiAllowedOrigins = (nextConfig.gateway?.controlUi?.allowedOrigins ?? []).some((origin) => origin.trim().length > 0) || nextConfig.gateway?.controlUi?.dangerouslyAllowHostHeaderOriginFallback === true;
	if (controlUiEnabled && bind !== "loopback" && !hasExplicitControlUiAllowedOrigins) nextConfig = {
		...nextConfig,
		gateway: {
			...nextConfig.gateway,
			controlUi: {
				...nextConfig.gateway?.controlUi,
				allowedOrigins: buildDefaultControlUiAllowedOrigins({
					port,
					bind,
					customBindHost
				})
			}
		}
	};
	if (!quickstartGateway.hasExisting && nextConfig.gateway?.nodes?.denyCommands === void 0 && nextConfig.gateway?.nodes?.allowCommands === void 0 && nextConfig.gateway?.nodes?.browser === void 0) nextConfig = {
		...nextConfig,
		gateway: {
			...nextConfig.gateway,
			nodes: {
				...nextConfig.gateway?.nodes,
				denyCommands: [...DEFAULT_DANGEROUS_NODE_DENY_COMMANDS]
			}
		}
	};
	return {
		nextConfig,
		settings: {
			port,
			bind,
			customBindHost: bind === "custom" ? customBindHost : void 0,
			authMode,
			gatewayToken,
			tailscaleMode,
			tailscaleResetOnExit
		}
	};
}

//#endregion
export { configureGatewayForOnboarding };