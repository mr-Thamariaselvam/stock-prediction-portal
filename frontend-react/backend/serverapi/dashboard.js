import { fetchApi } from "./apiservice";
import { Methods } from "./constans";

class DashboardApi {
  static getProductedView() {
    return new Promise((resolve, reject) => {
      fetchApi("producted-view", Methods.GET)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  static getPredictedStock(data) {
    return new Promise((resolve, reject) => {
      fetchApi("predict", Methods.POST, data)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default DashboardApi;
