import type { ApiSuccessResponse } from "./api.types.js";

export interface GenerateInput {
  genre: string;
  environment: string;
  style: string;
  prompt: string;
}

export interface GenerateResponse extends ApiSuccessResponse {
  prompt: string;
  imageUrl: string;
}
