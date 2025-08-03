"use client";

import React, { PropsWithChildren, useEffect } from "react";

import { useSettings } from "@/5_entities/user";
import { usePathname } from "next/navigation";

export default function AppContent({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const { settings, isLoading } = useSettings();

  // useEffect for managing background color depending on the path
  useEffect(() => {
    if (pathname.includes("auth")) {
      document.body.classList.add("bg-card");
      document.body.classList.remove("bg-background");
    } else {
      document.body.classList.add("bg-background");
      document.body.classList.remove("bg-card");
    }
  }, [pathname]);

  // useEffect for managing dark/light mode
  useEffect(() => {
    if (settings.theme && settings.theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [settings]);

  if (isLoading) {
    return <div>Loading options...</div>;
  }

  return <div>{children}</div>;
}
