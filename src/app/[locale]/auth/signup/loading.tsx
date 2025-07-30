import React from "react";

import {
  ButtonLoader,
  CardLoader,
  FooterLoader,
  InputLoader,
  TextLoader,
} from "6_shared";

export default function Loading() {
  return (
    <CardLoader>
      <div className="flex flex-col gap-2">
        {/*_TITLE_*/}
        <TextLoader text="h5" width="65%" bg="primary" />

        {/*_DESCRIPTION_*/}
        <TextLoader text="normal" width="40%" bg="muted_foreground" />
      </div>

      {/*_LOGIN FORM_*/}
      <div className="flex flex-col gap-4 text-card-foreground">
        {/*_TITLE_*/}
        <TextLoader text="h6" width="20%" bg="card_foreground" />

        {/*_INPUTS AND FORGOT PASSWORD LINK_*/}
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <InputLoader bg="border" width="100%" />
            <InputLoader bg="border" width="100%" />
          </div>
          <InputLoader bg="border" width="100%" />
          <InputLoader bg="border" width="100%" />
          <InputLoader bg="border" width="100%" />
        </div>
        {/*_LOGIN BUTTON_*/}
        <ButtonLoader bg="primary" width="100%" />
      </div>

      {/*_DON'T HAVE AN ACCOUNT TEXT_*/}
      <FooterLoader />
    </CardLoader>
  );
}
