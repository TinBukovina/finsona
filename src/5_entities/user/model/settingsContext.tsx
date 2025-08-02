"use client";

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

export interface UserSettings {
  theme: "light" | "dark";
  default_currency: "EUR" | "USD";
  language: "en";
  month_start_day: number;
}

const INITIAL_SETTINGS: UserSettings = {
  theme: "dark",
  default_currency: "EUR",
  language: "en",
  month_start_day: 1,
};

const SETTINGS_STORAGE_KEY = "finsona-user-settings";

interface UserSettingsContextType {
  settings: UserSettings;
  isLoading: boolean;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
}

const UserSettingsContext = React.createContext<UserSettingsContextType | null>(
  null
);

export function UserSettingsProveder({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState<UserSettings>(INITIAL_SETTINGS);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect for loading initial settings
  useEffect(() => {
    async function loadingInitialSettings() {
      // First trying to get settings from LS while fetching it from database
      try {
        const storedSettingsString = localStorage.getItem(SETTINGS_STORAGE_KEY);
        const storedSettings: UserSettings | null = storedSettingsString
          ? JSON.parse(storedSettingsString)
          : null;

        if (storedSettings) {
          setSettings(storedSettings);
        }
      } catch (error) {
        console.warn(
          "Error loading initial settings from local storage",
          error
        );
      }

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
        setIsLoading(false);
      }
    }

    loadingInitialSettings();
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

  const value = { settings, isLoading, updateSettings };

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
