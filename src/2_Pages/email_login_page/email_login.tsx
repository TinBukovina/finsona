"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";

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

export default function EmailLoginPage() {
  const t = useTranslations("email_login_page");

  const router = useRouter();

  const [email, setEmail] = useState<string>("tinbukovina1c@gmail.com");

  const [step, setStep] = useState<"one" | "two">("one");

  // Step Two return UI
  if (step === "two") {
    return (
      <div className="w-100% h-dvh flex items-center justify-center overflow-hidden">
        {/*_LOG IN CARD_*/}
        <div
          className={
            "h-dvh " +
            "xs:h-fit xs:border xs:border-solid xs:border-border xs:rounded-card xs:min-w-min xs:max-w-sm " +
            "relative flex flex-col justify-center gap-6 w-full bg-card p-4 fill-card-foreground text-card-foreground"
          }
        >
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

            {/*_TITLE*/}
            <div className="text-center text-h5 xs:text-left">
              {t("enter_passcode_title")}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {/*_PASSCODE INPUT_*/}
            <InputOTP maxLength={6}>
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
          </div>
        </div>
      </div>
    );
  } else {
    // Step one return UI
    return (
      <div className="w-100% h-dvh flex items-center justify-center overflow-hidden">
        {/*_LOG IN CARD_*/}
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
          />

          {/*_LOGIN BUTTON_*/}
          <Button
            onClick={() => setStep((prev) => (prev === "one" ? "two" : "one"))}
          >
            {t("send_passcode_btn")}
          </Button>
        </div>
      </div>
    );
  }
}
