import React from "react";
import { Link } from "@/i18n/navigation";
import { cva, VariantProps } from "class-variance-authority";

import { cn, IconTemplate } from "@/6_shared";

// React.HTMLAttributes<HTMLDivElement> - omogućava da element ima onClick i className
interface SidebarLinkProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarLinkVariants> {
  children: React.ReactNode;
  href?: string;
  svgData?: {
    path: string;
    viewBox: string;
  };
  isActive?: boolean;
  isDisabled?: boolean;
  hideText?: boolean;
}

const sidebarLinkVariants = cva(
  "flex gap-2 p-2 rounded-max text-normal  transition-transform ease-in-out hover:scale-103 active:scale-95",
  {
    variants: {
      active: {
        true: "bg-primary text-primary-foreground fill-primary-foreground font-medium",
        false:
          "text-sidebar-foreground fill-sidebar-foreground hover:bg-accent hover:text-accent-foreground hover:fill-accent-foreground",
      },
      disabled: {
        true: "pointer-events-none opacity-50 cursor-not-allowed",
        false: "cursor-pointer",
      },
      expanded: {
        true: "w-full px-3",
        false: "w-fit",
      },
    },
    defaultVariants: {
      active: false,
      disabled: false,
      expanded: false,
    },
  }
);

export default function SidebarLink({
  href,
  children,
  svgData,
  isActive = false,
  isDisabled = false,
  hideText = false,
  className,
  onClick,
}: SidebarLinkProps) {
  // Returing sidebar link element that doesnt need to redirect anywhere (etc. logout)
  if (!href) {
    return (
      <div
        className={cn(
          sidebarLinkVariants({
            active: isActive,
            disabled: isDisabled,
            expanded: !hideText,
            className,
          })
        )}
        onClick={onClick}
      >
        {svgData && <IconTemplate svg={svgData} width="24px" height="24px" />}
        <p className={hideText ? "hidden" : ""}>{children}</p>
      </div>
    );
  }

  // Returing sidebar link that rederect somewhere
  return (
    <Link
      href={href}
      className={cn(
        sidebarLinkVariants({
          active: isActive,
          disabled: isDisabled,
          expanded: !hideText,
          className,
        })
      )}
    >
      {svgData && <IconTemplate svg={svgData} width="24px" height="24px" />}
      <p className={hideText ? "hidden" : ""}>{children}</p>
    </Link>
  );
}
