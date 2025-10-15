import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://safhat-backend.onrender.com/",
  timeout: 50000,
});
export const apiCall = async ({
  endpoint,
  method = "GET",
  data = null,
  contentType = "application/json",
  headers = {},
}) => {
  try {
    const config = {
      url: endpoint,
      method,
      headers: {
        "Content-Type": contentType,
        ...headers,
      },
    };

    if (data) {
      if (contentType === "application/json") {
        config.data = JSON.stringify(data);
      } else {
        config.data = data;
      }
    }

    const response = await apiClient(config);
    return {
      success: response.data?.statusFlag ?? false,
      code: response.data?.response_code ?? response.status,
      message: response.data?.message ?? "Unknown error",
      data: response.data?.data ?? {},
      errorDetails: response.data?.errorDetails ?? null,
    };
  } catch (error) {
    console.error("API error:", error);

    return {
      success: false,
      code: error.response?.status ?? 500,
      message:
        error.response?.data?.message || error.message || "Internal server error",
      data: error.response?.data?.data ?? {},
      errorDetails: error.response?.data?.errorDetails ?? null,
    };
  }
};
