import { useState, useRef } from "react";
import Cookies from "js-cookie";
import { AxiosResponse } from "axios";
import { api } from "../api/api";
import { TOKEN_NAME, USER } from "../constants";
import { toast } from "react-toastify";

type LoginResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    roles: string;
  };
};

export const useLogin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (): Promise<boolean> => {
    const username: string = usernameRef.current!.value;
    const password: string = passwordRef.current!.value;

    if (username.trim() === "") {
      setShowError(true);
      return false;
    }

    if (
      password.length < 8 ||
      !password.match(/[A-Z]/) ||
      !password.match(/[a-z]/) ||
      !password.match(/[!@#$%^&*(),.?":{}|<>]/)
    ) {
      setShowError(true);
      return false;
    }

    setShowError(false);
    setLoading(true);

    try {
      const response: AxiosResponse<LoginResponse> = await api.post(
        "/auth/local",
        {
          identifier: username,
          password: password,
        }
      );

      if (response.status === 200) {
        const { jwt, user } = response.data;
        // Store token in cookie
        Cookies.set(TOKEN_NAME, jwt, { expires: 1 / 48 });
        Cookies.set(USER, JSON.stringify(user), { expires: 1 / 48 });
        setLoading(false);
        return true;
      } else {
        setLoading(false);
        return false;
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.error?.message, {
        position: "top-right",
      });

      return false;
    }
  };

  return {
    usernameRef,
    passwordRef,
    showError,
    loading,
    handleLogin,
  };
};
