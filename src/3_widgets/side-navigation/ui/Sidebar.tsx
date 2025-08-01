"use client";

import React, { useEffect, useState } from "react";

import { ExpandNavBtn, LogoutBtn } from "@/4_features";
import SidebarNavLinks from "./SidebarNavLinks";
import { IconTemplate, person_r_400, useScreenSize } from "@/6_shared";

export default function Sidebar() {
  const { width } = useScreenSize();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  // useEffect for setting state for tracking screen size in component
  useEffect(() => {
    setIsSmallScreen(width ? width < 880 : false);
  }, [width, setIsSmallScreen]);

  // useEffect for makin sure that is screen is small that sidebar can't be expended
  useEffect(() => {
    if (isSmallScreen) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }, [isSmallScreen, setIsExpanded]);

  return (
    <div
      className={`sm:shrink-0 flex flex-col gap-4 justify-start ${isExpanded ? "md:w-[230px]" : "w-fit"} h-full bg-sidebar-background top-0 left-0 border-r border-border overflow-auto`}
    >
      <div className="flex justify-between p-4">
        {/*_LOGO_*/}
        <p className={`text-h5 ${isExpanded ? "block" : "hidden"}`}>Finsona</p>
        {/*_EXPAND BTN_*/}
        {!isSmallScreen ? (
          <ExpandNavBtn value={isExpanded} setValue={setIsExpanded} />
        ) : (
          <div
            className={
              `flex justify-center items-center p-2 bg-secondary fill-secondary-foreground rounded-max` +
              " " +
              `hover:bg-primary hover:scale-103 hover:fill-primary-foreground hover:cursor-pointer active:scale-93 transition-all`
            }
          >
            <IconTemplate svg={person_r_400()} width="24px" height="24px" />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between h-full px-4 pb-4">
        {/*_TOP NAV LINKS_*/}
        <SidebarNavLinks isExpanded={isExpanded} />

        {/*_BOTTOM NAV LINKS_*/}
        <div className="flex flex-col gap-2">
          <LogoutBtn hideText={!isExpanded} />
        </div>
      </div>
    </div>
  );
}
