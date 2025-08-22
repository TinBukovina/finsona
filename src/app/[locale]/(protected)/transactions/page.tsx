import {
  add_r_400,
  IconTemplate,
  keyboard_arrow_down_r_400,
  search_r_400,
} from "@/6_shared";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-6 w-full h-full px-6 py-4">
      {/*TITLE*/}
      <h4 className="text-h4 font-bold">Transaction page</h4>

      <div className="flex flex-col gap-3">
        {/*SEARCH AND ADD BTN*/}
        <div className="flex justify-between items-center">
          {/*SEARCH*/}
          <div className="flex gap-1 px-4 py-2 pr-20 border border-border rounded-max text-muted-foreground fill-primary">
            <IconTemplate svg={search_r_400()} width="24px" height="24px" />
            Search transactions by description
          </div>
          {/*ADD BTN*/}
          <div className="px-4 py-2 bg-primary rounded-max text-primary-foreground font-semibold">
            Add
          </div>
        </div>

        {/*FILTER SECTION*/}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 pr-3 bg-transparent border border-border rounded-max fill-foreground">
            Type
            <IconTemplate
              svg={keyboard_arrow_down_r_400()}
              width="24px"
              height="24px"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 pr-3 bg-transparent border border-border rounded-max fill-foreground">
            Category
            <IconTemplate
              svg={keyboard_arrow_down_r_400()}
              width="24px"
              height="24px"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 pl-2  bg-transparent border border-border rounded-max fill-foreground">
            <IconTemplate svg={add_r_400()} width="24px" height="24px" />
            Add filter
          </div>
        </div>
      </div>

      {/*TABLE*/}
      <div className="border border-border rounded-card">
        {/*TABLE HEADER*/}
        <div></div>

        {/*TABLE BODY*/}
        <div>TABLE BODY</div>

        {/*TABLE FOOTER*/}
        <div>FOOTER</div>
      </div>
    </div>
  );
}
