import React from "react";

import { LanguageCard, ThemeCard } from "@/3_widgets";

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
