import React from "react";
import { Link } from "@/i18n/navigation";
import { cva, VariantProps } from "class-variance-authority";

import { cn, IconTemplate } from "@/6_shared";

// React.HTMLAttributes<HTMLDivElement> - omogućava da element ima onClick i className
interface SidebarLinkProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mobileNavLinksVariants> {
  children: React.ReactNode;
  href: string;
  svgData: {
    path: string;
    viewBox: string;
  };
  isActive?: boolean;
  isDisabled?: boolean;
}

const mobileNavLinksVariants = cva(
  "flex flex-col justify-center items-center gap-1 p-1 px-2 border-t-2 border-border cursor-pointer",
  {
    variants: {
      active: {
        true: "border-primary text-primary fill-primary font-medium",
        false:
          "text-sidebar-foreground fill-sidebar-foreground hover:text-accent-foreground hover:fill-accent-foreground",
      },
      disabled: {
        true: "pointer-events-none opacity-50 cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      active: false,
      disabled: false,
    },
  }
);

export default function MobileNavLink({
  href,
  children,
  svgData,
  isActive = false,
  isDisabled = false,
  className,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        mobileNavLinksVariants({
          active: isActive,
          disabled: isDisabled,
          className,
        })
      )}
    >
      <div className="flex flex-col items-center gap-1 transition-transform duration-200 hover:scale-105 active:scale-90">
        <IconTemplate svg={svgData} width="32px" height="32px" />
        <p className="text-sm">{children}</p>
      </div>
    </Link>
  );
}
