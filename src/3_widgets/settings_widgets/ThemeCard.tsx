"use client";

import React from "react";

import { useToast } from "@/6_shared";
import { UserSettings, useSettings } from "@/5_entities/user";
import { se } from "date-fns/locale";

export default function ThemeCard() {
  const { settings, updateUser, isSyncing } = useSettings();
  const { addToast } = useToast();

  const handleThemeChange = async (newTheme: UserSettings["theme"]) => {
    const result = await updateUser({
      theme: newTheme,
    });

    if (result.success) {
      addToast("Theme updated!", "success");
    } else {
      console.log(result.error);
      addToast("Failed to update theme.", "error");
    }
  };

  if (isSyncing) {
    return <div>Loding...</div>;
  }

  return (
    <div className="flex flex-col gap-5 p-4 bg-card border border-border rounded-card">
      <h2 className="text-h6 font-semibold">Language</h2>
      <p className="text-muted-foreground">
        Choose the preferred language for your account.
      </p>

      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col gap-2 w-fit">
          <div
            className={`w-[120px] h-[90px] bg-foreground ${settings.theme === "light" ? "border-[3px]" : "border"} ${settings.theme === "light" ? "border-primary" : "border-border"} rounded-card cursor-pointer hover:scale-105 transition-all`}
            onClick={() => handleThemeChange("light")}
          ></div>
          <p className="w-full text-center">Light</p>
        </div>
        <div className="flex flex-col gap-2 w-fit">
          <div
            className={`w-[120px] h-[90px] bg-background ${settings.theme === "dark" ? "border-[3px]" : "border"} ${settings.theme === "dark" ? "border-primary" : "border-border"} rounded-card cursor-pointer hover:scale-105 transition-all`}
            onClick={() => handleThemeChange("dark")}
          ></div>
          <p className="w-full text-center">Dark</p>
        </div>
        <div className="flex flex-col gap-2 w-fit">
          <div
            className={`flex gap-0 w-[120px] h-[90px] ${settings.theme === "system" ? "border-[3px]" : "border"} ${settings.theme === "system" ? "border-primary" : "border-border"} rounded-card cursor-pointer`}
          >
            <div className="w-full h-full bg-foreground rounded-card rounded-r-none"></div>
            <div className="w-full h-full bg-background  rounded-card rounded-l-none"></div>
          </div>
          <p className="w-full text-center">System</p>
        </div>
      </div>
    </div>
  );
}
