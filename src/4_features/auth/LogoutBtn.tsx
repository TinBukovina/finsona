"use client";

import React, { useState } from "react";
import { useRouter } from "@/i18n/navigation";

import { logout_r_400, SidebarLink, useToast } from "@/6_shared";

export function LogoutBtn() {
  const router = useRouter();
  const { addToast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      addToast(responseData.message, "success");
      router.refresh();
    } catch (error) {
      console.error(error);
      addToast("An error occurred during logout.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarLink
      svgData={logout_r_400()}
      onClick={handleLogout}
      isDisabled={isLoading}
    >
      Logout
    </SidebarLink>
  );
}
