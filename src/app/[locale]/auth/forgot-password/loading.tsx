import {
  ButtonLoader,
  CardLoader,
  DivLoader,
  FooterLoader,
  InputLoader,
  TextLoader,
} from "6_shared";
import React from "react";

export default function Loader() {
  return (
    <CardLoader>
      {/*_HEADER_SECTION: back button, title, description_*/}
      <div className={"flex flex-col gap-4"}>
        {/*_BACK ICON BUTTON_*/}
        <DivLoader bg="card_foreground" width="32px" height="32px" />

        {/*_TITLE_*/}
        <TextLoader text="h5" width="65%" bg="primary" />

        {/*_DESCRIPTION_*/}
        <TextLoader text="normal" width="80%" bg="muted_foreground" />
      </div>

      {/*_EMAIL INPUT_*/}
      <InputLoader bg="border" width="100%" />

      {/*_LOGIN BUTTON_*/}
      <ButtonLoader bg="primary" width="100%" />

      <div className="w-full h-[13px] bg-primary invisible" />

      {/*_DON'T HAVE AN ACCOUNT TEXT_*/}
      <FooterLoader />
    </CardLoader>
  );
}
