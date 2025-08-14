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

interface SidebarNavLinksProps {
  isExpanded: boolean;
}

const navLinks = [
  {
    href: PRIVATE_ROUTES_CONFIG.budget,
    label: "Budget",
    svgData: money_bag_r_400(),
  },
  {
    href: PRIVATE_ROUTES_CONFIG.dashboard,
    label: "Dashboard",
    svgData: bar_chart_4_r_400(),
  },
  {
    href: PRIVATE_ROUTES_CONFIG.transactions,
    label: "Transactions",
    svgData: send_money_r_400(),
  },
  {
    href: PRIVATE_ROUTES_CONFIG.settings,
    label: "Settings",
    svgData: settings_r_400(),
  },
];

export default function SidebarNavLinks({ isExpanded }: SidebarNavLinksProps) {
  const pathname = usePathname();

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
          {link.label}
        </SidebarLink>
      ))}
    </div>
  );
}
