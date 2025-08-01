import React from "react";

import ButtonLoader from "../components/ButtonLoader";

export default function SidebarNavLinksLoader() {
  return (
    <div className="flex flex-col gap-2">
      <ButtonLoader width="100%" bg="input" />
      <ButtonLoader width="100%" bg="input" />
      <ButtonLoader width="100%" bg="input" />
      <ButtonLoader width="100%" bg="input" />
    </div>
  );
}
