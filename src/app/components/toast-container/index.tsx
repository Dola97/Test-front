import React, { useState, useEffect } from "react";
import Toast from "../toast";
import { ToastType } from "../../util/toast-className";

type ToastData = {
  id: number;
  message: string;
  type: ToastType;
};

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const newToast: ToastData = {
      id: Date.now(),
      message,
      type,
    };

    setToasts([...toasts, newToast]);
  };

  const removeToast = (id: number) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    const toastTimeout = setTimeout(() => {
      if (toasts.length > 0) {
        removeToast(toasts[0].id);
      }
    }, 3000);

    return () => clearTimeout(toastTimeout);
  }, [toasts]);

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} />
      ))}
    </div>
  );
};

export default ToastContainer;
