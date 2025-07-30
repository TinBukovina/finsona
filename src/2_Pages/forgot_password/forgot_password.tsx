"use client";

import { useState } from "react";
import { Link, useRouter } from "i18n/navigation";

import { Button, IconTemplate, Input, PUBLIC_ROUTES_CONFIG } from "6_shared";
import { useToast } from "@/6_shared/ui/toast";
import { west__arror_r_400 } from "@/6_shared/lib/svgPaths";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

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
      <div className={"flex flex-col gap-4"}>
        <div
          className={
            "absolute top-5 left-5 " +
            "xs:static " +
            "flex items-center justify-center p-1  w-fit rounded-max hover:bg-accent hover:text-accent-foreground hover:fill-accent-foreground hover:cursor-pointer active:scale-85 hover:scale-110 transition-all"
          }
          onClick={() => router.back()}
        >
          <IconTemplate
            path={west__arror_r_400().path}
            viewBox={west__arror_r_400().viewBox}
            width="24px"
            height="24px"
          />
        </div>
      </div>

      {/*_TITLE AND DESCRIPTION_*/}
      <div className="flex flex-col gap-2">
        <div className=" text-h5 text-primary">Resset your password</div>
        <div className="text-normal text-muted-foreground">
          Enter your email to get password reset link.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

      <p
        className={`text-center text-sm text-muted-foreground ${error ? "visible" : "invisible"}`}
      >
        {error ? error : "error"}
      </p>

      <div className="flex flex-col gap-0 items-center text-sm text-center">
        <p>{"Don't have an account?"}</p>
        <Link
          href={"/auth/login"}
          className="w-fit text-primary hover:underline focus:outline-none focus:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
