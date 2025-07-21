import { useMutation } from "@tanstack/react-query";
import { login } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  return useMutation({
    mutationFn: async (params: any) => {
      return await login(params);
    },
    onSuccess: (response) => {
      const result = response?.data;
      console.log(result);

      if (result) {
        setUser({
          ...result.data.user,
          token: result.data.token,
          refreshToken: result.data.refreshToken,
        });
        navigate("/");
      }
    },
    onError: (error: any) => {
      // console.log(error);
    },
  });
};
