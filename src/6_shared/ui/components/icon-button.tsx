"use client";

import React from "react";

import { IconTemplate } from "6_shared";
import { SvgReturnType } from "@/6_shared/lib/svgPaths";

interface IconButtonProps {
  svgData: SvgReturnType;
  handleOnClick: () => void;
}

export default function IconButton({
  svgData,
  handleOnClick,
}: IconButtonProps) {
  return (
    <div
      className={
        "absolute top-5 left-5 " +
        "xs:static " +
        "flex items-center justify-center p-1  w-fit rounded-max hover:bg-accent hover:text-accent-foreground hover:fill-accent-foreground hover:cursor-pointer active:scale-85 hover:scale-110 transition-all"
      }
      onClick={handleOnClick}
    >
      <IconTemplate
        path={svgData.path}
        viewBox={svgData.viewBox}
        width="24px"
        height="24px"
      />
    </div>
  );
}
