"use client";

import { useRouter } from "next/navigation";
import { handleLogoutSession } from "@/actions/create/logout-session";

type LogoutButtonProps = {
      children?: React.ReactNode;
};

export const LogoutButton = ({ children }: LogoutButtonProps) => {
      const router = useRouter();

      const executeLogoutSessionOnClick = () => {
            handleLogoutSession();
            router.push("/");
      };

      return (
            <span className={"cursor-pointer"} onClick={executeLogoutSessionOnClick} >
                  {children}
            </span>
      );
};
