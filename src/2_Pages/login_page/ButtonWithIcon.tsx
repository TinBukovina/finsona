import React from "react";

import { IconTemplate } from "6_shared";
import { cva } from "class-variance-authority";
import { cn } from "@scn/utils";
import { Link, useRouter } from "i18n/navigation";

interface ButtonWithIconProps {
  children: React.ReactNode;
  svgInfo: {
    path: string;
    viewBox: string;
  };
  href?: string;
}

const buttonStyles = cva(
  "flex justify-center items-center gap-2 px-4 py-2 bg-secondary rounded-max border border-solid border-border fill-secondary-foreground hover:bg-accent hover:text-accent-foreground hover:fill-accent-foreground hover:cursor-pointer active:scale-95 transition-all",
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
  href,
}: ButtonWithIconProps) {
  const content = (
    <>
      <IconTemplate
        path={svgInfo.path}
        viewBox={svgInfo.viewBox}
        width="24px"
        height="24px"
      />
      <p>{children}</p>
    </>
  );

  // If href exists, make it a link
  if (href) {
    return (
      <Link href={href} className={cn(buttonStyles())}>
        {content}
      </Link>
    );
  }

  // If not, render it lika a normal div
  return <div className={cn(buttonStyles())}>{content}</div>;
}
