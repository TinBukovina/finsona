"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  bedtime_r_400,
  DivLoader,
  IconTemplate,
  sunny_r_400,
  SvgReturnType,
} from "@/6_shared/index";
import { useSettings } from "@/5_entities/user";

export default function ThemeBtn() {
  const { settings, updateUser } = useSettings();

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const sunSvgRef = useRef<SvgReturnType>(sunny_r_400());
  const moonSvgRef = useRef<SvgReturnType>(bedtime_r_400());

  const mode = settings.theme;

  const svgData =
    mode === "light"
      ? isHovered
        ? moonSvgRef.current
        : sunSvgRef.current
      : isHovered
        ? sunSvgRef.current
        : moonSvgRef.current;

  // It is for preventing hydration error bcause of conditional svg rendering depending on theme
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <DivLoader width="42px" height="42px" bg="secondary" border={true} />
    );
  }

  return (
    <div
      className={
        `flex justify-center items-center p-2 bg-secondary fill-secondary-foreground rounded-max border border-border` +
        " " +
        `hover:bg-primary hover:fill-primary-foreground hover:cursor-pointer active:scale-93 transition-all`
      }
      onClick={() => {
        updateUser({ theme: mode === "light" ? "dark" : "light" });
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconTemplate svg={svgData} width="24px" height="24px" />
    </div>
  );
}
