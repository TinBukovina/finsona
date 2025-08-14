import React from "react";
import DivLoader from "../../components/DivLoader";
import TextLoader from "../../components/TextLoader";

export default function ThemeCardLoader() {
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
        <TextLoader width="9%" bg="foreground" text="h6" className="py-1" />

        {/*DESCRIPTION*/}
        <TextLoader width="38%" bg="foreground" text="h6" />

        <div className="flex gap-6">
          <div className="flex flex-col gap-3 items-center">
            <DivLoader width="120px" height="90px" />
            <TextLoader width="50px" />
          </div>
          <div className="flex flex-col gap-3 items-center">
            <DivLoader width="120px" height="90px" />
            <TextLoader width="40px" />
          </div>
          <div className="flex flex-col gap-3 items-center">
            <DivLoader width="120px" height="90px" />
            <TextLoader width="65px" />
          </div>
        </div>
      </div>
    </DivLoader>
  );
}
