"use client";

import React from "react";
import Modal from "@/6_shared/ui/modal/Modal";
import { CreateBudgetForm } from "./CreateBudgetForm";

interface CreateBudgetModalProps {
  isOpen: boolean;
  customMonth?: number | null;
  onClose: () => void;
}

export function CreateBudgetModal({
  isOpen,
  customMonth,
  onClose,
}: CreateBudgetModalProps) {
  return (
    <Modal open={isOpen}>
      <div
        className="fixed inset-0 bg-background/60 flex items-center justify-center"
        onClick={onClose}
      >
        <CreateBudgetForm customMonth={customMonth} onClose={onClose} />
      </div>
    </Modal>
  );
}
