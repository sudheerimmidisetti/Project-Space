const isBrowser = typeof window !== "undefined";
const isLocalFrontend =
  isBrowser && ["localhost", "127.0.0.1"].includes(window.location.hostname);

const configuredApiUrl = (import.meta.env.VITE_API_URL || "").trim();

const API_BASE_URL = (
  configuredApiUrl || (isLocalFrontend ? "http://localhost:5000" : "")
).replace(/\/$/, "");

const getConfigError = () => {
  if (!API_BASE_URL) {
    return "API base URL is not configured. Set VITE_API_URL in frontend .env (local) or .env.production (deployed).";
  }

  const pointsToLocalhost = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(
    API_BASE_URL,
  );

  if (!isLocalFrontend && pointsToLocalhost) {
    return `Invalid API URL for deployed frontend: ${API_BASE_URL}. Localhost only works on local dev. Set VITE_API_URL to a public HTTPS backend URL and redeploy.`;
  }

  return "";
};

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
  const configError = getConfigError();
  if (configError) {
    throw new Error(configError);
  }

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
      `Unable to reach backend at ${API_BASE_URL}. ${error?.message || "Check that backend is running and URL is correct."}`,
    );
  }

  const { data, message } = await getResponseMessage(response);

  if (!response.ok) {
    throw new Error(message);
  }

  return data;
};
