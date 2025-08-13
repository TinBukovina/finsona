"use client";

import React, { useState } from "react";

import { Button, useToast } from "@/6_shared";

export interface FormDataInterface {
  email: string;
  fullName: string;
}

const initialFormData = {
  email: "tinbukovina1c@gmail.com",
  fullName: "Tin Bukovina",
};

let formCopyBeforeEditing = { ...initialFormData };

export default function PersonalDetailsCard() {
  const { addToast } = useToast();

  const [formData, setFormData] = useState<FormDataInterface>(initialFormData);

  const [editingMode, setEditingMode] = useState<boolean>(false);

  function changeSingleFormData(field: keyof FormDataInterface, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handlePersonalDetailsChange() {
    console.log("Saving changes...");
    try {
      const response = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save changes.");
      }

      addToast("Profile updated!", "success");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save changes.";

      addToast(errorMessage, "error");
    }
  }

  return (
    <div className="flex flex-col gap-5 p-4 bg-card border border-border rounded-card">
      {/*TITLE*/}
      <h2 className="text-h6 text-card-foreground font-semibold">
        Personal details
      </h2>

      {/*OPTIONS*/}
      <div className="flex flex-col gap-3">
        <div className="flex gap-4 items-center">
          <label>Email:</label>
          <input
            className={
              `block px-3 py-1 text-muted-foreground border-${false ? "border" : "transparent transparent pointer-events-none"} border rounded-max outline-1 outline-transparent` +
              " " +
              "focus:outline-primary focus:border-transparent disabled:pointer-events-none disabled:opacity-50"
            }
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => console.log(e.target.value)}
            size={formData.email.length > 0 ? formData.email.length - 2 : 20}
          />
        </div>
        <div className="flex gap-4 items-center">
          <label>Name and surname:</label>
          <input
            className={
              `block px-3 py-1 text-muted-foreground border-${editingMode ? "border" : "transparent pointer-events-none"} border rounded-max outline-1 outline-transparent` +
              " " +
              `focus:outline-primary focus:border-transparent disabled:pointer-events-none disabled:opacity-50`
            }
            placeholder="Full name"
            value={formData.fullName}
            onChange={(e) => changeSingleFormData("fullName", e.target.value)}
            size={
              formData.fullName.length > 0 ? formData.fullName.length - 4 : 20
            }
          />
        </div>
      </div>

      {editingMode ? (
        <div className="flex gap-4">
          <Button className="w-fit" onClick={handlePersonalDetailsChange}>
            Save
          </Button>
          <Button
            variant="secondary"
            className="w-fit"
            onClick={() => {
              setFormData(formCopyBeforeEditing);
              setEditingMode(false);
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          variant="secondary"
          className="w-fit"
          onClick={() => {
            formCopyBeforeEditing = { ...formData };
            setEditingMode(true);
          }}
        >
          Edit
        </Button>
      )}
    </div>
  );
}
