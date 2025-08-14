"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function SettingsNavigation() {
  const pathname = usePathname();

  const t = useTranslations("settings_page");

  const settingsLinks = [
    { href: "/settings/account", label: t("tab_account") },
    { href: "/settings/application", label: t("tab_application") },
    { href: "/settings/appearance", label: t("tab_appearance") },
  ];

  return (
    <div className="flex">
      {settingsLinks.map((link, index) => (
        <React.Fragment key={link.href}>
          {/*LINK*/}
          <Link
            href={link.href}
            className={
              `text-h6 px-3 py-2 border-b-2 transition-colors` +
              " " +
              (pathname.endsWith(link.href.split("/").pop()!)
                ? "text-primary border-primary"
                : "text-foreground border-border hover:cursor-pointer hover:text-primary")
            }
          >
            {link.label}
          </Link>

          {/* Space between links */}
          {index < settingsLinks.length - 1 && (
            <div className="w-[8px] border-b-2 border-border" />
          )}
        </React.Fragment>
      ))}
      <div className="flex-1 border-b-2 border-border" />
    </div>
  );
}
