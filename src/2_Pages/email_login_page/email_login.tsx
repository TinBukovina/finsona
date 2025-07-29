"use client";

import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useState } from "react";

import { Button } from "@scn_components/button";
import { useRouter } from "i18n/navigation";
import { IconTemplate } from "6_shared";
import { west__arror_r_400 } from "@scn/svgPaths";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@scn_components/input-otp";
import LoginInput from "2_Pages/login_page/LoginInput";
import { useToast } from "@scn_components/toast/ToastProvider";

export default function EmailLoginPage() {
  const t = useTranslations("email_login_page");
  const { addToast } = useToast();

  const router = useRouter();

  const [email, setEmail] = useState<string>("tinbukovina1c@gmail.com");
  const [passcode, setPasscode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState<"email" | "passcode">("email");

  const handleRequestPasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/request-passcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        addToast(responseData.message || "Could not send passcode.", "error");
      } else {
        addToast("Passcode sent to your email!", "success");
        setStep("passcode");
      }
    } catch (error) {
      console.log(error);
      addToast("Could not send passcode.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Definiramo asinkronu funkciju unutar efekta
    const verify = async () => {
      // Provjera je dvostruka, ali osigurava da se ne pokrene ako se stanje promijeni tijekom izvršavanja
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
          addToast(responseData.message || "Invalid passcode.", "error");
          setPasscode(""); // Resetiraj kod u slučaju greške
        } else {
          addToast("Login successful!", "success");
          router.refresh();
        }
      } catch (error) {
        console.log(error);
        addToast("Invalid or expired passcode.", "error");
        setPasscode("");
      } finally {
        setIsLoading(false);
      }
    };

    // Pozivamo funkciju samo ako su uvjeti zadovoljeni
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
              path={west__arror_r_400().path}
              viewBox={west__arror_r_400().viewBox}
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
              path={west__arror_r_400().path}
              viewBox={west__arror_r_400().viewBox}
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

        <LoginInput
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
    );
  }
}
