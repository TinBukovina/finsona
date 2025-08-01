"use client";

import { useState } from "react";
import { Link, useRouter } from "i18n/navigation";

import {
  Button,
  Input,
  PUBLIC_ROUTES_CONFIG,
  useToast,
  west__arror_r_400,
} from "6_shared";
import IconButton from "@/6_shared/ui/components/icon-button";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const { addToast } = useToast();

  // State for managing the form
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Logic for handeling password reset
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if all inputs are entered
    if (!email) {
      setError("All inputs need to be filled.");
      setIsLoading(false);
      return;
    }

    // Check if email is valid
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email.");
      setIsLoading(false);
      return;
    }

    try {
      await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      addToast("Check your email for a reset link.", "success");
      router.push(PUBLIC_ROUTES_CONFIG.login);
    } catch (error) {
      console.error(error);
      addToast("Internal server error.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={
        "h-dvh " +
        "xs:h-fit xs:border xs:border-solid xs:border-border xs:rounded-card xs:min-w-min xs:max-w-sm " +
        "relative flex flex-col justify-center gap-6 w-full bg-card p-4 fill-card-foreground text-card-foreground"
      }
    >
      {/*_BACK ICON BUTTON_*/}
      <IconButton
        svgData={west__arror_r_400()}
        handleOnClick={() => router.back()}
      />

      <div className="flex flex-col gap-2">
        {/*_TITLE_*/}
        <div className=" text-h5 text-primary">Resset your password</div>
        {/*_DESCRIPTION_*/}
        <div className="text-normal text-muted-foreground">
          Enter your email to get password reset link.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/*_EMAIL INPUT_*/}
        <Input
          placeholder={"Email"}
          value={email}
          setValue={setEmail}
          disabled={isLoading}
        />

        {/*_LOGIN BUTTON_*/}
        <Button disabled={isLoading} className="w-full">
          Send reset link
        </Button>
      </form>

      {/*_ERROR DISPLAY_*/}
      <p
        className={`text-center text-sm text-muted-foreground ${error ? "visible" : "invisible"}`}
      >
        {error ? error : "error"}
      </p>

      {/*_ALREADY HAVE AN ACCOUNT_*/}
      <div className="flex flex-col gap-0 items-center text-sm text-center">
        <p>{"Don't have an account?"}</p>
        <Link
          href={PUBLIC_ROUTES_CONFIG.signup}
          className="w-fit text-primary hover:underline focus:outline-none focus:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
