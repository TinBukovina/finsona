"use client";

import React from "react";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const toastConfig = {
  success: {
    icon: <CheckCircle className="h-5 w-5 text-success" />,
    style: "bg-popover border-border",
    progressStyle: "bg-success",
  },
  error: {
    icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
    style: "bg-popover border-border",
    progressStyle: "bg-destructive",
  },
  info: {
    icon: <Info className="h-5 w-5 text-primary" />,
    style: "bg-popover border-border",
    progressStyle: "bg-primary",
  },
};

export default function Toast({ message, type, onClose }: ToastProps) {
  const { icon, style, progressStyle } = toastConfig[type];

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-between w-full max-w-xs p-4 rounded-max shadow-lg border ${style}`}
      role="alert"
    >
      {/*_ICON AND MESSAGE_*/}
      <div className="flex items-center">
        {icon}
        <p className="ml-3 text-sm font-normal text-popover-foreground">
          {message}
        </p>
      </div>
      {/*_CLOS BTN_*/}
      <button
        onClick={onClose}
        className="ml-4 -mx-1.5 -my-1.5 bg-secondary text-secondary-foreground hover:text-accent-foreground rounded-lg focus:ring-2 focus:ring-ring p-1.5 hover:bg-accent inline-flex h-8 w-8 hover:cursor-pointer"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <X className="h-5 w-5" />
      </button>

      {/*_PROGRESS INDICATOR_*/}
      <div
        className={`absolute bottom-0 left-0 h-[2px] ${progressStyle}`}
        style={{ animation: "progress 5s linear forwards" }}
      />
    </div>
  );
}
