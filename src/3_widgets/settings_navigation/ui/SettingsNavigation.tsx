"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";

const settingsLinks = [
  { href: "/settings/account", label: "Account" },
  { href: "/settings/application", label: "Application" },
  { href: "/settings/appearance", label: "Appearance" },
];

export default function SettingsNavigation() {
  const pathname = usePathname();

  return (
    <div className="flex">
      {settingsLinks.map((link, index) => (
        <React.Fragment key={link.href}>
          {/*LINK*/}
          <Link
            href={link.href}
            className={
              `text-h6 px-3 py-2 border-b-2 transition-colors` +
              (pathname.endsWith(link.href.split("/").pop()!)
                ? "text-primary border-primary"
                : "text-foreground border-border hover:border-border")
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
