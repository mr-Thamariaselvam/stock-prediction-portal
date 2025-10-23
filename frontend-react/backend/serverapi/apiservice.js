import axios from "axios";
import { Methods } from "./constans";
import { Logger, Global } from "../../src/utils";
import { getAccessToken } from "../authstate";

const VERSION = "api/v1";
const BASE_URL = "http://localhost:8000";

const apiInstance = axios.create({
  baseURL: BASE_URL,
});

async function getHeaders() {
  let token = null;
  try {
    token = await getAccessToken();
    Logger.log(token);
  } catch (error) {
    Logger.error(error);
  }

  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
    Accept: "*/*",
  };
}

const API_TIME_OUT = 60000;

/**
 * Main API Fetch function
 */
const fetchApi = (
  api,
  method,
  data = {},
  useVersion = true,
  responseType = null,
  giveResponse = false,
  options = {}
) => {
  const url = useVersion ? `/${VERSION}/${api}/` : `/${api}/`;

  return new Promise((resolve, reject) => {
    const apiServer = async () => {
      const headers = await getHeaders();
      const timeout = options?.timeout || API_TIME_OUT;

      const config = { headers, timeout };
      if (responseType) config.responseType = responseType;

      let apiFn;

      switch (method) {
        case Methods.GET:
          apiFn = apiInstance.get(url, config);
          break;
        case Methods.POST:
          apiFn = apiInstance.post(url, data, config);
          break;
        case Methods.PUT:
          apiFn = apiInstance.put(url, data, config);
          break;
        case Methods.PATCH:
          apiFn = apiInstance.patch(url, data, config);
          break;
        case Methods.DELETE:
          apiFn = apiInstance.delete(url, config);
          break;
        default:
          return reject("Invalid HTTP Method");
      }

      apiFn
        .then((response) => {
          Logger.log(`API Success: ${api}`);
          const passResponse =
            typeof Global.apiCallback === "function"
              ? Global.apiCallback(response, giveResponse)
              : true;

          if (passResponse) resolve(response?.data);
        })
        .catch(async (error) => {
          Logger.error(error);
          const passError =
            typeof Global.apiCallback === "function"
              ? await Global.apiCallback(error, giveResponse)
              : true;
          if (passError) reject(error?.response?.data);
        });
    };

    apiServer();
  });
};

/* ---------------------------
   Axios Interceptor Section
--------------------------- */
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired (401), try refresh once
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await axios.post(
          `${BASE_URL}/${VERSION}/token/refresh/`,
          { refresh: refreshToken }
        );

        const newAccessToken = refreshResponse?.data?.access;
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiInstance(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { fetchApi };
