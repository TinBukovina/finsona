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
      {/*_HEADER_SECTION: back button, title, description_*/}
      <div className={"flex flex-col gap-4"}>
        {/*_BACK ICON BUTTON_*/}

        <DivLoader bg="card_foreground" width="32px" height="32px" />

        <div className="flex flex-col gap-2">
          {/*_TITLE_*/}
          <TextLoader width="65%" bg="primary" text="h5" />
          {/*_DESCRIPTION_*/}
          <TextLoader width="40%" bg="muted_foreground" text="normal" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/*_EMAIL INPUT_*/}
        <InputLoader bg="border" width="100%" />

        {/*_LOGIN BUTTON_*/}
        <ButtonLoader bg="primary" width="100%" />
      </div>

      <div className="w-full h-[13px] bg-primary invisible" />

      {/*_DON'T HAVE AN ACCOUNT TEXT_*/}
      <FooterLoader />
    </CardLoader>
  );
}
