import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getToken } from "../config/utils";
import { Blog_App_Routes } from "../config";

const UseBeAuthenticated = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push(Blog_App_Routes.LOGIN);
    }
  }, []);
  return null;
};

export default UseBeAuthenticated;
