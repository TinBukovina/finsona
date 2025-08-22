"use client";

import { BudgetInterface } from "@/5_entities";
import {
  arrow_back_IOS_r_400,
  arrow_forward_IOS_r_400,
  cn,
  IconTemplate,
} from "@/6_shared";
import React, { useCallback, useEffect, useRef, useState } from "react";

type Month = {
  name: string;
  value: number;
};

const moths: Month[] = [
  {
    name: "Jan",
    value: 0,
  },
  {
    name: "Feb",
    value: 1,
  },
  {
    name: "Mar",
    value: 2,
  },
  {
    name: "Apr",
    value: 3,
  },
  {
    name: "May",
    value: 4,
  },
  {
    name: "Jun",
    value: 5,
  },
  {
    name: "Jul",
    value: 6,
  },
  {
    name: "Aug",
    value: 7,
  },
  {
    name: "Sep",
    value: 8,
  },
  {
    name: "Oct",
    value: 9,
  },
  {
    name: "Nov",
    value: 10,
  },
  {
    name: "Dec",
    value: 11,
  },
];

interface BudgetMonthPickerProps {
  selectedMonth: number;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
}

export function BudgetMonthPicker({
  selectedMonth,
  setSelectedMonth,
}: BudgetMonthPickerProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Check is it is possible to scroll left and right
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

      container.scrollTo({
        left:
          container.scrollLeft +
          (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth",
      });

      checkScrollability();
    }
  };

  useEffect(() => {
    const selectedMonthElement = document.getElementById(
      `month-${selectedMonth}`
    );

    if (selectedMonthElement) {
      selectedMonthElement.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });

      setTimeout(() => {
        checkScrollability();
      }, 500);
    }
  }, [checkScrollability, selectedMonth]);

  return (
    <div className="flex items-center gap-4 w-full min-w-0">
      {/*YEAR*/}
      <p className="px-4 py-2 h-fit bg-primary rounded-max text-primary-foreground text-h6 font-semibold">
        2025
      </p>

      {/*MONTHS*/}
      <div className="flex justify-center items-center gap-4 px-4 py-2 w-full bg-card border border-border rounded-max text-card-foreground fill-card-foreground min-w-0">
        {/*LEFT ARROW*/}
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

        {/*LIST OF MONTHS*/}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 w-full text-normal overflow-x-auto scrollbar-hide"
        >
          {moths.map((month) => {
            const isSelected = selectedMonth === month.value;

            return (
              <div
                key={month.value}
                id={`month-${month.value}`}
                className={cn(
                  "px-6 py-1 bg-background rounded-max whitespace-nowrap border cursor-pointer transition-all hover:bg-accent hover:text-accent-foreground",
                  {
                    "bg-secondary text-secondary-foreground border-border":
                      isSelected,
                    "border-transparent": !isSelected,
                  }
                )}
                onClick={() => {
                  setSelectedMonth(month.value);
                }}
              >
                {month.name}
              </div>
            );
          })}
        </div>

        {/*RIGHT ARROW*/}
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
