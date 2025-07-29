"use client";

import { useState } from "react";
import { useRouter } from "i18n/navigation";

import { useToast } from "@scn_components/toast/ToastProvider";
import { Button, IconTemplate } from "6_shared";
import { west__arror_r_400 } from "@scn/svgPaths";
import LoginInput from "2_Pages/login_page/LoginInput";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      addToast("Check your email for a reset link.", "success");
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
          Enter your email to get password reset url.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <LoginInput
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
    </div>
  );
}
