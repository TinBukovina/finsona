"use client";

import react, { useEffect, useState } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { useAppContext } from "@/1_app";
import { useWallets } from "@/5_entities";
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

export function SelectActiveWallet() {
  const [open, setOpen] = useState(false);

  const { appState, setActiveWallet } = useAppContext();
  const { data, error, isLoading } = useWallets();

  const handleWalletSelect = (newActiveWalletId: string) => {
    if (newActiveWalletId === appState.activeWalletId) {
      return;
    }

    setActiveWallet(newActiveWalletId);
    setOpen(false);
  };

  useEffect(() => {
    if (data?.wallets.length && appState.activeWalletId === null) {
      setActiveWallet(data.wallets[0].id || null);
    }
  }, [appState.activeWalletId, data?.wallets, setActiveWallet]);

  const selectWalletName =
    data?.wallets?.find((wallet) => wallet.id === appState.activeWalletId)
      ?.name || "Select account...";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : selectWalletName}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search account..." />
          <CommandList>
            {error && <CommandEmpty>Failed to load accounts.</CommandEmpty>}
            {!error && !isLoading && (
              <CommandEmpty>No accounts found.</CommandEmpty>
            )}

            <CommandGroup>
              {data?.wallets?.map((wallet) => (
                <CommandItem
                  key={wallet.id}
                  value={wallet.id}
                  onSelect={handleWalletSelect}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      appState.activeWalletId === wallet.id
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
