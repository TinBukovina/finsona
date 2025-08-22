"use client";

import { useEffect, useState } from "react";

import { useWallets, WalletInterface } from "@/5_entities";
import { useAppContext } from "@/1_app";
import {
  Button,
  cn,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/6_shared";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

interface SelectActiveWalletClientProps {
  initialWallets: WalletInterface[];
  initialSelectedWallet: WalletInterface;
}

export function SelectActiveWalletClient({
  initialWallets,
  initialSelectedWallet,
}: SelectActiveWalletClientProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { appState, setActiveWallet } = useAppContext();

  const { data } = useWallets({
    fallbackData: { wallets: initialWallets },
  });

  const wallets = data?.wallets || [];

  const currentWalletId = appState.activeWalletId || initialSelectedWallet.id;
  const currentWallet =
    wallets.find((w) => w.id === currentWalletId) || initialSelectedWallet;

  useEffect(() => {
    if (appState.activeWalletId !== initialSelectedWallet.id) {
      setActiveWallet(initialSelectedWallet.id);
    }
  }, [initialSelectedWallet.id, appState.activeWalletId, setActiveWallet]);

  const handleWalletSelect = (newActiveWalletId: string) => {
    if (newActiveWalletId === appState.activeWalletId) {
      return;
    }

    setActiveWallet(newActiveWalletId);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentWallet.name}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search account..." />
          <CommandList>
            <CommandEmpty>No accounts found.</CommandEmpty>
            <CommandGroup>
              {wallets.map((wallet) => (
                <CommandItem
                  key={wallet.id}
                  value={wallet.id}
                  onSelect={handleWalletSelect}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentWalletId === wallet.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {wallet.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
