export type ToastType = "error" | "success" | "info";

const getToastClassName = (type: ToastType): string => {
  let toastClassName = "toast";

  if (type === "error") {
    toastClassName += " error";
  } else if (type === "success") {
    toastClassName += " success";
  } else if (type === "info") {
    toastClassName += " info";
  }

  return toastClassName;
};

export default getToastClassName;
