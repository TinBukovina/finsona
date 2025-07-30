import React from "react";
import { cn } from "@scn/utils";

import {
  backgroundColors,
  fontSizes,
  LoaderProps,
} from "../config/loader.config";

export default function TextLoader({
  bg = "foreground",
  width = "50%",
  height = "fit-content",
  text = "normal",
  className,
}: LoaderProps) {
  return (
    <div
      className={cn(
        "m-0 px-0 py-[2px] w-full h-fit rounded-max animate-pulse",
        backgroundColors[bg],
        fontSizes[text],
        className
      )}
      style={{ width: width, height: height }}
    >
      <p className="invisible leading-none">text</p>
    </div>
  );
}
