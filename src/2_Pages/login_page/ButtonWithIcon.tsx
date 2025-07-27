import React from "react";

import { IconTemplate } from "6_shared";
import { cva } from "class-variance-authority";
import { cn } from "@scn/utils";

interface ButtonWithIconProps {
  children: React.ReactNode;
  svgInfo: {
    path: string;
    viewBox: string;
  };
}

const BttonStyles = cva(
  "flex justify-center items-center gap-2 px-4 py-2 bg-secondary rounded-max border border-solid border-border fill-secondary-foreground hover:bg-accent hover:text-accent-foreground hover:fill-accent-foreground hover:cursor-pointer",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export default function ButtonWithIcon({
  children,
  svgInfo,
}: ButtonWithIconProps) {
  return (
    <div tabIndex={0} className={cn(BttonStyles())}>
      <IconTemplate
        path={svgInfo.path}
        viewBox={svgInfo.viewBox}
        width="24px"
        height="24px"
      />
      <p>{children}</p>
    </div>
  );
}
