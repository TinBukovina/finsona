"use client";

import React, { useState } from "react";
import { useSWRConfig } from "swr";
import { useTranslations } from "next-intl";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from "@/6_shared";
import { AllowedWalletTypes } from "@/5_entities/wallet";

interface CreateWalletFormProps {
  onClose: () => void;
}

export function CreateWalletForm({ onClose }: CreateWalletFormProps) {
  const { mutate } = useSWRConfig();
  const t = useTranslations("add_wallet_modal");
  const { addToast } = useToast();

  const [name, setName] = useState("");
  const [walletType, setWalletType] = useState<
    AllowedWalletTypes | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || name.length <= 2 || !walletType) {
      addToast(t("validation_error"), "error");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/wallets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type: walletType }),
      });

      if (!response.ok) throw new Error("Failed to create wallet.");

      addToast(t("success_toast"), "success");
      mutate("/api/wallets");
      onClose();
      setName("");
      setWalletType(undefined);
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
        <Select
          value={walletType}
          onValueChange={(value) => setWalletType(value as AllowedWalletTypes)}
          disabled={isLoading}
        >
          <SelectTrigger className="justify-between px-4 w-full text-normal">
            <SelectValue placeholder={t("type_placeholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">{t("type_personal")}</SelectItem>
            <SelectItem value="business">{t("type_business")}</SelectItem>
            <SelectItem value="savings">{t("type_savings")}</SelectItem>
          </SelectContent>
        </Select>
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
