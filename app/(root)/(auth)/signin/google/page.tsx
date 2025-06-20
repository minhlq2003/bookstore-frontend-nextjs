"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { getSessionUser } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { signup, login } from "@/modules/services/userServices";
import {UserResponse} from "@/constant/types";
import {toast} from "sonner";
const Page = () => {
  const verificationAttempted = useRef(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (verificationAttempted.current) return;
    const fetchAndStoreGoogleUser = async () => {
      verificationAttempted.current = true;
      const session = await getSessionUser();
      if (session && session.email && session.image) {
        setIsGoogleLogin(true);
        const userData = await getUserInfo(session.email);
        if(userData?.token) {
          localStorage.setItem("user", JSON.stringify(userData.user));
          localStorage.setItem("accessToken", userData?.token);
          return router.push("/");
        } else {
          let username = session.email.split("@")[0]
          //register account
          let response = await signup(username, "googlelogin", session.name, session.email)
          if(response?.user) {
            localStorage.setItem("user", JSON.stringify(response?.user));
            localStorage.setItem("accessToken", response?.token);
            return router.push("/");
          } else {
            toast.error("There's already an account registered using Email, please try again.");
            setTimeout(() => {
              localStorage.clear()
              return router.push("/signin")
            }, 1000)

          }

        }
      } else {
      }
    };
    fetchAndStoreGoogleUser();
    const getUserInfo = async(email: string): Promise<UserResponse> => {
      const res = await login(email, "googlelogin");
      if(!res.token) {
        return {} as UserResponse;
      }
      if(!res) return {} as UserResponse
      return res;
    }

  }, []);
  return (
    <div>
    Redirecting...
    </div>
  )
}

export default Page;

