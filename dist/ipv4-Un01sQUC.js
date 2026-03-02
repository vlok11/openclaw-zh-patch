import { i as isCanonicalDottedDecimalIPv4 } from "./ip-DK-vcRii.js";

//#region src/gateway/gateway-config-prompts.shared.ts
const TAILSCALE_EXPOSURE_OPTIONS = [
	{
		value: "off",
		label: "Off",
		hint: "无 Tailscale 暴露"
	},
	{
		value: "serve",
		label: "Serve",
		hint: "Tailnet 私有 HTTPS (Tailscale 设备)"
	},
	{
		value: "funnel",
		label: "Funnel",
		hint: "通过 Tailscale Funnel 的公共 HTTPS (互联网)"
	}
];
const TAILSCALE_MISSING_BIN_NOTE_LINES = [
	"在 PATH 或 /Applications 中未找到 Tailscale 二进制文件。",
	"请确保已安装 Tailscale：",
	"  https://tailscale.com/download/mac",
	"",
	"您可以继续设置，但 serve/funnel 将在运行时失败。"
];
const TAILSCALE_DOCS_LINES = [
	"Docs:",
	"https://docs.openclaw.ai/gateway/tailscale",
	"https://docs.openclaw.ai/web"
];

//#endregion
//#region src/shared/net/ipv4.ts
function validateDottedDecimalIPv4Input(value) {
	if (!value) return "自定义绑定模式需要 IP 地址";
	if (isCanonicalDottedDecimalIPv4(value)) return;
	return "无效的 IPv4 地址 (例如 192.168.1.100)";
}
function validateIPv4AddressInput(value) {
	return validateDottedDecimalIPv4Input(value);
}

//#endregion
export { TAILSCALE_MISSING_BIN_NOTE_LINES as i, TAILSCALE_DOCS_LINES as n, TAILSCALE_EXPOSURE_OPTIONS as r, validateIPv4AddressInput as t };