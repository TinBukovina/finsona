import React from "react";

import {
  ButtonLoader,
  CardLoader,
  DivLoader,
  FooterLoader,
  InputLoader,
  TextLoader,
} from "6_shared";

export default function Loader() {
  return (
    <CardLoader>
      <div className={"flex flex-col gap-4"}>
        {/*_BACK ICON BUTTON_*/}
        <DivLoader bg="card_foreground" width="32px" height="32px" />

        {/*_TITLE_*/}
        <TextLoader text="h5" width="65%" bg="primary" />
      </div>

      {/*_INPUTS_*/}
      <div className="flex flex-col gap-2">
        <InputLoader bg="border" width="100%" />
        <InputLoader bg="border" width="100%" />
      </div>

      {/*_LOGIN BUTTON_*/}
      <ButtonLoader bg="primary" width="100%" />

      <div className="w-full h-[13px] bg-primary invisible" />

      {/*_DON'T HAVE AN ACCOUNT TEXT_*/}
      <FooterLoader />
    </CardLoader>
  );
}
