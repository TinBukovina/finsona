"use client";

import { useSettings } from "@/5_entities/user";
import { Button, PUBLIC_ROUTES_CONFIG, useToast } from "@/6_shared";
import { useRouter } from "@/i18n/navigation";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";
import React from "react";

export default function PasswordCard() {
  const router = useRouter();

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
      router.push(PUBLIC_ROUTES_CONFIG.login);
    } catch (error) {
      console.error(error);
      addToast("Internal server error.", "error");
    }
  };

  return (
    <div className="flex flex-col gap-5 p-4 bg-card border border-border rounded-card">
      {/*TITLE*/}
      <h2 className="text-h6 text-card-foreground font-semibold">Password</h2>

      {/*DESCRIPTION*/}
      <p className="text-muted-foreground">
        When you request your change password, we will send you email with a
        link to change it.
      </p>

      <Button
        variant="secondary"
        className="w-fit"
        onClick={handleRequestPasswordChange}
      >
        Request password change
      </Button>
    </div>
  );
}
