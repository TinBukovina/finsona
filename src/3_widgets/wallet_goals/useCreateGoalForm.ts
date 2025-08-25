import { useCreateGoal, useGoals } from "@/5_entities";
import { useToast } from "@/6_shared";
import { useState } from "react";

interface UseCreateGoalFormProps {
  onSuccess: () => void;
}

export function useCreateGoalForm({ onSuccess }: UseCreateGoalFormProps) {
  const { addToast } = useToast();

  const { createGoal, isCreating } = useCreateGoal();
  const { mutate: mutateGoals } = useGoals();

  const [name, setName] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<string>("");
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amountNumber = parseFloat(targetAmount.replace(",", "."));
    if (!name.trim() || !targetAmount.trim() || !targetDate) {
      addToast("Please fill all fields.", "error");
      return;
    }

    if (isNaN(amountNumber) || amountNumber <= 0) {
      addToast("Please enter a valid target amount.", "error");
      return;
    }
    if (targetDate <= new Date()) {
      addToast("Target date must be in the future.", "error");
      return;
    }

    try {
      await createGoal({
        name: name.trim(),
        target_amount: amountNumber,
        target_date: targetDate,
      });

      addToast("Goal created successfully!", "success");
      mutateGoals();
      onSuccess();
    } catch (error) {
      console.log(error);
      addToast("Something went wron.", "error");
    }
  };

  return {
    // State
    name,
    targetAmount,
    targetDate,
    isLoading: isCreating,
    // Setters
    setName,
    setTargetAmount,
    setTargetDate,
    // Actions
    handleSubmit,
  };
}
