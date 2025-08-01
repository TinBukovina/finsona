"use client";

import React, { useRef, useState } from "react";

import {
  east__arrow_r_400,
  IconTemplate,
  split_screen_left_r_400,
  west__arror_r_400,
} from "@/6_shared";

interface ExpnadeNavBtnProps {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ExpandNavBtn({ value, setValue }: ExpnadeNavBtnProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const splitSvgRef = useRef(split_screen_left_r_400());
  const westArrSvgRef = useRef(west__arror_r_400());
  const eastArrSvgRef = useRef(east__arrow_r_400());

  return (
    <div
      tabIndex={0}
      className={
        `flex items-center justify-center fill-sidebar-foreground p-2 rounded-max ` +
        "hover:bg-accent hover:cursor-pointer active:scale-93 transition-all"
      }
      onClick={() => setValue((prev) => !prev)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconTemplate
        svg={
          isHovered
            ? value
              ? westArrSvgRef.current
              : eastArrSvgRef.current
            : splitSvgRef.current
        }
        width="24px"
        height="24px"
      />
    </div>
  );
}
