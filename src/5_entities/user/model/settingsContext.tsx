"use client";

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

export interface ResponseInterface {
  success: boolean;
  error?: string;
}

export interface UserSettings {
  theme: "light" | "dark";
  default_currency: "EUR" | "USD";
  language: "en";
  month_start_day: number;
}

export interface UserPersonalInfo {
  email?: string;
  full_name?: string;
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: "dark",
  default_currency: "EUR",
  language: "en",
  month_start_day: 1,
};

const DEFAULT_PERSONAL_INFO: UserPersonalInfo = {
  email: "",
  full_name: "",
};

const DEFAULT_VALUE = { ...DEFAULT_SETTINGS, ...DEFAULT_PERSONAL_INFO };

export const SETTINGS_STORAGE_KEY = "finsona-user-settings";

interface UserSettingsContextType {
  settings: UserSettings & UserPersonalInfo;
  isSyncing: boolean;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  updatePersonalInfo: (newPersonalInfo: Partial<UserPersonalInfo>) => void;
}

const UserSettingsContext = React.createContext<UserSettingsContextType | null>(
  null
);

export function UserSettingsProveder({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState<UserSettings & UserPersonalInfo>(
    () => {
      if (typeof window !== "undefined") {
        try {
          const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
          return storedSettings ? JSON.parse(storedSettings) : DEFAULT_VALUE;
        } catch (error) {
          console.warn(
            "Failed to parse settings from Local Storage, using default.",
            error
          );

          return DEFAULT_VALUE;
        }
      }

      return DEFAULT_VALUE; // Fallback for server-side rendering
    }
  );

  const [isSyncing, setIsSyncing] = useState<boolean>(true);

  // useEffect for syncing app settings with db settings
  useEffect(() => {
    async function syncSettingsWithDb() {
      // Trying to fetch settings from database
      try {
        const response = await fetch("/api/user/settings");
        if (response.ok) {
          const dbSettings = await response.json();

          if (dbSettings) {
            setSettings(dbSettings);
            localStorage.setItem(
              SETTINGS_STORAGE_KEY,
              JSON.stringify(dbSettings)
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch settings from DB", error);
      } finally {
        setIsSyncing(false);
      }
    }

    syncSettingsWithDb();
  }, []);

  // Logic for updating settings
  const updateSettings = useCallback(
    async (newSettings: Partial<UserSettings>): Promise<ResponseInterface> => {
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
        const response = await fetch("/api/user/settings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSettings),
        });

        if (!response.ok) {
          const errorData = await response.json();
          return {
            success: false,
            error: errorData.message || "Failed to save user settings.",
          };
        }

        return { success: true };
      } catch (error) {
        console.error("Failed to save user data to DB", error);

        setSettings(settings);
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
        const message =
          error instanceof Error ? error.message : "Network error.";
        return { success: false, error: message };
      }
    },
    [settings]
  );

  // Logic for updating personal info
  const updatePersonalInfo = useCallback(
    async (
      newPersonalInfo: Partial<UserPersonalInfo>
    ): Promise<ResponseInterface> => {
      const newOptimisticSettings = {
        ...settings,
        ...newPersonalInfo,
      } as UserSettings & UserPersonalInfo;

      setSettings(newOptimisticSettings);

      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(newOptimisticSettings)
      );

      try {
        const response = await fetch("/api/user/personal-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPersonalInfo),
        });

        if (!response.ok) {
          const errorData = await response.json();
          return {
            success: false,
            error: errorData.message || "Failed to save personal info.",
          } as ResponseInterface;
        }

        return { success: true } as ResponseInterface;
      } catch (error) {
        console.error("Failed to save user data to DB", error);

        setSettings(settings);
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
        const message =
          error instanceof Error ? error.message : "Network error.";
        return { success: false, error: message };
      }
    },
    [settings]
  );

  const value = { settings, isSyncing, updateSettings, updatePersonalInfo };

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
