import React from "react";

export default function Loading() {
  return (
    <div
      className={
        "h-dvh " +
        "xs:border xs:border-border xs:h-[555.3px] xs:rounded-card xs:min-w-min xs:max-w-sm " +
        "flex flex-col justify-start gap-6 w-full bg-card p-4 relative"
      }
    >
      {/*_TITLE AND DESCRIPTION_*/}
      <div className="flex flex-col gap-2">
        <div className="h-[24px] w-[65%] bg-primary/50 rounded-max my-2 animate-pulse" />
        <div className="h-[16px] w-[40%] bg-muted-foreground/50 rounded-max my-1 animate-pulse" />
      </div>

      {/*_NORMAL LOGIN SECTION_*/}
      <form className="flex flex-col gap-4 text-card-foreground">
        {/*_TITLE_*/}
        <div className="h-[20px] w-[15%] bg-card-foreground/50 rounded-max mt-1 animate-pulse" />
        {/*_INPUTS AND FORGOT PASSWORD LINK_*/}
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 mb-1">
            <div className="h-[42px] w-[100%] bg-border/50 rounded-max my-0 mt-2 animate-pulse" />
            <div className="h-[42px] w-[100%] bg-border/50 rounded-max my-0 mt-2 animate-pulse" />
          </div>
          <div className="h-[42px] w-[100%] bg-border/50 rounded-max my-0 mt-2 animate-pulse" />
          <div className="h-[42px] w-[100%] bg-border/50 rounded-max my-0 mt-2 animate-pulse" />
          <div className="h-[42px] w-[100%] bg-border/50 rounded-max my-0 mt-2 animate-pulse" />
        </div>
        {/*_LOGIN BUTTON_*/}
        <div className="h-[40px] w-[100%] bg-primary/50 rounded-max my-0 animate-pulse" />
      </form>

      {/*_DON'T HAVE AN ACCOUNT TEXT_*/}
      <div className="flex flex-col gap-2 items-center text-sm text-center absolute bottom-4 left-0 w-full">
        <div className="h-[13px] w-[140px] bg-card-foreground/50 rounded-max my-0 animate-pulse" />
        <div className="h-[13px] w-[40px] bg-primary/50 rounded-max my-0 animate-pulse" />
      </div>
    </div>
  );
}
