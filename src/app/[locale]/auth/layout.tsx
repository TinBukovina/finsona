import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-dvh flex items-center justify-center overflow-hidden bg-card xs:bg-background">
      {children}
    </div>
  );
}
