import "./agent-scope-CM2OUlf5.js";
import "./paths-MYHBPf85.js";
import { $ as shouldLogVerbose, X as logVerbose } from "./subsystem-BXiyX1bx.js";
import "./workspace-B1b3C2jj.js";
import "./model-selection-Dof4G7X1.js";
import "./github-copilot-token-DyM1y5Pr.js";
import "./env-3aLfHpTH.js";
import "./boolean-Ce2-qkSB.js";
import "./dock-kBiZJ0I4.js";
import "./plugins-DChIrvlX.js";
import "./accounts-DAIgQtGr.js";
import "./bindings-DemTfy98.js";
import "./accounts-B_TpBJTR.js";
import "./image-ops-KkdeHdZ7.js";
import "./pi-model-discovery-ClDwIVNf.js";
import "./message-channel-BWtwhs1r.js";
import "./pi-embedded-helpers-BI_22zN3.js";
import "./chrome-DC2RZ3F9.js";
import "./ssrf-GR1wTjsC.js";
import "./frontmatter-CthhXKqf.js";
import "./skills-D_nDQbUi.js";
import "./path-alias-guards-D4sJ11nK.js";
import "./redact-wETe5qIl.js";
import "./errors-ep9Fblgx.js";
import "./fs-safe-C36g4aAm.js";
import "./store-Bnkr4Cwf.js";
import "./sessions-hAnUDEm_.js";
import "./accounts-DldIIlOx.js";
import "./paths-3dNNuaa_.js";
import "./tool-images-BaARBwfI.js";
import "./thinking-CJoHneR6.js";
import "./image-BFGfQfoM.js";
import "./gemini-auth-CqMYbtcS.js";
import "./fetch-guard-BETv6ABt.js";
import "./local-roots-DJ8om57T.js";
import { a as resolveMediaAttachmentLocalRoots, n as createMediaAttachmentCache, o as runCapability, r as normalizeMediaAttachments, t as buildProviderRegistry, u as isAudioAttachment } from "./runner-CbKzdT2W.js";

//#region src/media-understanding/audio-preflight.ts
/**
* Transcribes the first audio attachment BEFORE mention checking.
* This allows voice notes to be processed in group chats with requireMention: true.
* Returns the transcript or undefined if transcription fails or no audio is found.
*/
async function transcribeFirstAudio(params) {
	const { ctx, cfg } = params;
	const audioConfig = cfg.tools?.media?.audio;
	if (!audioConfig || audioConfig.enabled === false) return;
	const attachments = normalizeMediaAttachments(ctx);
	if (!attachments || attachments.length === 0) return;
	const firstAudio = attachments.find((att) => att && isAudioAttachment(att) && !att.alreadyTranscribed);
	if (!firstAudio) return;
	if (shouldLogVerbose()) logVerbose(`audio-preflight: transcribing attachment ${firstAudio.index} for mention check`);
	const providerRegistry = buildProviderRegistry(params.providers);
	const cache = createMediaAttachmentCache(attachments, { localPathRoots: resolveMediaAttachmentLocalRoots({
		cfg,
		ctx
	}) });
	try {
		const result = await runCapability({
			capability: "audio",
			cfg,
			ctx,
			attachments: cache,
			media: attachments,
			agentDir: params.agentDir,
			providerRegistry,
			config: audioConfig,
			activeModel: params.activeModel
		});
		if (!result || result.outputs.length === 0) return;
		const audioOutput = result.outputs.find((output) => output.kind === "audio.transcription");
		if (!audioOutput || !audioOutput.text) return;
		firstAudio.alreadyTranscribed = true;
		if (shouldLogVerbose()) logVerbose(`audio-preflight: transcribed ${audioOutput.text.length} chars from attachment ${firstAudio.index}`);
		return audioOutput.text;
	} catch (err) {
		if (shouldLogVerbose()) logVerbose(`audio-preflight: transcription failed: ${String(err)}`);
		return;
	} finally {
		await cache.cleanup();
	}
}

//#endregion
export { transcribeFirstAudio };