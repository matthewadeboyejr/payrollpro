import { toast, ToastPosition } from "react-hot-toast";

const showAlert = (title: string, message: string, type: string) => {
  const toastOptions = {
    duration: 2000,
    position: "top-right" as ToastPosition,
  };

  switch (type) {
    case "success":
      toast.success(`${title}: ${message}`, toastOptions);
      break;
    case "error":
      toast.error(`${title}: ${message}`, toastOptions);
      break;
    case "warning":
      toast(`${title}: ${message}`, { ...toastOptions, icon: "⚠️" });
      break;
    case "info":
      toast(`${title}: ${message}`, { ...toastOptions, icon: "ℹ️" });
      break;
    default:
      toast(message, toastOptions);
  }
};

export { showAlert };
