import { Ct as shouldLogVerbose, bt as logVerbose } from "./entry.js";
import "./auth-profiles-CCroWIjr.js";
import "./agent-scope-Cqn0zzij.js";
import "./openclaw-root-DlBiBbD9.js";
import "./exec-BhaMholX.js";
import "./github-copilot-token-DKRiM6oj.js";
import "./host-env-security-BM8ktVlo.js";
import "./env-vars-DPtuUD7z.js";
import "./manifest-registry-DUdP0W0f.js";
import "./dock-DoNeMopA.js";
import "./pi-model-discovery-D9FivFR5.js";
import "./frontmatter-DzgKaILZ.js";
import "./skills-XqIco29P.js";
import "./path-alias-guards-B-0eXtZD.js";
import "./message-channel-CJUwnCYd.js";
import "./sessions-BI3YGZp9.js";
import "./plugins-L6ij92Mg.js";
import "./accounts-jTTYYc3C.js";
import "./accounts-CnxuiQaw.js";
import "./accounts-DKgW2m_s.js";
import "./bindings-DRmXdWuq.js";
import "./logging-Cr3Gsq0-.js";
import "./paths-ANQqR741.js";
import "./chat-envelope-CrHAOMhr.js";
import "./net-DBrsyv8q.js";
import "./ip-BDxIP8rd.js";
import "./tailnet-Ca1WnFBq.js";
import "./image-ops-WZr1HLCX.js";
import "./pi-embedded-helpers-BGh5Y51s.js";
import "./sandbox-DkcIu9cl.js";
import "./tool-catalog-DABanDxl.js";
import "./chrome-C8Ffx63P.js";
import "./tailscale-Cz0j5H8x.js";
import "./auth-ML-4Xoce.js";
import "./server-context-DYjG-swq.js";
import "./paths-0_BeWGuF.js";
import "./redact-Dcypez3H.js";
import "./errors-Cu3BYw29.js";
import "./fs-safe-aP-y5ePv.js";
import "./ssrf-Bte-xH9B.js";
import "./store-BXu3Rh07.js";
import "./ports-B9YOEPbT.js";
import "./trash-C8oZT55U.js";
import "./server-middleware-CksvUSHW.js";
import "./tool-images-DRFHeGdm.js";
import "./thinking-DW6CKWyf.js";
import "./models-config-BzCJ51uy.js";
import "./gemini-auth-BuhzVOat.js";
import "./fetch-guard-DVFm6--m.js";
import "./local-roots-CLyxXgFw.js";
import "./image-Jtyrj0lr.js";
import "./tool-display-FacPPVzc.js";
import { a as resolveMediaAttachmentLocalRoots, n as createMediaAttachmentCache, o as runCapability, r as normalizeMediaAttachments, s as isAudioAttachment, t as buildProviderRegistry } from "./runner-jh93Z0iJ.js";
import "./model-catalog-CNqouy97.js";

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