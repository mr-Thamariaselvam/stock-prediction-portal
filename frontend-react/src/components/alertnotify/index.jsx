import { toast, ToastContainer } from "react-toastify";

class AlertNotify {
  static info(message, duration = 5000) {
    toast.info(message, { autoClose: duration });
  }

  static success(message, duration = 5000) {
    toast.success(message, { autoClose: duration });
  }

  static warning(message, duration = 5000) {
    toast.warn(message, { autoClose: duration });
  }

  static error(message, duration = 5000) {
    toast.error(message, { autoClose: duration });
  }
}

// Export ToastContainer to render once in App
export { AlertNotify, ToastContainer };
