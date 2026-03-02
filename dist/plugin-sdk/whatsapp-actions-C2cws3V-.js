import { i as resolveWhatsAppAccount } from "./accounts-t6O8wALr.js";
import "./paths-DVWx7USN.js";
import "./github-copilot-token-Cg0YPPSu.js";
import "./config-DEBzYP6T.js";
import "./subsystem-Dov-90yx.js";
import "./command-format-BKON8t_-.js";
import "./agent-scope-oM36S-fD.js";
import "./message-channel-AE5edk7h.js";
import "./plugins-DnL30_3C.js";
import "./bindings-BoOdcajm.js";
import "./path-alias-guards-BLG3yzdE.js";
import "./fs-safe-BPF7NhFH.js";
import "./image-ops-Dp_09v1i.js";
import "./ssrf-D07_rJxG.js";
import "./fetch-guard-DSWw6-wZ.js";
import "./local-roots-AQdiw5Tm.js";
import "./ir-Cx7jnOzn.js";
import "./chunk-CMG4jo-_.js";
import "./markdown-tables-DM2lARsF.js";
import "./render-Dk3zVolZ.js";
import "./tables-BOjU2cH4.js";
import "./tool-images-9ZTqPkI_.js";
import { a as createActionGate, c as jsonResult, d as readReactionParams, i as ToolAuthorizationError, m as readStringParam } from "./target-errors-BcHx5Wtg.js";
import { t as resolveWhatsAppOutboundTarget } from "./resolve-outbound-target-vM7rcShU.js";
import { r as sendReactionWhatsApp } from "./outbound-Dz2Ev9Tn.js";

//#region src/agents/tools/whatsapp-target-auth.ts
function resolveAuthorizedWhatsAppOutboundTarget(params) {
	const account = resolveWhatsAppAccount({
		cfg: params.cfg,
		accountId: params.accountId
	});
	const resolution = resolveWhatsAppOutboundTarget({
		to: params.chatJid,
		allowFrom: account.allowFrom ?? [],
		mode: "implicit"
	});
	if (!resolution.ok) throw new ToolAuthorizationError(`WhatsApp ${params.actionLabel} blocked: chatJid "${params.chatJid}" is not in the configured allowFrom list for account "${account.accountId}".`);
	return {
		to: resolution.to,
		accountId: account.accountId
	};
}

//#endregion
//#region src/agents/tools/whatsapp-actions.ts
async function handleWhatsAppAction(params, cfg) {
	const action = readStringParam(params, "action", { required: true });
	const isActionEnabled = createActionGate(cfg.channels?.whatsapp?.actions);
	if (action === "react") {
		if (!isActionEnabled("reactions")) throw new Error("WhatsApp reactions are disabled.");
		const chatJid = readStringParam(params, "chatJid", { required: true });
		const messageId = readStringParam(params, "messageId", { required: true });
		const { emoji, remove, isEmpty } = readReactionParams(params, { removeErrorMessage: "Emoji is required to remove a WhatsApp reaction." });
		const participant = readStringParam(params, "participant");
		const accountId = readStringParam(params, "accountId");
		const fromMeRaw = params.fromMe;
		const fromMe = typeof fromMeRaw === "boolean" ? fromMeRaw : void 0;
		const resolved = resolveAuthorizedWhatsAppOutboundTarget({
			cfg,
			chatJid,
			accountId,
			actionLabel: "reaction"
		});
		const resolvedEmoji = remove ? "" : emoji;
		await sendReactionWhatsApp(resolved.to, messageId, resolvedEmoji, {
			verbose: false,
			fromMe,
			participant: participant ?? void 0,
			accountId: resolved.accountId
		});
		if (!remove && !isEmpty) return jsonResult({
			ok: true,
			added: emoji
		});
		return jsonResult({
			ok: true,
			removed: true
		});
	}
	throw new Error(`Unsupported WhatsApp action: ${action}`);
}

//#endregion
export { handleWhatsAppAction };