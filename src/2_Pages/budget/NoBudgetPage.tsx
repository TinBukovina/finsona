import { Button } from "@/6_shared";
import Image from "next/image";
import React from "react";

export function NoBudgetPage() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col justify-center items-center gap-3">
          <Image
            width={200}
            height={200}
            src="/imgs/piggy_bank.png"
            alt="Piggy Bank"
          />

          <p>Need a new budget?</p>
        </div>
        <Button>Get Started</Button>
      </div>
    </div>
  );
}
