"use client";

import React, { useEffect, useState } from "react";

import { Button, cn, PersonalDetailsCardLoader, useToast } from "@/6_shared";
import { UserPersonalInfo, UserSettings, useSettings } from "@/5_entities/user";
import { useTranslations } from "next-intl";

export default function PersonalDetailsCard() {
  const t = useTranslations("settings_account_page");
  const { addToast } = useToast();
  const { settings, updateUser, isSyncing } = useSettings();

  const [formData, setFormData] = useState<UserSettings & UserPersonalInfo>(
    settings
  );

  const [editingMode, setEditingMode] = useState<boolean>(false);

  // Syncing from data with settings
  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  function changeSingleFormData(
    field: keyof (UserSettings & UserPersonalInfo),
    value: string
  ) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  const handlePersonalDetailsChange = async () => {
    if (!formData || !formData.full_name) return;

    if (formData.full_name?.length < 2) {
      addToast("Full name must be at least 2 characters long.", "error");
      return;
    }

    const result = await updateUser({ full_name: formData.full_name });

    if (result.success) {
      addToast("Profile updated successfully!", "success");
      setEditingMode(false);
    } else {
      addToast(result.error || "An unknown error occurred.", "error");
    }
  };

  const handleCancel = () => {
    setFormData(settings);
    setEditingMode(false);
  };

  if (isSyncing || !formData) {
    return <PersonalDetailsCardLoader />;
  }

  return (
    <div className="flex flex-col gap-5 p-4 bg-card border border-border rounded-card">
      {/*TITLE*/}
      <h2 className="text-h6 text-card-foreground font-semibold">
        {t("personal_details_title")}
      </h2>

      {/*OPTIONS*/}
      <div className="flex flex-col gap-3">
        <div className="flex gap-4 items-center">
          <label>{t("personal_details_email_input")}</label>
          <input
            className={cn(
              "block px-4 py-2 text-muted-foreground border rounded-max disabled:opacity-50 disable:pointer-events-none transition-all  ",
              "outline-none",
              {
                "border-border": false,
                "border-transparent pointer-events-none": true,
              },
              "focus:ring-[3px] focus:ring-ring/50"
            )}
            type="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={(e) => console.log(e.target.value)}
            size={
              formData.email
                ? formData.email?.length > 0
                  ? formData.email.length - 2
                  : 20
                : 20
            }
          />
        </div>
        <div className="flex gap-4 items-center">
          <label>{t("personal_details_full_name_input")}</label>
          <input
            className={cn(
              "block px-4 py-2 text-muted-foreground border rounded-max disabled:opacity-50 disable:pointer-events-none transition-all",
              "outline-none",
              {
                "border-border": editingMode,
                "border-transparent pointer-events-none": !editingMode,
              },
              "focus:ring-[3px] focus:ring-ring/50"
            )}
            placeholder="Full name"
            value={formData.full_name || ""}
            onChange={(e) => changeSingleFormData("full_name", e.target.value)}
            size={
              formData.full_name
                ? formData.full_name.length > 0
                  ? formData.full_name.length - 4
                  : 20
                : 20
            }
          />
        </div>
      </div>

      {editingMode ? (
        <div className="flex gap-4">
          <Button className="w-fit" onClick={handlePersonalDetailsChange}>
            {t("personal_details_save_btn")}
          </Button>
          <Button variant="secondary" className="w-fit" onClick={handleCancel}>
            {t("personal_details_cancel_btn")}
          </Button>
        </div>
      ) : (
        <Button
          variant="secondary"
          className="w-fit"
          onClick={() => {
            setEditingMode(true);
          }}
        >
          {t("personal_details_edit_btn")}
        </Button>
      )}
    </div>
  );
}
