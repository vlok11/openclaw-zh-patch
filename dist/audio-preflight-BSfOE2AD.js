import "./agent-scope-BBysBmDl.js";
import "./paths-CH8dLxVx.js";
import { $ as shouldLogVerbose, X as logVerbose } from "./subsystem-64KmiDyq.js";
import "./model-selection-FcTfV2T3.js";
import "./github-copilot-token-2ggfYP8J.js";
import "./env-DVuU7NI1.js";
import "./dock-BLk2aXHi.js";
import "./plugins-CSjAMCiz.js";
import "./accounts-DrsRCOEC.js";
import "./bindings-kRkUdueu.js";
import "./accounts-CYWHfrD2.js";
import "./image-ops-M9aZ_SI7.js";
import "./pi-model-discovery-C1DAfPQr.js";
import "./message-channel-CNaCt7-6.js";
import "./pi-embedded-helpers-BFwJlimu.js";
import "./chrome-Ba7-h2nl.js";
import "./ssrf-tlVN4FBY.js";
import "./skills-D0vrmlN5.js";
import "./path-alias-guards-DvfFfkmi.js";
import "./redact-DwOdYA5i.js";
import "./errors-BLl0yZg4.js";
import "./fs-safe-DumMpyOV.js";
import "./store-Brx2QgYO.js";
import "./sessions-9vyjlAaH.js";
import "./accounts-CSwtm9rr.js";
import "./paths-BwXONNJC.js";
import "./tool-images-CYVq85sI.js";
import "./thinking-ZaPrKXBc.js";
import "./image-FXdZ5PNy.js";
import "./gemini-auth-DypzetR7.js";
import "./fetch-guard-CiaWrI0u.js";
import "./local-roots-CJwjvtQp.js";
import { a as resolveMediaAttachmentLocalRoots, n as createMediaAttachmentCache, o as runCapability, r as normalizeMediaAttachments, t as buildProviderRegistry, u as isAudioAttachment } from "./runner-11Rv3wOh.js";

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