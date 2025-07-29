import React from "react";

export default function SkeletonLoader({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-max  ${className}`} />;
}
