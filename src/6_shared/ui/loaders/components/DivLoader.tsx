import { cn } from "@scn/utils";
import React from "react";
import {
  backgroundColors,
  fontSizes,
  LoaderProps,
  roundedSizes,
} from "../config/loader.config";

export default function DivLoader({
  children,
  bg = "foreground",
  width = "50%",
  height = "fit-content",
  text = "normal",
  className,
  border = false,
  rounded = "card",
  padding = "1rem",
}: LoaderProps) {
  return (
    <div
      className={cn(
        `m-0 p-0 w-full bg-secondary/50 my-0 border ${border ? "border-border" : "border-transparent"} animate-pulse`,
        backgroundColors[bg],
        fontSizes[text],
        roundedSizes[rounded],
        className
      )}
      style={{ width: width, height: height, padding: padding }}
    >
      {children ? children : <p className="invisible">text</p>}
    </div>
  );
}
