import type { OpenClawConfig } from "../../../config/config.ts";
import type { AnyAgentTool } from "../common.ts";
export declare const APP_HEADERS: Record<string, string>;
export interface TaskResponse {
    code?: string;
    message?: string;
    data?: {
        progress?: string;
        request_id?: string;
        status?: string;
        fail_reason?: string;
        data?: {
            image_urls?: string[];
            progress?: number;
            error?: string;
        };
    };
}
export declare function createZImageTurboTool(opts?: {
    config?: OpenClawConfig;
}): AnyAgentTool;
