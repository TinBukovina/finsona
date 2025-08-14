"use client";

import React from "react";
import { CreateWalletForm } from "./CreateWalletForm";
import Modal from "@/6_shared/ui/modal/Modal";

interface CreateWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateWalletModal({ isOpen, onClose }: CreateWalletModalProps) {
  return (
    <Modal open={isOpen}>
      <div
        className="fixed inset-0 bg-background/60 flex items-center justify-center"
        onClick={onClose}
      >
        <CreateWalletForm onClose={onClose} />
      </div>
    </Modal>
  );
}
