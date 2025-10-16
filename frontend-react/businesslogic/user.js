import BackendApi from "../backend";

class User {
  constructor({ username, email, password }) {
    this.setData({ username, email, password });
  }

  setData(props) {
    this.username = props?.username ?? "";
    this.email = props?.email ?? "";
    this.password = props?.password ?? "";
  }

  static getEmptyData = () => {
    const user = new User({
      username: "",
      email: "",
      password: "",
    });
    return user;
  };

  createUser() {
    return new Promise((reslove, reject) => {
      BackendApi.ServerApi.UserApi.createUser(this)
        .then((user) => {
          const userObj = new User(user);
          reslove(userObj);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default User;
