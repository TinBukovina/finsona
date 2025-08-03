"use client";

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

export interface UserSettings {
  theme: "light" | "dark";
  default_currency: "EUR" | "USD";
  language: "en";
  month_start_day: number;
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: "dark",
  default_currency: "EUR",
  language: "en",
  month_start_day: 1,
};

export const SETTINGS_STORAGE_KEY = "finsona-user-settings";

interface UserSettingsContextType {
  settings: UserSettings;
  isSyncing: boolean;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
}

const UserSettingsContext = React.createContext<UserSettingsContextType | null>(
  null
);

export function UserSettingsProveder({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return storedSettings ? JSON.parse(storedSettings) : DEFAULT_SETTINGS;
    } catch (error) {
      console.warn(
        "Failed to parse settings from Local Storage, using default.",
        error
      );
      return DEFAULT_SETTINGS;
    }
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(true);

  // useEffect for syncing app settings with db settings
  useEffect(() => {
    async function syncSettingsWithDb() {
      // Trying to fetch settings from database
      try {
        const response = await fetch("/api/user/settings");
        if (response.ok) {
          const dbSettings = await response.json();

          if (dbSettings && dbSettings.theme) {
            setSettings(dbSettings);
            localStorage.setItem(
              SETTINGS_STORAGE_KEY,
              JSON.stringify(dbSettings)
            );
          }
        }
      } catch (error) {
        console.error("Feilt to fetch settings from DB", error);
      } finally {
        setIsSyncing(false);
      }
    }

    syncSettingsWithDb();
  }, []);

  // Logic for updating settings
  const updateSettings = useCallback(
    async (newSettings: Partial<UserSettings>) => {
      const newOptimisticSettings = {
        ...settings,
        ...newSettings,
      } as UserSettings;

      setSettings(newOptimisticSettings);

      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(newOptimisticSettings)
      );

      Cookies.set("theme", newOptimisticSettings.theme, {
        expires: 365,
        path: "/",
      });

      try {
        await fetch("/api/user/settings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSettings),
        });
      } catch (error) {
        console.error("Failed to save settings to DB", error);
      }
    },
    [settings]
  );

  const value = { settings, isSyncing, updateSettings };

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
    </UserSettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = React.useContext(UserSettingsContext);

  if (!context) {
    throw new Error("You need to use useSettings inside UserSettingsProvider!");
  }

  return context;
};
