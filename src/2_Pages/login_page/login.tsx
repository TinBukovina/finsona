"use client";

import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import ButtonWithIcon from "./ButtonWithIcon";
import { stacked_email_r_400 } from "@scn/svgPaths";
import LoginInput from "./LoginInput";
import { Link, useRouter } from "i18n/navigation";
import { Button } from "@scn_components/button";

export default function LoginPage() {
  const t = useTranslations("login_page");
  const router = useRouter();

  // State for managing form
  const [email, setEmail] = useState<string>("test@gmail.com");
  const [password, setPassword] = useState<string>("password");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const stackedEmailSvgInfoRef = useRef(stacked_email_r_400());

  // Function taht runs when user clicks login btn
  async function handleLoginBtnClicked(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    console.log(email, password);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const errorData = await response.text();
        setError(errorData || "There was a error while trying to log in.");
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
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
        {/*_LOG IN WITH EMAIL OPTION_*/}
        <ButtonWithIcon
          svgInfo={{
            path: stackedEmailSvgInfoRef.current.path,
            viewBox: stackedEmailSvgInfoRef.current.viewBox,
          }}
        >
          {t("email_login_btn")}
        </ButtonWithIcon>

        {/*_SEPARATION ELEMENT_*/}
        <div className="flex items-center justify-center gap-2">
          <div className="h-[1px] w-full bg-border"></div>
          <div className="text-sm text-muted-foreground">OR</div>
          <div className="h-[1px] w-full bg-border"></div>
        </div>

        {/*_NORMAL LOGIN SECTION_*/}
        <form
          onSubmit={handleLoginBtnClicked}
          className="flex flex-col gap-4 text-card-foreground"
        >
          {/*_TITLE_*/}
          <div className="text-h6">{t("login_sub_title")}</div>
          {/*_INPUTS AND FORGOT PASSWORD LINK_*/}
          <div className="flex flex-col gap-2">
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
            <Link
              href={"/forgot-password"}
              className="w-fit text-sm text-primary hover:underline focus:outline-none focus:underline"
            >
              {t("forgot_password")}
            </Link>
          </div>
          {/*_LOGIN BUTTON_*/}
          <Button>{t("login_btn")}</Button>
        </form>

        {/*_DON'T HAVE AN ACCOUNT TEXT_*/}
        <div className="flex flex-col gap-0 items-center text-sm text-center">
          <p>{t("dont_have_account")}</p>
          <Link
            href={"/signup"}
            className="w-fit text-primary hover:underline focus:outline-none focus:underline"
          >
            {t("signup_link")}
          </Link>
        </div>
      </div>
    </div>
  );
}
