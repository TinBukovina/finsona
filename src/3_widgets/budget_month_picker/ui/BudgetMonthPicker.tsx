"use client";

import {
  arrow_back_IOS_r_400,
  arrow_forward_IOS_r_400,
  IconTemplate,
} from "@/6_shared";
import React, { useCallback, useEffect, useRef, useState } from "react";

const moths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function BudgetMonthPicker() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = useCallback(() => {
    const container = scrollContainerRef.current;

    if (container) {
      const atLeft = container.scrollLeft <= 1;
      const atRight =
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth - 1;
      setCanScrollLeft(!atLeft);
      setCanScrollRight(!atRight);
    }
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;

    if (container) {
      const scrollAmount = container.clientWidth * 0.2;

      console.log(scrollAmount);
      container.scrollTo({
        left:
          container.scrollLeft +
          (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth",
      });

      checkScrollability();
    }
  };

  return (
    <div className="flex items-center gap-4 w-full min-w-0">
      <p className="px-4 py-2 h-fit bg-primary rounded-max text-primary-foreground text-h6 font-semibold">
        2025
      </p>
      <div className="flex justify-center items-center gap-4 px-4 py-2 w-full bg-card border border-border rounded-max text-card-foreground fill-card-foreground min-w-0">
        <button
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
          className="cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <IconTemplate
            svg={arrow_back_IOS_r_400()}
            width="24px"
            height="24px"
          />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-2 w-full text-normal overflow-x-auto scrollbar-hide"
        >
          {moths.map((month) => (
            <div
              key={month}
              className="px-6 py-1 bg-background rounded-max whitespace-nowrap"
            >
              {month}
            </div>
          ))}
        </div>

        <button
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
          className="disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed"
        >
          <IconTemplate
            svg={arrow_forward_IOS_r_400()}
            width="24px"
            height="24px"
          />
        </button>
      </div>
    </div>
  );
}
