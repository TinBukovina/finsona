import React from "react";
import Loader from "./loading";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-dvh flex items-center justify-center overflow-hidden">
      {children}
    </div>
  );
}
