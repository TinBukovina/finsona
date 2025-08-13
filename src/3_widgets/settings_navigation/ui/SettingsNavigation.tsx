"use client";

import { useRouter } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import React from "react";

export default function SettingsNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex">
      <div
        className={`text-h6 px-3 py-2 border-b-2 ${
          pathname.endsWith("account")
            ? "text-primary border-primary "
            : "text-foreground border-border"
        }`}
        onClick={() => router.push("/settings/account")}
      >
        Account
      </div>
      <div className="w-[8px] border-b-2 border-border" />
      <div
        className={`text-h6 px-3 py-2 border-b-2 ${
          pathname.endsWith("application")
            ? "text-primary border-primary "
            : "text-foreground border-border"
        }`}
        onClick={() => router.push("/settings/application")}
      >
        Application
      </div>
      <div className="w-[8px] border-b-2 border-border" />
      <div
        className={`text-h6 px-3 py-2 border-b-2 ${
          pathname.endsWith("appearance")
            ? "text-primary border-primary "
            : "text-foreground border-border"
        }`}
        onClick={() => router.push("/settings/appearance")}
      >
        Appearance
      </div>
      <div className="flex-1 border-b-2 border-border" />
    </div>
  );
}
