import { CreateResponseParams, CreateResponse } from "../types/responseTypes";

export const createResponse = <T>({
  success = false,
  status = 500,
  message = "An error occurred.",
  data = null,
  errors = null,
  pagination = null,
  meta = null,
  headers = {},
}: CreateResponseParams<T> = {}): CreateResponse<T> => {
  const response = {
    success,
    status,
    message,
    response: data,
  } as CreateResponse<T>["response"];

  if (errors) {
    response.errors = errors;
  }

  if (pagination) {
    response.pagination = pagination;
  }

  if (meta) {
    response.meta = meta;
  }

  return { response, headers };
};
