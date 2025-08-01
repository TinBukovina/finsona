import React, { Suspense } from "react";

import { SidebarNavLinksLoader } from "@/6_shared";
import { ExpandNavBtn, LogoutBtn } from "@/4_features";
import SidebarNavLinks from "./SidebarNavLinks";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-4 justify-start w-[230px] h-full bg-sidebar-background fixed top-0 left-0 border-r border-border overflow-auto">
      <div className="flex justify-between p-4">
        {/*_LOGO_*/}
        <p className="text-h5">Finsona</p>
        {/*_EXPAND BTN_*/}
        <ExpandNavBtn />
      </div>

      <div className="flex flex-col justify-between h-full px-4 pb-4">
        {/*_TOP NAV LINKS_*/}
        <SidebarNavLinks />

        {/*_BOTTOM NAV LINKS_*/}
        <div className="flex flex-col gap-2">
          <LogoutBtn />
        </div>
      </div>
    </div>
  );
}
