import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps extends PropsWithChildren {
  open: boolean;
}

export default function Modal({ children, open }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    let portalRoot = document.getElementById("portal-root");

    if (!portalRoot) {
      portalRoot = document.createElement("div");
      portalRoot.id = "portal-root";
      document.body.appendChild(portalRoot);
    }

    return () => {
      if (portalRoot && portalRoot.children.length === 0) {
        document.body.removeChild(portalRoot);
      }
    };
  }, []);

  if (!open) {
    return null;
  }

  const portalRoot =
    typeof document !== "undefined"
      ? document.getElementById("portal-root")
      : null;

  return mounted && portalRoot ? createPortal(children, portalRoot) : null;
}
