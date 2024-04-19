"use client";

import { handleLogoutSession } from "@/database/create/logout-session";
import { useRouter } from "next/navigation";

type Props = {
      children?: React.ReactNode;
};

export const LogoutButton = ({ children }: Props) => {
      const router = useRouter();

      const executeLogoutSessionOnClick = () => {
            handleLogoutSession();
            router.push("/")            
      };

      return (
            <span
                  className={"cursor-pointer"}
                  onClick={executeLogoutSessionOnClick}
            >
                  {children}
            </span>
      );
};
