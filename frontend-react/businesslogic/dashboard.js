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

  static getPredictedStock(ticker) {
    return new Promise((resolve, reject) => {
      BackendApi.ServerApi.DashboardApi.getPredictedStock(ticker)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default Dashboard;
