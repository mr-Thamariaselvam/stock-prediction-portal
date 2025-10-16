import { Global } from "../../../utils";

class Auth {
  static onAuthChange(callback) {
    Global.onAuthChange = callback;
  }
}

export default Auth;
