import { Methods } from "./constans";
import { fetchApi } from "./apiservice";

class UserApi {
  static createUser(data) {
    return new Promise((resolve, reject) => {
      fetchApi("register", Methods.POST, data)
        .then((user) => {
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default UserApi;
