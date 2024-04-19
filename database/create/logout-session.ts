"use server";

import { signOut } from "@/auth";

export const handleLogoutSession = async () => {
      await signOut();
};