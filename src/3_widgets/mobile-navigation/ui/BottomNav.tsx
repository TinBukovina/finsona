"use client";

import React from "react";
import { usePathname } from "next/navigation";

import {
  bar_chart_4_r_400,
  cn,
  MobileNavLink,
  money_bag_r_400,
  PRIVATE_ROUTES_CONFIG,
  send_money_r_400,
  settings_r_400,
  useAutoHideDiv,
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

interface BottomNavProps {
  scrollableElementRef: React.RefObject<HTMLElement | null>;
}

export default function BottomNav({ scrollableElementRef }: BottomNavProps) {
  const pathname = usePathname();

  const showNav = useAutoHideDiv(scrollableElementRef);

  return (
    <div
      className={cn(
        "fixed -bottom-1 left-0 z-10 flex gap-0 justify-center mb-1 bg-sidebar-background border-t-0 border-border w-full sm:hidden",
        showNav ? "" : "hidden"
      )}
    >
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
