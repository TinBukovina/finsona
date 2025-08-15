"use client";

import React, { useState } from "react";
import { useSWRConfig } from "swr";
import { useTranslations } from "next-intl";
import { Button, Input, useToast } from "@/6_shared";

interface CreateBudgetFormProps {
  onClose: () => void;
}

export function CreateBudgetForm({ onClose }: CreateBudgetFormProps) {
  const { mutate } = useSWRConfig();
  const t = useTranslations("add_budget_modal");
  const { addToast } = useToast();

  const [name, setName] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || name.length <= 2) {
      addToast(t("validation_error"), "error");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/wallets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) throw new Error("Failed to create wallet.");

      addToast(t("success_toast"), "success");
      mutate("/api/wallets");
      onClose();
      setName("");
    } catch (error) {
      console.error("Error creating wallet:", error);
      addToast(t("generic_error"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()} // Sprječava zatvaranje modala klikom na formu
      className="flex flex-col gap-6 px-8 py-6 bg-popover border border-border rounded-card"
    >
      <h2 className="text-h6 font-semibold -mb-2">{t("title")}</h2>
      <div className="flex flex-col gap-3">
        <Input
          type="text"
          value={name}
          setValue={setName}
          placeholder={t("name_placeholder")}
          disabled={isLoading}
        />
      </div>
      <div className="flex gap-2 w-full">
        <Button
          className="flex-1"
          variant="secondary"
          type="button"
          onClick={onClose}
          disabled={isLoading}
        >
          {t("cancel_btn")}
        </Button>
        <Button className="flex-1" type="submit" disabled={isLoading}>
          {isLoading ? t("creating_btn") : t("create_btn")}
        </Button>
      </div>
    </form>
  );
}
