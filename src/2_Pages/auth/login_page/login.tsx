"use client";

import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { Link } from "i18n/navigation";
import { useSearchParams } from "next/navigation";

import { LoginForm } from "./LoginForm";
import {
  ButtonWithIcon,
  PUBLIC_ROUTES_CONFIG,
  stacked_email_r_400,
  useToast,
} from "6_shared";

export default function LoginPage() {
  const t = useTranslations("login_page");

  const { addToast } = useToast();

  const searchParams = useSearchParams();

  // useEffect for informating user is email verification succeeded
  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      addToast(t("verification_success"), "success");
    }

    if (searchParams.get("verified") === "verification-failed") {
      addToast("verification_fail", "error");
    }
  }, [searchParams, addToast, t]);

  return (
    <div
      className={
        "h-dvh " +
        "xs:h-fit xs:border xs:border-solid xs:border-border xs:rounded-card xs:min-w-min xs:max-w-sm " +
        "flex flex-col justify-center gap-6 w-full bg-card p-4"
      }
    >
      <div className="flex flex-col gap-2">
        {/*_TITLE_*/}
        <div className=" text-h5 text-primary">{t("title")}</div>
        {/*_DESCRIPTION_*/}
        <div className="text-normal text-muted-foreground">
          {t("description")}
        </div>
      </div>

      {/*_LOG IN WITH EMAIL BTN_*/}
      <ButtonWithIcon
        svgInfo={{
          path: stacked_email_r_400().path,
          viewBox: stacked_email_r_400().viewBox,
        }}
        href={PUBLIC_ROUTES_CONFIG.email_login}
      >
        {t("email_login_btn")}
      </ButtonWithIcon>

      {/*_SEPARATION ELEMENT_*/}
      <div className="flex items-center justify-center gap-2">
        <div className="h-[1px] w-full bg-border"></div>
        <div className="text-sm text-muted-foreground">OR</div>
        <div className="h-[1px] w-full bg-border"></div>
      </div>

      {/*_LOGIN FORM SECTION_*/}
      <LoginForm />

      {/*_DON'T HAVE AN ACCOUNT TEXT_*/}
      <div className="flex flex-col gap-0 items-center text-sm text-center">
        <p>{t("dont_have_account")}</p>
        <Link
          href={PUBLIC_ROUTES_CONFIG.signup}
          className="w-fit text-primary hover:underline focus:outline-none focus:underline active:scale-95"
        >
          {t("signup_link")}
        </Link>
      </div>
    </div>
  );
}
