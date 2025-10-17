import { Global } from "../../src/utils";

class Auth {
  static onAuthChange(callback) {
    Global.onAuthChange = callback;
  }
}

export default Auth;
