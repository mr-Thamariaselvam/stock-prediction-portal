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
 * @param {*} api endpoint (string)
 * @param {*} method HTTP method (GET, POST, etc.)
 * @param {*} data request payload
 * @param {*} useVersion whether to prefix /api/v1
 * @param {*} responseType optional (blob, json, etc.)
 * @param {*} giveResponse pass raw response to callback
 * @param {*} options optional {timeout: number}
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

export { fetchApi };
