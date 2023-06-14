import React from "react";
import "./toast.css";
import getToastClassName, { ToastType } from "../../util/toast-className";
type ToastProps = {
  message: string;
  type: ToastType;
};

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const toastClassName = getToastClassName(type);
  return (
    <div className={toastClassName}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
