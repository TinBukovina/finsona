"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "i18n/navigation";

import {
  Button,
  IconTemplate,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  PUBLIC_ROUTES_CONFIG,
  useToast,
  west__arror_r_400,
} from "6_shared";

export default function EmailLoginPage() {
  const t = useTranslations("email_login_page");
  const tError = useTranslations("auth_err_msgs");

  const { addToast } = useToast();

  const router = useRouter();

  // State for managing form
  const [email, setEmail] = useState<string>("tinbukovina1c@gmail.com");
  const [passcode, setPasscode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for managing form steps
  const [step, setStep] = useState<"email" | "passcode">("email");

  // logic for managing login with email
  const handleRequestPasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if all inputs are entered
    if (!email) {
      setError(tError("error_missing_inputs"));
      setIsLoading(false);
      return;
    }

    // Check if email is valid
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(tError("error_invalid_email"));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/request-passcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        addToast(responseData.message || tError("error_no_passcode"), "error");
      } else {
        addToast(t("passcode_sent"), "success");
        setStep("passcode");
      }
    } catch (error) {
      console.log(error);
      addToast(tError("error_no_passcode"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fucntion for verifying entered passcode
    const verify = async () => {
      if (passcode.length !== 6 || isLoading) return;

      setIsLoading(true);

      try {
        const response = await fetch("/api/auth/verify-passcode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, passcode }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          addToast(
            responseData.message || tError("error_invalid_passcode"),
            "error"
          );
          setPasscode("");
        } else {
          router.refresh();
          setTimeout(() => {
            addToast(t("login_success"), "success");
          }, 500);
        }
      } catch (error) {
        console.log(error);
        addToast(tError("error_invalid_passcode"), "error");
        setPasscode("");
      } finally {
        setIsLoading(false);
      }
    };

    // Automatically calling function when all 6 digits are entered
    if (passcode.length === 6 && !isLoading) {
      verify();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passcode, email, router, addToast]);

  // Step Two return UI
  if (step === "passcode") {
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
              svg={west__arror_r_400()}
              width="24px"
              height="24px"
            />
          </div>

          {/*_TITLE*/}
          <div className="text-center text-h5 xs:text-left">
            {t("enter_passcode_title")}
          </div>
        </div>

        <form className="flex flex-col gap-2">
          {/*_PASSCODE INPUT_*/}
          <InputOTP
            maxLength={6}
            value={passcode}
            onChange={(value) => setPasscode(value)}
            disabled={isLoading}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          {/*_LOGIN BUTTON_*/}
          <Button variant={"link"} className="mx-auto">
            {t("no_passcode_link")}
          </Button>
        </form>
      </div>
    );
  } else {
    // Step one return UI
    return (
      <div
        className={
          "h-dvh " +
          "xs:h-fit xs:border xs:border-solid xs:border-border xs:rounded-card xs:min-w-min xs:max-w-sm " +
          "relative flex flex-col justify-center gap-6 w-full bg-card p-4 fill-card-foreground"
        }
      >
        {/*_HEADER_SECTION: back button, title, description_*/}
        <div className={"flex flex-col gap-4"}>
          {/*_BACK ICON BUTTON_*/}
          <div
            className={
              "absolute top-5 left-5 " +
              "xs:static " +
              "flex items-center justify-center p-1  w-fit rounded-max hover:bg-accent hover:text-accent-foreground hover:fill-accent-foreground hover:cursor-pointer active:scale-85 hover:scale-110 transition-all"
            }
            onClick={() => router.back()}
          >
            <IconTemplate
              svg={west__arror_r_400()}
              width="24px"
              height="24px"
            />
          </div>

          {/*_TITLE AND DESCRIPTION_*/}
          <div className="flex flex-col gap-2">
            <div className=" text-h5 text-primary">{t("title")}</div>
            <div className="text-normal text-muted-foreground">
              {t("description")}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            placeholder={t("email_input")}
            value={email}
            setValue={setEmail}
            disabled={isLoading}
          />

          {/*_LOGIN BUTTON_*/}
          <Button onClick={handleRequestPasscode} disabled={isLoading}>
            {t("send_passcode_btn")}
          </Button>
        </div>

        <p
          className={`text-center text-sm text-muted-foreground ${error ? "visible" : "invisible"}`}
        >
          {error ? error : "error"}
        </p>

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
}
