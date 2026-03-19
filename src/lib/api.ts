import { createClient } from "@/lib/supabase/client";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

async function getAuthHeaders(
  supabase: ReturnType<typeof createClient>
): Promise<Record<string, string>> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (session?.access_token) {
    headers["Authorization"] = `Bearer ${session.access_token}`;
  }

  return headers;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const supabase = createClient();
  const authHeaders = await getAuthHeaders(supabase);
  const { headers: customHeaders, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      ...authHeaders,
      ...customHeaders,
    },
    ...rest,
  });

  if (!response.ok) {
    if (response.status === 401) {
      const { data } = await supabase.auth.refreshSession();
      if (data.session) {
        // Retry the request once with the refreshed token
        const retryHeaders: Record<string, string> = {
          ...authHeaders,
          ...customHeaders,
          Authorization: `Bearer ${data.session.access_token}`,
        };
        const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
          headers: retryHeaders,
          ...rest,
        });
        if (retryResponse.ok) {
          if (retryResponse.status === 204) {
            return undefined as T;
          }
          return retryResponse.json();
        }
      }
      // Refresh failed or retry failed — clear session and redirect to login
      await supabase.auth.signOut();
      if (typeof window !== "undefined") {
        window.location.href = "/login?error=session_expired";
      }
      throw new ApiError(401, "Session expired");
    }

    const error = await response.json().catch(() => ({
      detail: response.statusText,
    }));
    throw new ApiError(response.status, error.detail || "Request failed");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const api = {
  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, { ...options, method: "GET" });
  },

  post<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  put<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  patch<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, { ...options, method: "DELETE" });
  },
};
