"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Toast from "./Toast";
import { createPortal } from "react-dom";

export interface ToastMessage {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextType {
  addToast: (message: string, type: ToastMessage["type"]) => void;
}

const ToastContext = React.createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be within a ToastProvider");
  }

  return context;
};

export function ToastProvider({ children }: React.PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);

  const [toastQueue, setToastQueue] = useState<ToastMessage[]>([]);
  const [activeToast, setActiveToast] = useState<ToastMessage | null>(null);

  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  const toastId = useRef<number>(0);

  // UseEffect for finding toast-rot, place where toasts will be displayed
  useEffect(() => {
    setIsMounted(true);

    if (typeof document !== "undefined") {
      let root = document.getElementById("toast-root");

      if (!root) {
        root = document.createElement("div");
        root.setAttribute("id", "toast-root");
        document.body.appendChild(root);
      }

      setPortalRoot(root);
    }
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastMessage["type"]) => {
      const id = toastId.current++;
      setToastQueue((prevQueue) => [...prevQueue, { id, message, type }]);
    },
    []
  );

  // useEffect for managing toast queue
  useEffect(() => {
    if (!activeToast && toastQueue.length > 0) {
      const [nextToast, ...restOfQueue] = toastQueue;
      setActiveToast(nextToast);
      setToastQueue(restOfQueue);
    }
  }, [activeToast, toastQueue]);

  // useEffect for managing active toast
  useEffect(() => {
    if (!activeToast) {
      return;
    }

    // Timer for removin active toast
    const timer = setTimeout(() => {
      setActiveToast(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeToast]);

  const handleClose = () => {
    setActiveToast(null);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {isMounted &&
        portalRoot &&
        createPortal(
          <div className="fixed w-full top-0 z-50 flex justify-center mt-4 ">
            {activeToast && (
              <Toast
                key={activeToast.id}
                message={activeToast.message}
                type={activeToast.type}
                onClose={handleClose}
              />
            )}
          </div>,
          portalRoot
        )}
    </ToastContext.Provider>
  );
}
