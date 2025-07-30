import React from "react";

import {
  ButtonLoader,
  CardLoader,
  InputLoader,
  TextLoader,
  FooterLoader,
} from "6_shared";

export default function Loading() {
  return (
    <CardLoader>
      <div className="flex flex-col gap-2">
        {/*_TITLE_*/}
        <TextLoader width="65%" bg="primary" text="h5" />
        {/*_DESCRIPTION_*/}
        <TextLoader width="40%" bg="muted_foreground" text="normal" />
      </div>

      {/*_LOG IN WITH EMAIL OPTION_*/}
      <ButtonLoader width="100%" bg="secondary" />

      {/*_SEPARATION ELEMENT_*/}
      <div className="flex items-center justify-center gap-2">
        <div className="h-[1px] w-full bg-border animate-pulse"></div>
        <TextLoader text="sm" width="50px" bg="muted_foreground" />
        <div className="h-[1px] w-full bg-border animate-pulse"></div>
      </div>

      {/*_NORMAL LOGIN SECTION_*/}
      <form className="flex flex-col gap-4 text-card-foreground">
        {/*_TITLE_*/}

        <TextLoader text="h5" width="20%" bg="card_foreground" />
        {/*_INPUTS AND FORGOT PASSWORD LINK_*/}
        <div className="flex flex-col gap-2">
          <InputLoader width="100%" bg="border" />
          <InputLoader width="100%" bg="border" />

          <TextLoader text="sm" width="33%" bg="primary" />
        </div>
        {/*_LOGIN BUTTON_*/}

        <ButtonLoader bg="primary" width="100%" />
      </form>

      {/*_DON'T HAVE AN ACCOUNT TEXT_*/}
      <FooterLoader />
    </CardLoader>
  );
}
