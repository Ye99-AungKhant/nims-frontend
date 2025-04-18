import { useMutation } from "@tanstack/react-query";
import { login } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (params: any) => {
      return await login(params);
    },
    onSuccess: (response) => {
      const result = response?.data;
      console.log(result);

      if (result) {
        const { id, name } = result.data;
        const data = { id, name };

        localStorage.setItem("authUser", JSON.stringify(data));
        navigate("/");
      }
    },
    onError: (error: any) => {
      // console.log(error);
    },
  });
};
