import BackendApi from "../backend";

class Dashboard {
  static getDashboardData() {
    return new Promise((reslove, reject) => {
      BackendApi.ServerApi.DashboardApi.getProductedView()
        .then((data) => {
          reslove(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default Dashboard;
