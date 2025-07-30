"use client";
import React from "react";
import { useRouter } from "next/router";

import { IconTemplate } from "6_shared";
import { west__arror_r_400 } from "@/6_shared/lib/svgPaths";

export default function BackIconButton() {
  const router = useRouter();

  return (
    <div
      className={
        "absolute top-5 left-5 " +
        "xs:static " +
        "flex items-center justify-center p-1  w-fit rounded-max hover:bg-accent hover:text-accent-foreground hover:fill-accent-foreground hover:cursor-pointer active:scale-85 hover:scale-110 transition-all"
      }
      onClick={() => router.back()}
    >
      <IconTemplate
        path={west__arror_r_400().path}
        viewBox={west__arror_r_400().viewBox}
        width="24px"
        height="24px"
      />
    </div>
  );
}
