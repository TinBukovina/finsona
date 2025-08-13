"use client";

import { Button, useToast } from "@/6_shared";
import Modal from "@/6_shared/ui/modal/Modal";
import { useRouter } from "@/i18n/navigation";
import React, { useState } from "react";

export default function DisableAccountCard() {
  const router = useRouter();

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
        Disable account
      </h2>

      {/*DESCRIPTION*/}
      <p className="text-muted-foreground">
        Disable this account and its data. This action is premanent and cannot
        be undone.
      </p>

      <Button
        variant="secondary"
        className="w-fit"
        onClick={() => setIsModalOpen(true)}
      >
        Disable account
      </Button>

      <Modal open={isModalOpen}>
        {/* 3. This is the content that will appear in the portal */}
        <div className="fixed inset-0 bg-background/60 flex items-center justify-center">
          <div className="flex flex-col gap-4 px-8 py-6 bg-popover border border-border rounded-card ">
            <p className="max-w-[300px] text-center">
              Are you shure you want to disable your account?
            </p>

            {/*Buttons inside modal*/}
            <div className="flex gap-4 w-full justify-center items-center">
              <Button
                variant={"secondary"}
                onClick={handleDisableAccount}
                disabled={isLoading}
              >
                Disable
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
              >
                Keep
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
