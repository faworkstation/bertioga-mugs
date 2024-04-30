"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@tremor/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const GoogleButton = () => {
      const handleLogin = (provider: "google") => {
            signIn(provider, {
                  callbackUrl: DEFAULT_LOGIN_REDIRECT,
            });
      };

      return (
            <Button
                  className={"w-full bg-slate-50"}
                  icon={FcGoogle}
                  variant={"secondary"}
                  onClick={() => handleLogin("google")}
            >
                  Google
            </Button>
      );
};