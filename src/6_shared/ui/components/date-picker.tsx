"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Calendar } from "./calendar";
import IconTemplate from "./icon-template";
import { calendar_month_r_400 } from "@/6_shared/lib";

interface DatePickerProps {
  value: Date | undefined;
  setValue: React.Dispatch<React.SetStateAction<Date | undefined>>;
  disabled?: boolean;
}

export function DatePicker({ value, setValue, disabled }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      {/* <Label htmlFor="date" className="px-1">
        Date of birth
      </Label> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled || false}
            variant="secondary"
            id="date"
            className="w-48 bg-input/30 justify-between font-normal"
          >
            <div className="flex items-center gap-2 fill-primary">
              <IconTemplate
                svg={calendar_month_r_400()}
                width="24px"
                height="24px"
              />
              {value ? value.toLocaleDateString() : "Select date"}
            </div>
            <ChevronDownIcon size={"16px"} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              setValue(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
