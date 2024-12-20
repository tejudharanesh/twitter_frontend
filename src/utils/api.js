const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

/**
 * Wrapper for API calls with fetch.
 * @param {string} path - The API endpoint path (relative to API base URL).
 * @param {string} method - The HTTP method (e.g., GET, POST, etc.).
 * @param {Object} body - The request payload (optional).
 * @param {Object} headers - Additional request headers (optional).
 * @returns {Promise<Object>} - Resolves with JSON response or rejects with error.
 */
export const apiRequest = async (
  path,
  method = "GET",
  body = null,
  headers = {}
) => {
  try {
    const response = await fetch(`${API_ENDPOINT}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
