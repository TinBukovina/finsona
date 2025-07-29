import SkeletonLoader from "@scn_components/SkeletonLoader";
import React from "react";

export default function Loader() {
  return (
    <div
      className={
        "h-dvh " +
        "xs:h-fit xs:border xs:border-solid xs:border-border xs:rounded-card xs:min-w-min xs:max-w-sm " +
        "relative flex flex-col justify-center gap-6 w-full bg-card p-4 fill-card-foreground"
      }
    >
      {/*_HEADER_SECTION: back button, title, description_*/}
      <div className={"flex flex-col gap-4"}>
        {/*_BACK ICON BUTTON_*/}
        <SkeletonLoader className="rounded-max bg-card-foreground/50 w-[32px] h-[32px]" />

        {/*_TITLE AND DESCRIPTION_*/}
        <div className="flex flex-col gap-2">
          <SkeletonLoader className="h-[24px] w-[65%] bg-primary/50 rounded-max my-2" />
          <SkeletonLoader className="h-[16px] w-[40%] bg-muted-foreground/50 rounded-max my-1" />
        </div>
      </div>

      {/*_EMAIL INPUT_*/}
      <SkeletonLoader className="h-[42px] w-[100%] bg-muted-foreground/50 rounded-max my-0 mt-2" />

      {/*_LOGIN BUTTON_*/}
      <SkeletonLoader className="h-[40px] w-[100%] bg-primary/50 rounded-max my-0" />
    </div>
  );
}
