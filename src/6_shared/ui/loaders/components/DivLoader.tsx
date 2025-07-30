import { cn } from "@scn/utils";
import React from "react";
import {
  backgroundColors,
  fontSizes,
  LoaderProps,
} from "../config/loader.config";

export default function DivLoader({
  bg = "foreground",
  width = "50%",
  height = "fit-content",
  text = "normal",
  className,
}: LoaderProps) {
  return (
    <div
      className={cn(
        "m-0 p-0 w-full bg-secondary/50 rounded-max my-0 border border-transparent animate-pulse",
        backgroundColors[bg],
        fontSizes[text],
        className
      )}
      style={{ width: width, height: height }}
    >
      <p className="invisible">text</p>
    </div>
  );
}
