"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Link, useRouter } from "i18n/navigation";
import zxcvbn from "zxcvbn";

import {
  Button,
  Input,
  PUBLIC_ROUTES_CONFIG,
  useToast,
  west__arror_r_400,
} from "6_shared";
import IconButton from "@/6_shared/ui/components/icon-button";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Reset password toekn
  const token = searchParams.get("token");
  const { addToast } = useToast();

  // State for managing form
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect for checking if token exist
  useEffect(() => {
    if (!token) {
      addToast("No reset token found.", "error");
      router.push(PUBLIC_ROUTES_CONFIG.login);
    }
  }, [token, router, addToast]);

  // Logic for reseting password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if all inputs are entered
    if (!password || !repeatPassword) {
      setError("All inputs need to be filled.");
      setIsLoading(false);
      return;
    }

    // Check if passwords metch
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Check if password is strong enough
    if (zxcvbn(password).score < 3) {
      setError("Password is too weak.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      addToast("Password reset successfully!", "success");
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
      addToast("Failed to reset password.", "error");
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

      {/*_TITLE_*/}
      <div className="flex flex-col gap-2">
        <div className=" text-h5 text-primary">Enter your new password</div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          {/*_PASSWORD INPUT_*/}
          <Input
            placeholder={"Password"}
            value={password}
            setValue={setPassword}
            disabled={isLoading}
            type="password"
            passwordStrength={true}
          />
          {/*_REPEAT PASSWORD INPUT_*/}
          <Input
            placeholder={"Repeat password"}
            value={repeatPassword}
            setValue={setRepeatPassword}
            disabled={isLoading}
            type="password"
            passwordStrength={true}
          />
        </div>

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

      {/*_DON'T HAVE AN ACCOUNT_*/}
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
