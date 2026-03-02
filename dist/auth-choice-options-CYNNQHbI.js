import { n as AUTH_CHOICE_LEGACY_ALIASES_FOR_CLI, t as ONBOARD_PROVIDER_AUTH_FLAGS } from "./onboard-provider-auth-flags-DTlGlRFv.js";

//#region src/commands/auth-choice-options.ts
const AUTH_CHOICE_GROUP_DEFS = [
	{
		value: "openai",
		label: "OpenAI",
		hint: "Codex OAuth + API 密钥",
		choices: ["openai-codex", "openai-api-key"]
	},
	{
		value: "anthropic",
		label: "Anthropic",
		hint: "setup-token + API 密钥",
		choices: ["token", "apiKey"]
	},
	{
		value: "chutes",
		label: "Chutes",
		hint: "OAuth",
		choices: ["chutes"]
	},
	{
		value: "vllm",
		label: "vLLM",
		hint: "本地/自托管 OpenAI 兼容",
		choices: ["vllm"]
	},
	{
		value: "minimax",
		label: "MiniMax",
		hint: "M2.5（推荐）",
		choices: [
			"minimax-portal",
			"minimax-api",
			"minimax-api-key-cn",
			"minimax-api-lightning"
		]
	},
	{
		value: "moonshot",
		label: "Moonshot AI (Kimi K2.5)",
		hint: "Kimi K2.5 + Kimi Coding",
		choices: [
			"moonshot-api-key",
			"moonshot-api-key-cn",
			"kimi-code-api-key"
		]
	},
	{
		value: "google",
		label: "Google",
		hint: "Gemini API 密钥 + OAuth",
		choices: ["gemini-api-key", "google-gemini-cli"]
	},
	{
		value: "xai",
		label: "xAI (Grok)",
		hint: "API 密钥",
		choices: ["xai-api-key"]
	},
	{
		value: "mistral",
		label: "Mistral AI",
		hint: "API 密钥",
		choices: ["mistral-api-key"]
	},
	{
		value: "volcengine",
		label: "Volcano Engine",
		hint: "API 密钥",
		choices: ["volcengine-api-key"]
	},
	{
		value: "byteplus",
		label: "BytePlus",
		hint: "API 密钥",
		choices: ["byteplus-api-key"]
	},
	{
		value: "openrouter",
		label: "OpenRouter",
		hint: "API 密钥",
		choices: ["openrouter-api-key"]
	},
	{
		value: "kilocode",
		label: "Kilo Gateway",
		hint: "API 密钥（OpenRouter 兼容）",
		choices: ["kilocode-api-key"]
	},
	{
		value: "qwen",
		label: "Qwen",
		hint: "OAuth",
		choices: ["qwen-portal"]
	},
	{
		value: "zai",
		label: "Z.AI",
		hint: "GLM 编程计划 / 国际版 / 国内版",
		choices: [
			"zai-coding-global",
			"zai-coding-cn",
			"zai-global",
			"zai-cn"
		]
	},
	{
		value: "qianfan",
		label: "Qianfan",
		hint: "API 密钥",
		choices: ["qianfan-api-key"]
	},
	{
		value: "copilot",
		label: "Copilot",
		hint: "GitHub + 本地代理",
		choices: ["github-copilot", "copilot-proxy"]
	},
	{
		value: "ai-gateway",
		label: "Vercel AI Gateway",
		hint: "API 密钥",
		choices: ["ai-gateway-api-key"]
	},
	{
		value: "opencode-zen",
		label: "OpenCode Zen",
		hint: "API 密钥",
		choices: ["opencode-zen"]
	},
	{
		value: "xiaomi",
		label: "Xiaomi",
		hint: "API 密钥",
		choices: ["xiaomi-api-key"]
	},
	{
		value: "synthetic",
		label: "Synthetic",
		hint: "Anthropic 兼容（多模型）",
		choices: ["synthetic-api-key"]
	},
	{
		value: "together",
		label: "Together AI",
		hint: "API 密钥",
		choices: ["together-api-key"]
	},
	{
		value: "shengsuanyun",
		label: "胜算云 (国产模型)",
		hint: "国内 API 聚合平台",
		choices: ["shengsuanyun-api-key"]
	},
	{
		value: "huggingface",
		label: "Hugging Face",
		hint: "推理 API（HF 令牌）",
		choices: ["huggingface-api-key"]
	},
	{
		value: "venice",
		label: "Venice AI",
		hint: "隐私优先（无审查模型）",
		choices: ["venice-api-key"]
	},
	{
		value: "litellm",
		label: "LiteLLM",
		hint: "统一 LLM 网关（100+ 提供商）",
		choices: ["litellm-api-key"]
	},
	{
		value: "cloudflare-ai-gateway",
		label: "Cloudflare AI Gateway",
		hint: "账户 ID + 网关 ID + API 密钥",
		choices: ["cloudflare-ai-gateway-api-key"]
	},
	{
		value: "custom",
		label: "自定义服务商",
		hint: "任意 OpenAI 或 Anthropic 兼容端点",
		choices: ["custom-api-key"]
	}
];
const PROVIDER_AUTH_CHOICE_OPTION_HINTS = {
	"litellm-api-key": "统一网关（100+ LLM 提供商）",
	"cloudflare-ai-gateway-api-key": "Account ID + Gateway ID + API key",
	"venice-api-key": "隐私优先推理（无审查模型）",
	"together-api-key": "访问 Llama、DeepSeek、Qwen 等开源模型",
	"huggingface-api-key": "推理提供商 — OpenAI 兼容聊天"
};
const PROVIDER_AUTH_CHOICE_OPTION_LABELS = {
	"moonshot-api-key": "Kimi API 密钥（.ai）",
	"moonshot-api-key-cn": "Kimi API key (.cn)",
	"kimi-code-api-key": "Kimi Code API 密钥（订阅版）",
	"cloudflare-ai-gateway-api-key": "Cloudflare AI Gateway"
};
function buildProviderAuthChoiceOptions() {
	const choices = ONBOARD_PROVIDER_AUTH_FLAGS.map((flag) => ({
		value: flag.authChoice,
		label: PROVIDER_AUTH_CHOICE_OPTION_LABELS[flag.authChoice] ?? flag.description,
		...PROVIDER_AUTH_CHOICE_OPTION_HINTS[flag.authChoice] ? { hint: PROVIDER_AUTH_CHOICE_OPTION_HINTS[flag.authChoice] } : {}
	}));
	choices.push({
		value: "shengsuanyun-api-key",
		label: "胜算云 API 密钥",
		hint: "国内 API 聚合平台 - shengsuanyun.com"
	});
	return choices;
}
const BASE_AUTH_CHOICE_OPTIONS = [
	{
		value: "token",
		label: "Anthropic 令牌（粘贴 setup-token）",
		hint: "在其他地方运行 `claude setup-token`，然后在此粘贴令牌"
	},
	{
		value: "openai-codex",
		label: "OpenAI Codex（ChatGPT OAuth）"
	},
	{
		value: "chutes",
		label: "Chutes（OAuth）"
	},
	{
		value: "vllm",
		label: "vLLM（自定义 URL + 模型）",
		hint: "本地/自托管 OpenAI 兼容服务器"
	},
	...buildProviderAuthChoiceOptions(),
	{
		value: "moonshot-api-key-cn",
		label: "Kimi API 密钥（.cn）"
	},
	{
		value: "github-copilot",
		label: "GitHub Copilot（GitHub 设备登录）",
		hint: "使用 GitHub 设备流程"
	},
	{
		value: "gemini-api-key",
		label: "Google Gemini API 密钥"
	},
	{
		value: "google-gemini-cli",
		label: "Google Gemini CLI OAuth",
		hint: "非官方流程；使用前请查看账户风险警告"
	},
	{
		value: "zai-api-key",
		label: "Z.AI API 密钥"
	},
	{
		value: "zai-coding-global",
		label: "编程计划-国际版",
		hint: "GLM 编程计划国际版 (api.z.ai)"
	},
	{
		value: "zai-coding-cn",
		label: "编程计划-国内版",
		hint: "GLM 编程计划国内版 (open.bigmodel.cn)"
	},
	{
		value: "zai-global",
		label: "国际版",
		hint: "Z.AI 国际版 (api.z.ai)"
	},
	{
		value: "zai-cn",
		label: "国内版",
		hint: "Z.AI 国内版 (open.bigmodel.cn)"
	},
	{
		value: "xiaomi-api-key",
		label: "小米 API 密钥"
	},
	{
		value: "minimax-portal",
		label: "MiniMax OAuth",
		hint: "MiniMax 的 OAuth 插件"
	},
	{
		value: "qwen-portal",
		label: "通义千问 OAuth"
	},
	{
		value: "copilot-proxy",
		label: "Copilot 代理（本地）",
		hint: "VS Code Copilot 模型的本地代理"
	},
	{
		value: "apiKey",
		label: "Anthropic API 密钥"
	},
	{
		value: "opencode-zen",
		label: "OpenCode Zen（多模型代理）",
		hint: "通过 opencode.ai/zen 使用 Claude、GPT、Gemini"
	},
	{
		value: "minimax-api",
		label: "MiniMax M2.5"
	},
	{
		value: "minimax-api-key-cn",
		label: "MiniMax M2.5（国内版）",
		hint: "国内端点 (api.minimaxi.com)"
	},
	{
		value: "minimax-api-lightning",
		label: "MiniMax M2.5 Lightning",
		hint: "更快，输出成本更高"
	},
	{
		value: "custom-api-key",
		label: "自定义服务商"
	}
];
function formatAuthChoiceChoicesForCli(params) {
	const includeSkip = params?.includeSkip ?? true;
	const includeLegacyAliases = params?.includeLegacyAliases ?? false;
	const values = BASE_AUTH_CHOICE_OPTIONS.map((opt) => opt.value);
	if (includeSkip) values.push("skip");
	if (includeLegacyAliases) values.push(...AUTH_CHOICE_LEGACY_ALIASES_FOR_CLI);
	return values.join("|");
}
function buildAuthChoiceOptions(params) {
	params.store;
	const options = [...BASE_AUTH_CHOICE_OPTIONS];
	if (params.includeSkip) options.push({
		value: "skip",
		label: "暂时跳过"
	});
	return options;
}
function buildAuthChoiceGroups(params) {
	const options = buildAuthChoiceOptions({
		...params,
		includeSkip: false
	});
	const optionByValue = new Map(options.map((opt) => [opt.value, opt]));
	return {
		groups: AUTH_CHOICE_GROUP_DEFS.map((group) => ({
			...group,
			options: group.choices.map((choice) => optionByValue.get(choice)).filter((opt) => Boolean(opt))
		})),
		skipOption: params.includeSkip ? {
			value: "skip",
			label: "暂时跳过"
		} : void 0
	};
}

//#endregion
export { formatAuthChoiceChoicesForCli as n, buildAuthChoiceGroups as t };