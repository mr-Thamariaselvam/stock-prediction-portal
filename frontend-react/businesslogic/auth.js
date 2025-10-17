import BackendApi from "../backend";

function getUseAuth() {
  return BackendApi.AuthState.useAuth();
}

export { getUseAuth };
