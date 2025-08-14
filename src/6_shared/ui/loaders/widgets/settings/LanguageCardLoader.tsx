import React from "react";
import DivLoader from "../../components/DivLoader";
import TextLoader from "../../components/TextLoader";
import ButtonLoader from "../../components/ButtonLoader";

export default function LanguageCardLoader() {
  return (
    <DivLoader
      width="100%"
      height="fit-content"
      rounded="card"
      border
      bg="secondary"
    >
      <div className="flex flex-col gap-5">
        {/*TITLE*/}
        <TextLoader width="12%" bg="foreground" text="h6" className="py-1" />

        {/*DESCRIPTION*/}
        <TextLoader width="41%" bg="foreground" text="h6" />

        <ButtonLoader width="12%" height="36px" bg="input" border />
      </div>
    </DivLoader>
  );
}
