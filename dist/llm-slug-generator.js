import { a as resolveAgentEffectiveModelPrimary, c as resolveDefaultAgentId, i as resolveAgentDir, s as resolveAgentWorkspaceDir } from "./agent-scope-CM2OUlf5.js";
import "./paths-MYHBPf85.js";
import { t as createSubsystemLogger } from "./subsystem-BXiyX1bx.js";
import "./workspace-B1b3C2jj.js";
import { Sn as DEFAULT_PROVIDER, l as parseModelRef, xn as DEFAULT_MODEL } from "./model-selection-Dof4G7X1.js";
import "./github-copilot-token-DyM1y5Pr.js";
import "./env-3aLfHpTH.js";
import "./boolean-Ce2-qkSB.js";
import "./dock-kBiZJ0I4.js";
import "./tokens-DyF4Dnn6.js";
import { t as runEmbeddedPiAgent } from "./pi-embedded-kMHz6NHk.js";
import "./plugins-DChIrvlX.js";
import "./accounts-DAIgQtGr.js";
import "./bindings-DemTfy98.js";
import "./send-BVyj6Lg6.js";
import "./send-DVXSJZh-.js";
import "./deliver-YAWj_vGR.js";
import "./diagnostic-BrRbyVl7.js";
import "./diagnostic-session-state-_tGY1a3B.js";
import "./accounts-B_TpBJTR.js";
import "./send-Bz8XOm5j.js";
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
import "./reply-prefix-DTklV--y.js";
import "./manager-D1ara_Cm.js";
import "./gemini-auth-CqMYbtcS.js";
import "./fetch-guard-BETv6ABt.js";
import "./query-expansion-63OTtf4o.js";
import "./retry-DKGfbHpA.js";
import "./target-errors-BEKREcvV.js";
import "./chunk-D_YMnoam.js";
import "./markdown-tables-jlxa5aed.js";
import "./local-roots-DJ8om57T.js";
import "./ir-HhY8ruYl.js";
import "./render-loap2gRq.js";
import "./commands-registry-Cw9-fCOD.js";
import "./skill-commands-V3aIDnaq.js";
import "./runner-CbKzdT2W.js";
import "./fetch-B1nZSYJF.js";
import "./channel-activity-C57Zidf6.js";
import "./tables-D-mK9tJP.js";
import "./send-heRS1UYy.js";
import "./outbound-attachment-BQF3EXm3.js";
import "./send-uIDNFSMC.js";
import "./resolve-route-CJIWhkFt.js";
import "./proxy-Bee2aKQk.js";
import "./replies-rk2IqNhX.js";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

//#region src/hooks/llm-slug-generator.ts
/**
* LLM-based slug generator for session memory filenames
*/
const log = createSubsystemLogger("llm-slug-generator");
/**
* Generate a short 1-2 word filename slug from session content using LLM
*/
async function generateSlugViaLLM(params) {
	let tempSessionFile = null;
	try {
		const agentId = resolveDefaultAgentId(params.cfg);
		const workspaceDir = resolveAgentWorkspaceDir(params.cfg, agentId);
		const agentDir = resolveAgentDir(params.cfg, agentId);
		const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "openclaw-slug-"));
		tempSessionFile = path.join(tempDir, "session.jsonl");
		const prompt = `Based on this conversation, generate a short 1-2 word filename slug (lowercase, hyphen-separated, no file extension).

Conversation summary:
${params.sessionContent.slice(0, 2e3)}

Reply with ONLY the slug, nothing else. Examples: "vendor-pitch", "api-design", "bug-fix"`;
		const modelRef = resolveAgentEffectiveModelPrimary(params.cfg, agentId);
		const parsed = modelRef ? parseModelRef(modelRef, DEFAULT_PROVIDER) : null;
		const provider = parsed?.provider ?? DEFAULT_PROVIDER;
		const model = parsed?.model ?? DEFAULT_MODEL;
		const result = await runEmbeddedPiAgent({
			sessionId: `slug-generator-${Date.now()}`,
			sessionKey: "temp:slug-generator",
			agentId,
			sessionFile: tempSessionFile,
			workspaceDir,
			agentDir,
			config: params.cfg,
			prompt,
			provider,
			model,
			timeoutMs: 15e3,
			runId: `slug-gen-${Date.now()}`
		});
		if (result.payloads && result.payloads.length > 0) {
			const text = result.payloads[0]?.text;
			if (text) return text.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 30) || null;
		}
		return null;
	} catch (err) {
		const message = err instanceof Error ? err.stack ?? err.message : String(err);
		log.error(`Failed to generate slug: ${message}`);
		return null;
	} finally {
		if (tempSessionFile) try {
			await fs.rm(path.dirname(tempSessionFile), {
				recursive: true,
				force: true
			});
		} catch {}
	}
}

//#endregion
export { generateSlugViaLLM };