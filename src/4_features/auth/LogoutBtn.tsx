"use client";

import React, { useState } from "react";
import { useRouter } from "@/i18n/navigation";

import { logout_r_400, SidebarLink, useToast } from "@/6_shared";
import { useTranslations } from "next-intl";

interface LogoutBtnProps {
  hideText?: boolean;
}

export function LogoutBtn({ hideText = false }: LogoutBtnProps) {
  const router = useRouter();
  const t = useTranslations("side_navigation");

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

      setTimeout(() => addToast(responseData.message, "success"), 600);
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
      hideText={hideText}
    >
      {t("logout")}
    </SidebarLink>
  );
}
