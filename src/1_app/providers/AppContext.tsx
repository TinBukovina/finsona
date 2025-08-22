"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { WALLET_ID_COOKIE_KEY } from "../config/constants";

interface AppState {
  activeWalletId: string | null;
  selectedBudgetId: string | null;
}

interface AppContextType {
  appState: AppState;
  setActiveWallet: (walletId: string | null) => void;
  setSelectedBudget: (budgetId: string | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [appState, setAppState] = useState<AppState>({
    activeWalletId: null,
    selectedBudgetId: null,
  });

  const setActiveWallet = useCallback((walletId: string | null) => {
    setAppState((prevState) => ({ ...prevState, activeWalletId: walletId }));

    if (walletId) {
      Cookies.set(WALLET_ID_COOKIE_KEY, walletId, { expires: 365 });
    } else {
      Cookies.remove(WALLET_ID_COOKIE_KEY);
    }
  }, []);

  const setSelectedBudget = useCallback((budgetId: string | null) => {
    setAppState((prevState) => ({ ...prevState, selectedBudgetId: budgetId }));
  }, []);

  useEffect(() => {
    console.log(appState);
  }, [appState]);

  const value = { appState, setActiveWallet, setSelectedBudget };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
