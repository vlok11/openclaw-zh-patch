import { type TSchema } from "@sinclair/typebox";
import type { OpenClawConfig } from "../../../config/config.ts";
import type { AnyAgentTool } from "../common.ts";
export declare const APP_HEADERS: Record<string, string>;
interface JsonSchema {
    $schema?: string;
    type?: string;
    title?: string;
    description?: string;
    default?: unknown;
    properties?: Record<string, JsonSchema>;
    required?: string[];
    items?: JsonSchema;
    anyOf?: JsonSchema[];
    enum?: Array<string | number>;
    format?: string;
    ssy?: string;
    [key: string]: unknown;
}
export declare function generateTypebox(schema: JsonSchema): TSchema;
export declare function preloadShengSuanYunTools(opts?: {
    config?: OpenClawConfig;
}): Promise<void>;
export declare function createGenerateTools(opts?: {
    config?: OpenClawConfig;
}): AnyAgentTool[];
export {};
