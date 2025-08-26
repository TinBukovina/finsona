"use client";

import React from "react";
import { usePathname } from "next/navigation";

import {
  bar_chart_4_r_400,
  money_bag_r_400,
  PRIVATE_ROUTES_CONFIG,
  send_money_r_400,
  settings_r_400,
  SidebarLink,
} from "@/6_shared";
import { useTranslations } from "next-intl";

interface SidebarNavLinksProps {
  isExpanded: boolean;
}

const navLinks = [
  {
    href: PRIVATE_ROUTES_CONFIG.budget,
    label: "budget",
    svgData: money_bag_r_400(),
  },
  {
    href: PRIVATE_ROUTES_CONFIG.dashboard,
    label: "dashboard",
    svgData: bar_chart_4_r_400(),
  },
  {
    href: PRIVATE_ROUTES_CONFIG.transactions,
    label: "transactions",
    svgData: send_money_r_400(),
  },
  {
    href: PRIVATE_ROUTES_CONFIG.settings,
    label: "settings",
    svgData: settings_r_400(),
  },
];

export default function SidebarNavLinks({ isExpanded }: SidebarNavLinksProps) {
  const pathname = usePathname();
  const t = useTranslations("side_navigation");

  return (
    <div className="flex flex-col gap-2">
      {navLinks.map((link) => (
        <SidebarLink
          key={link.href}
          href={link.href}
          svgData={link.svgData}
          isActive={
            link.label !== "Settings"
              ? pathname.includes(link.href)
              : pathname.includes("/settings")
          }
          hideText={!isExpanded}
        >
          {t(link.label)}
        </SidebarLink>
      ))}
    </div>
  );
}
