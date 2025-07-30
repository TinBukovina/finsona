"use client";

import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import { Link, useRouter } from "i18n/navigation";
import zxcvbn from "zxcvbn";

import { Button } from "@scn_components/button";
import { IconTemplate, SpinnerLoader } from "6_shared";
import { stacked_email_r_400 } from "@scn/svgPaths";
import LoginInput from "2_Pages/login_page/LoginInput";
import { useToast } from "@scn_components/toast/ToastProvider";

export default function SignupPage() {
  const t = useTranslations("signup_page");

  const router = useRouter();

  const { addToast } = useToast();

  // State for managing form
  const [firstName, setFirstName] = useState<string>("Tin");
  const [secondName, setSecondName] = useState<string>("Bukovina");
  const [email, setEmail] = useState<string>("test1@gmail.com");
  const [password, setPassword] = useState<string>("Testuser123!");
  const [repeatPassword, setRepeatPassword] = useState<string>("Testuser123!");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State for managing form setps
  const [isConformationStarted, setIsConformationStarted] = useState(false);

  const emailSvgRef = useRef(stacked_email_r_400());

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Check if all fields are filled
    if (!firstName || !secondName || !email || !password || !repeatPassword) {
      setError(t("error_missing_inputs"));
      setIsLoading(false);
      return;
    }

    // Check if email is valid
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t("error_invalid_email"));
      setIsLoading(false);
      return;
    }

    // Check if passwords metch
    if (password !== repeatPassword) {
      setError(t("error_passwords_not_match"));
      setIsLoading(false);
      return;
    }

    // Check if password is strong enough
    if (zxcvbn(password).score < 3) {
      setError(t("error_weak_password"));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          fullName: `${firstName} ${secondName}`,
        }),
      });

      if (response.ok) {
        setIsConformationStarted(true);
      } else {
        const responseData = await response.json();

        addToast(responseData.message || t("error_server_generic"), "error");
      }
    } catch (error) {
      console.log(error);
      addToast(t("error_network"), "error");
    } finally {
      setIsLoading(false);
    }
  }

  // Checking if confirmation email was sent to display right UI
  if (isConformationStarted) {
    return (
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

        <Button onClick={() => router.push("/auth/login")}>OK</Button>
      </div>
    );
  }

  // Default UI for signup
  return (
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

      {/*SIGNUP FORM SECTION_*/}
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-4 text-card-foreground"
      >
        {/*_TITLE_*/}
        <div className="text-h6">{t("signup_sub_title")}</div>

        {/*_INPUTS AND FORGOT PASSWORD LINK_*/}
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <LoginInput
              placeholder={t("first_name_input")}
              value={firstName}
              setValue={setFirstName}
              disabled={isLoading}
            />
            <LoginInput
              placeholder={t("last_name_input")}
              value={secondName}
              setValue={setSecondName}
              disabled={isLoading}
            />
          </div>
          <LoginInput
            placeholder={t("email_input")}
            value={email}
            setValue={setEmail}
            disabled={isLoading}
          />
          <LoginInput
            placeholder={t("password_input")}
            value={password}
            setValue={setPassword}
            type="password"
            passwordStrength={true}
            disabled={isLoading}
          />
          <LoginInput
            placeholder={t("repeat_password_input")}
            value={repeatPassword}
            setValue={setRepeatPassword}
            type="password"
            passwordStrength={true}
            disabled={isLoading}
          />
        </div>
        {/*_SINGUP BUTTON_*/}
        <Button disabled={isLoading}>{t("signup_btn")}</Button>
      </form>

      {/*ERROR*/}
      <p
        className={`text-sm text-muted-foreground text-center ${
          error ? "visible" : "invisible"
        }`}
      >
        {error ? error : "error"}
      </p>

      {/*_ALREADY HAVE AN ACCOUNT_*/}
      <div className="flex flex-col gap-0 items-center text-sm text-center">
        <p>{t("already_have_an_account")}</p>
        <Link
          href={"/auth/login"}
          className="w-fit text-primary hover:underline focus:outline-none focus:underline"
        >
          {t("login_link")}
        </Link>
      </div>
    </div>
  );
}
