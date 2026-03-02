import type { ModelDefinitionConfig } from "../config/types.js";
export declare const SHENGSUANYUN_BASE_URL = "https://router.shengsuanyun.com/api/v1";
export declare const SHENGSUANYUN_MODALITIES_BASE_URL = "https://router.shengsuanyun.com/api/v1/models/multimodal";
export declare const SHENGSUANYUN_DEFAULT_COST: {
    input: number;
    output: number;
    cacheRead: number;
    cacheWrite: number;
};
export declare const SHENGSUANYUN_LLM_FALLBACK_MODELS: ModelDefinitionConfig[];
export interface ShengSuanYunModel {
    id: string;
    company?: string;
    name?: string;
    api_name?: string;
    description?: string;
    max_tokens?: number;
    context_window?: number;
    support_apis?: string[];
    architecture?: {
        input?: string;
        output?: string;
        tokenizer?: string;
    };
}
export interface ShengSuanYunMultimodalModel {
    id: string;
    api_name?: string;
    company?: string;
    company_name?: string;
    name?: string;
    model_name?: string;
    description?: string;
    desc?: string;
    class_names?: string[];
    input_schema?: string;
    output_schema?: string;
    support_apis?: string[];
    sync?: boolean;
    async?: boolean;
    architecture?: {
        input?: string;
        output?: string;
        tokenizer?: string;
    };
}
export type MModel = ShengSuanYunMultimodalModel;
export interface TaskRes {
    code?: string;
    message?: string;
    error?: {
        message?: string;
        code?: string;
        type?: string;
    };
    data?: {
        request_id?: string;
        status?: string;
        fail_reason?: string;
        progress?: number | string;
        data?: {
            image_urls?: string[];
            video_urls?: string[];
            audio_urls?: string[];
            audio_url?: string;
            progress?: number | string;
            error?: string;
            [key: string]: unknown;
        };
        [key: string]: unknown;
    };
    [key: string]: unknown;
}
export declare function getShengSuanYunModels(): Promise<ModelDefinitionConfig[]>;
export declare function getShengSuanYunModalityModels(): Promise<MModel[]>;
