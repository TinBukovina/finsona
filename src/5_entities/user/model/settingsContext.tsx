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

export interface UserDataInterface extends UserSettings, UserPersonalInfo {}

export interface UserSettings {
  theme: "light" | "dark" | "system";
  default_currency: "EUR" | "USD";
  number_format: "EU" | "US";
  language: "en" | "hr";
  month_start_day: number;
}

export interface UserPersonalInfo {
  email?: string;
  full_name?: string;
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: "dark",
  default_currency: "EUR",
  number_format: "EU",
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
  updateUser: (
    newData: Partial<UserDataInterface>
  ) => Promise<ResponseInterface>;
}

const UserSettingsContext = React.createContext<UserSettingsContextType | null>(
  null
);

export function UserSettingsProvider({ children }: PropsWithChildren) {
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
        const response = await fetch("/api/user/profile");
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

  // Logic for managing theme change
  useEffect(() => {
    if (settings?.theme) {
      const root = document.documentElement;
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const applyTheme = (themeValue: UserSettings["theme"]) => {
        let effectiveTheme = themeValue;
        if (themeValue === "system") {
          effectiveTheme = mediaQuery.matches ? "dark" : "light";
        }

        root.classList = effectiveTheme;
      };

      applyTheme(settings.theme);

      const handleChange = () => applyTheme(settings.theme);
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [settings?.theme]);

  // Logic for updating user data
  const updateUser = useCallback(
    async (newData: Partial<UserDataInterface>): Promise<ResponseInterface> => {
      const originalSettings = settings;

      console.log(newData);

      // Optimistic update
      const newOptimisticSettings = {
        ...settings,
        ...newData,
      } as UserDataInterface;
      setSettings(newOptimisticSettings);
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(newOptimisticSettings)
      );

      // Update cookie if theme is changed
      if (newData.theme) {
        Cookies.set("theme", newData.theme, {
          expires: 365,
          path: "/",
        });
      }

      try {
        const response = await fetch("/api/user/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to save changes.");
        }

        return { success: true };
      } catch (error) {
        console.log(error);
        console.error("Failed to save user data to DB", error);

        // Revert to original settings
        setSettings(originalSettings);
        localStorage.setItem(
          SETTINGS_STORAGE_KEY,
          JSON.stringify(originalSettings)
        );
        if (newData.theme && originalSettings?.theme) {
          Cookies.set("theme", originalSettings.theme);
        }

        const message =
          error instanceof Error ? error.message : "Network error.";
        return { success: false, error: message };
      }
    },
    [settings]
  );

  const value = { settings, isSyncing, updateUser };

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
