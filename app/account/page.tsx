"use client";

import { UserLoginForm } from "@/components/forms/UserLoginForm";
import { UserRegisterForm } from "@/components/forms/UserRegisterForm";
import { useState } from "react";

export default function AccountPage() {
      const [showForm, setShowForm] = useState<number>(1)

      if (showForm === 1) {
            return (
                  <UserLoginForm showForm={() => setShowForm(2)} />
            );
      } else {
            return (
                  <UserRegisterForm showForm={() => setShowForm(1)} />
            );
      };
};