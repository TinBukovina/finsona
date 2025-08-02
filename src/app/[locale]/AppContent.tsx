"use client";

import React, { PropsWithChildren, useEffect } from "react";

import { useSettings } from "@/5_entities/user";

export default function AppContent({ children }: PropsWithChildren) {
  const { settings, isLoading } = useSettings();

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
