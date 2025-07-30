import React from "react";
import TextLoader from "../components/TextLoader";

export default function FooterLoader() {
  return (
    <div className="static flex flex-col gap-2 items-center text-sm text-center w-full">
      <TextLoader text="sm" bg="card_foreground" width="40%" />
      <TextLoader text="sm" bg="primary" width="13%" />
    </div>
  );
}
