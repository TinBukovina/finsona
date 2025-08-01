import { cn, IconTemplate } from "@/6_shared";
import { Link } from "@/i18n/navigation";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

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
}

const sidebarLinkVariants = cva(
  "flex gap-2 w-full px-3 py-2 rounded-max text-normal",
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
    },
    defaultVariants: {
      active: false,
      disabled: false,
    },
  }
);

export default function SidebarLink({
  href,
  children,
  svgData,
  isActive = false,
  isDisabled = false,
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
            className,
          })
        )}
        onClick={onClick}
      >
        {svgData && (
          <IconTemplate
            path={svgData.path}
            viewBox={svgData.viewBox}
            width="24px"
            height="24px"
          />
        )}
        <p>{children}</p>
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
          className,
        })
      )}
    >
      {svgData && (
        <IconTemplate
          path={svgData.path}
          viewBox={svgData.viewBox}
          width="24px"
          height="24px"
        />
      )}
      <p>{children}</p>
    </Link>
  );
}
