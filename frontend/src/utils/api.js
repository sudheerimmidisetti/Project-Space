const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

const getResponseMessage = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const data = await response.json();
    return {
      data,
      message: data?.message || `Request failed with status ${response.status}`,
    };
  }

  const text = await response.text();

  if (
    text.trim().toLowerCase().startsWith("<!doctype") ||
    text.trim().toLowerCase().startsWith("<html")
  ) {
    return {
      data: null,
      message: `Backend returned HTML instead of JSON. Verify VITE_API_URL (${API_BASE_URL}) and ensure backend is running.`,
    };
  }

  return {
    data: null,
    message: text || `Request failed with status ${response.status}`,
  };
};

export const apiFetch = async (path, options = {}) => {
  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  let response;

  try {
    response = await fetch(buildApiUrl(path), {
      ...options,
      headers,
    });
  } catch (error) {
    throw new Error(
      `Unable to reach backend at ${API_BASE_URL}. Start backend server and verify frontend .env`,
    );
  }

  const { data, message } = await getResponseMessage(response);

  if (!response.ok) {
    throw new Error(message);
  }

  return data;
};
