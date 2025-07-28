"use client";

import { useTranslations } from "next-intl";
import React, { use, useRef, useState } from "react";
import { Link } from "i18n/navigation";

import LoginInput from "./login_page/LoginInput";
import { Button } from "@scn_components/button";
import { IconTemplate } from "6_shared";
import { stacked_email_r_400 } from "@scn/svgPaths";

export default function SignupPage() {
  const t = useTranslations("signup_page");

  // State for managing form
  const [firstName, setFirstName] = useState<string>("Tin");
  const [secondName, setSecondName] = useState<string>("Bukovina");
  const [email, setEmail] = useState<string>("test1@gmail.com");
  const [password, setPassword] = useState<string>("password");
  const [repeatPassword, setRepeatPassword] = useState<string>("password");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isConformationStarted, setIsConformationStarted] = useState(false);

  const emailSvgRef = useRef(stacked_email_r_400());

  // Checking if confirmation email was sent to display right UI
  if (isConformationStarted) {
    return (
      <div className="w-100% h-dvh flex items-center justify-center overflow-hidden">
        {/*_LOG IN CARD_*/}
        <div
          className={
            "h-dvh " +
            "xs:h-fit xs:border xs:border-solid xs:border-border xs:rounded-card xs:min-w-min xs:max-w-sm " +
            "flex flex-col justify-center gap-6 w-full bg-card p-4 fill-card-foreground"
          }
        >
          {/*_TITLE_*/}
          <div className=" text-h5 text-primary">{t("title")}</div>

          {/*_DECORATION ICON_*/}
          <div className="mx-auto fill-primary">
            <IconTemplate
              path={emailSvgRef.current.path}
              viewBox={emailSvgRef.current.viewBox}
              width="3rem"
              height="3rem"
            />
          </div>

          {/*_INFO SECTION_*/}
          <div className="flex flex-col gap-2 text-card-foreground">
            <p className="">{t("confirm_email_sub_title")}</p>
            <p className="text-sm text-muted-foreground">
              {t("confirm_email_description")}
            </p>
          </div>

          <Button onClick={() => setIsConformationStarted((prev) => !prev)}>
            OK
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-100% h-dvh flex items-center justify-center overflow-hidden">
      {/*_LOG IN CARD_*/}
      <div
        className={
          "h-dvh " +
          "xs:h-fit xs:border xs:border-solid xs:border-border xs:rounded-card xs:min-w-min xs:max-w-sm " +
          "flex flex-col justify-center gap-6 w-full bg-card p-4"
        }
      >
        {/*_TITLE AND DESCRIPTION_*/}
        <div className="flex flex-col gap-2">
          <div className=" text-h5 text-primary">{t("title")}</div>
          <div className="text-normal text-muted-foreground">
            {t("description")}
          </div>
        </div>

        {/*SIGNUP SECTION_*/}
        <div className="flex flex-col gap-4 text-card-foreground">
          {/*_TITLE_*/}
          <div className="text-h6">{t("signup_sub_title")}</div>
          {/*_INPUTS AND FORGOT PASSWORD LINK_*/}
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <LoginInput
                placeholder={t("first_name_input")}
                value={firstName}
                setValue={setFirstName}
              />
              <LoginInput
                placeholder={t("last_name_input")}
                value={secondName}
                setValue={setSecondName}
              />
            </div>
            <LoginInput
              placeholder={t("email_input")}
              value={email}
              setValue={setEmail}
            />
            <LoginInput
              placeholder={t("password_input")}
              value={password}
              setValue={setPassword}
              type="password"
            />
            <LoginInput
              placeholder={t("repeat_password_input")}
              value={repeatPassword}
              setValue={setRepeatPassword}
              type="password"
            />
          </div>
          {/*_LOGIN BUTTON_*/}
          <Button onClick={() => setIsConformationStarted((prev) => !prev)}>
            {t("signup_btn")}
          </Button>
        </div>

        {/*_ALREADY HAVE AN ACCOUNT_*/}
        <div className="flex flex-col gap-0 items-center text-sm text-center">
          <p>{t("already_have_an_account")}</p>
          <Link
            href={"/login"}
            className="w-fit text-primary hover:underline focus:outline-none focus:underline"
          >
            {t("login_link")}
          </Link>
        </div>
      </div>
    </div>
  );
}
