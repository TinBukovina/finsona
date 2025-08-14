"use client";

import { Button, useToast } from "@/6_shared";
import Modal from "@/6_shared/ui/modal/Modal";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

export default function DisableAccountCard() {
  const router = useRouter();

  const t = useTranslations("settings_account_page");
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDisableAccount = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/disable", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to disable account.");
      }

      addToast("Account disabled successfully.", "info");
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to disable account.";
      addToast(message, "error");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-4 bg-card border border-border rounded-card">
      {/*TITLE*/}
      <h2 className="text-h6 text-card-foreground font-semibold">
        {t("disable_account_title")}
      </h2>

      {/*DESCRIPTION*/}
      <p className="text-muted-foreground">
        {t("disable_account_description")}
      </p>

      <Button
        variant="secondary"
        className="w-fit"
        onClick={() => setIsModalOpen(true)}
      >
        {t("disable_account_btn")}
      </Button>

      <Modal open={isModalOpen}>
        {/* 3. This is the content that will appear in the portal */}
        <div className="fixed inset-0 bg-background/60 flex items-center justify-center">
          <div className="flex flex-col gap-4 px-8 py-6 bg-popover border border-border rounded-card ">
            <p className="max-w-[300px] text-center">
              {t("disable_account_warning_msg")}
            </p>

            {/*Buttons inside modal*/}
            <div className="flex gap-4 w-full justify-center items-center">
              <Button
                variant={"secondary"}
                onClick={handleDisableAccount}
                disabled={isLoading}
              >
                {t("disable_account_disable_btn")}
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
              >
                {t("disable_account_keep_btn")}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
