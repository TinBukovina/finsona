import React from "react";

import { PasswordCard, PersonalDetailsCard } from "@/3_widgets";
import { Button } from "@/6_shared";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      {/*PERSONAL DETAILS SETTINGS CARD*/}
      <PersonalDetailsCard />

      {/*RESET  PASSWORD CARD*/}
      <PasswordCard />

      {/*DISABLE ACCOUNT CARD*/}
      <div className="flex flex-col gap-5 p-4 bg-card border border-border rounded-card">
        {/*TITLE*/}
        <h2 className="text-h6 text-card-foreground font-semibold">
          Disable account
        </h2>

        {/*DESCRIPTION*/}
        <p className="text-muted-foreground">
          Disable this account and its data. This action is premanent and cannot
          be undone.
        </p>

        <Button variant="secondary" className="w-fit">
          Disable account
        </Button>
      </div>
    </div>
  );
}
