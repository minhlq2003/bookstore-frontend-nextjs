"use server"

import { auth, signIn, signOut } from "../auth"

export const loginWithGoogle = async () => {

    await signIn("google", {redirectTo: "/"}) 
}

export const logout = async () => {
    await signOut({ redirectTo: "/signin" });
  };

export const isLogin = async () => {
    const session = await auth()
    return !!session
}