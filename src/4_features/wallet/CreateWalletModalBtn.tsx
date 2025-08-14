"use client";

import React, { useState } from "react";

import {
  add_r_400,
  Button,
  cn,
  IconTemplate,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from "@/6_shared/index";
import Modal from "@/6_shared/ui/modal/Modal";
import { useSWRConfig } from "swr";
import { useTranslations } from "next-intl";
import { AllowedWalletTypes } from "@/5_entities";

export function CreateWalletModalBtn({}) {
  const { mutate } = useSWRConfig();

  const t = useTranslations("add_wallet_modal");
  const { addToast } = useToast();

  const [name, setName] = useState("");
  const [walletType, setWalletType] = useState<AllowedWalletTypes | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isActiveAccountButton, setIsActiveAccountButton] =
    useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || name.length <= 2) {
      addToast("Wallet name must be at least 3 characters long.", "error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/wallets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type: "personal" }),
      });

      if (!response.ok) {
        throw new Error("Failed to create wallet.");
      }

      addToast("Wallet created successfully!", "success");
      mutate("/api/wallets");
      setIsOpen(false);
      setName("");
    } catch (error) {
      console.error("Error creating wallet:", error);
      addToast("An error occurred.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <button
        className={cn(
          // Osnovni stilovi
          "flex justify-center items-center p-2 bg-secondary fill-secondary-foreground rounded-max border border-border transition-transform duration-150 ease-in-out",
          // Hover stilovi
          "hover:bg-accent hover:fill-accent-foreground hover:cursor-pointer",
          {
            "scale-93": isActiveAccountButton,
          }
        )}
        onMouseDown={() => setIsActiveAccountButton(true)}
        onMouseUp={() => setIsActiveAccountButton(false)}
        onClick={() => {
          console.log("click");
          setIsOpen(true);
        }}
      >
        <IconTemplate svg={add_r_400()} width="24px" height="24px" />
      </button>

      {/*MODAL WINDOW*/}
      <Modal open={isOpen}>
        <div
          className="fixed inset-0 bg-background/60 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col gap-6 px-8 py-6 bg-popover border border-border rounded-card"
          >
            <h2 className="text-h6 font-semibold -mb-2">{t("title")}</h2>

            <div className="flex flex-col gap-3">
              <Input
                type="text"
                value={name}
                setValue={setName}
                placeholder="Wallet name"
                disabled={isLoading}
              />

              <Select
                value={walletType ? String(walletType) : ""}
                onValueChange={(value) => {
                  setWalletType(value as AllowedWalletTypes);
                }}
              >
                <SelectTrigger
                  className="justify-between w-full 
                text-normal"
                >
                  <SelectValue
                    placeholder="Select type"
                    className="placeholder:card-foreground "
                  />
                </SelectTrigger>
                <SelectContent className="bg-popover p-[2px]">
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="savings">Savings</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 w-full overflow-auto">
              <Button
                className="flex-1"
                variant="secondary"
                type="button"
                onClick={() => {
                  setIsOpen(false);
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button className="flex-1" type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
/**--------------------------------------------------------------- */
/* 
interface CreateWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateWalletModal({ isOpen, onClose }: CreateWalletModalProps) {
  const { mutate } = useSWRConfig();
  const { addToast } = useToast();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || name.length <= 2) {
      addToast("Wallet name must be at least 3 characters long.", "error");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/wallets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type: "personal" }), // Pretpostavka za tip
      });

      if (!response.ok) {
        throw new Error("Failed to create wallet.");
      }

      addToast("Wallet created successfully!", "success");
      // Obavijesti SWR da osvježi podatke za novčanike
      mutate("/api/wallets");
      onClose(); // Zatvori modal
      setName(""); // Očisti formu
    } catch (error) {
      addToast("An error occurred.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-background/60 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 px-8 py-6 bg-popover border border-border rounded-card"
        >
          <h2 className="text-h6 font-semibold">Create a new wallet</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Wallet name (e.g., Main Account)"
            className="px-3 py-2 bg-input border border-border rounded-md"
            disabled={isLoading}
          />
          <div className="flex gap-4 justify-end">
            <Button
              variant="secondary"
              type="button"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
 */
