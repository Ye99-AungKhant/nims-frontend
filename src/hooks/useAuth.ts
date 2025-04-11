import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthedRoute() {
  // const navigate = useNavigate();
  // const accessToken = localStorage.getItem("authUser");
  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/login");
  //   }
  // }, [accessToken, navigate]);
}

export function useAuthRoute() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("authUser");

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [accessToken, navigate]);
}
