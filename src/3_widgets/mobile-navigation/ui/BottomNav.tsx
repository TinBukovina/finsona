"use client";

import React from "react";
import { usePathname } from "next/navigation";

import {
  bar_chart_4_r_400,
  MobileNavLink,
  money_bag_r_400,
  PRIVATE_ROUTES_CONFIG,
  send_money_r_400,
  settings_r_400,
} from "@/6_shared";

const mobileNavLinks = [
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

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="relative flex gap-0 justify-center mb-1 border-t-0 border-border w-full sm:hidden">
      <div className="w-full border-t-2 border-border"></div>
      {mobileNavLinks.map((link) => (
        <MobileNavLink
          key={link.href}
          href={link.href}
          svgData={link.svgData}
          isActive={pathname.includes(link.href)}
        >
          {link.label}
        </MobileNavLink>
      ))}
      <div className="w-full border-t-2 border-border"></div>
    </div>
  );
}
