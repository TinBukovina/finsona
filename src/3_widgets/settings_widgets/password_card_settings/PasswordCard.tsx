"use client";

import { useSettings } from "@/5_entities/user";
import { Button, PUBLIC_ROUTES_CONFIG, useToast } from "@/6_shared";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import React from "react";

export default function PasswordCard() {
  const router = useRouter();

  const t = useTranslations("settings_account_page");

  const { addToast } = useToast();
  const { settings } = useSettings();

  const handleRequestPasswordChange = async () => {
    try {
      await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: settings.email }),
      });

      addToast("Check your email for a reset link.", "success");

      await fetch("/api/auth/logout", { method: "POST" });

      router.push(PUBLIC_ROUTES_CONFIG.login);
    } catch (error) {
      console.error(error);
      addToast("Internal server error.", "error");
    }
  };

  return (
    <div className="flex flex-col gap-5 p-4 bg-card border border-border rounded-card">
      {/*TITLE*/}
      <h2 className="text-h6 text-card-foreground font-semibold">
        {t("password_reset_title")}
      </h2>

      {/*DESCRIPTION*/}
      <p className="text-muted-foreground">{t("password_reset_description")}</p>

      <Button
        variant="secondary"
        className="w-fit"
        onClick={handleRequestPasswordChange}
      >
        {t("password_reset_btn")}
      </Button>
    </div>
  );
}
