export interface ApiSuccessResponse {
  success: true;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: unknown;
}

export interface RootResponse extends ApiSuccessResponse {
  message: string;
}

export interface HealthResponse extends ApiSuccessResponse {
  status: "healthy";
  timestamp: string;
}

export interface DbTestResponse extends ApiSuccessResponse {
  database: "connected";
}
