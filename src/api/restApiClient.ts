// apiClient.ts

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

export interface RequestOptions extends RequestInit {}

const handleResponse = async (response: Response) => {
  if (response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return;
    }
  } else {
    const errorResponse = await response.json();
    throw new Error(
      errorResponse.message || `Request failed with status ${response.status}`
    );
  }
};

const getUrl = (endpoint: string): string => {
  return `${BASE_URL}${endpoint}`;
};

export const get = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const url = getUrl(endpoint);
  const response = await fetch(url, options);
  return handleResponse(response);
};

export const post = async <T>(
  endpoint: string,
  data: any,
  options: RequestOptions = {}
): Promise<T> => {
  const url = getUrl(endpoint);
  const response = await fetch(url, {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const del = async (
  endpoint: string,
  options: RequestOptions = {}
): Promise<void> => {
  const url = getUrl(endpoint);
  const response = await fetch(url, {
    ...options,
    method: "DELETE",
  });
  console.log({ response });
  return handleResponse(response);
};
