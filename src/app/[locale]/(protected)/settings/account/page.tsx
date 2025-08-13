import React from "react";

import {
  DisableAccountCard,
  PasswordCard,
  PersonalDetailsCard,
} from "@/3_widgets";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      {/*PERSONAL DETAILS SETTINGS CARD*/}
      <PersonalDetailsCard />

      {/*RESET  PASSWORD CARD*/}
      <PasswordCard />

      {/*DISABLE ACCOUNT CARD*/}
      <DisableAccountCard />
    </div>
  );
}
