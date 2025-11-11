import BackendApi from "../backend";

function getUseAuth() {
  return BackendApi.AuthState.useAuth();
}

function getBaseURL() {
  return BackendApi.AuthState.getBaseURL();
}

export { getUseAuth,getBaseURL };
