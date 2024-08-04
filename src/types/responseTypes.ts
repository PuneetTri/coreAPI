// src/types/responseTypes.ts

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

export interface ResponseMeta {
  [key: string]: any; // Use a more specific type if needed
}

export interface ResponseHeaders {
  [key: string]: string;
}

export interface CreateResponseParams<T = any> {
  success?: boolean;
  status?: number;
  message?: string;
  data?: T | null;
  errors?: Record<string, any> | null;
  pagination?: Pagination | null;
  meta?: ResponseMeta | null;
  headers?: ResponseHeaders;
}

export interface CreateResponse<T = any> {
  response: {
    success: boolean;
    status: number;
    message: string;
    response: T | null;
    errors?: Record<string, any> | null;
    pagination?: Pagination | null;
    meta?: ResponseMeta | null;
  };
  headers: ResponseHeaders;
}
