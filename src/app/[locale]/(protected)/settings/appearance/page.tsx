import { LanguageCard, ThemeCard } from "@/3_widgets";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-4">
      {/*LANGUAGE SETTINGS CARD*/}
      <LanguageCard />

      {/*THEME SETTINGS CARD*/}
      <ThemeCard />
    </div>
  );
}
