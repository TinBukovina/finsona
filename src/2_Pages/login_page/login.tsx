import { useTranslations } from "next-intl";
import React from "react";
import { Link } from "i18n/navigation";

import ButtonWithIcon from "./ButtonWithIcon";
import { stacked_email_r_400 } from "@scn/svgPaths";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  const t = useTranslations("login_page");

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
      {/*_LOG IN WITH EMAIL OPTION_*/}
      <ButtonWithIcon
        svgInfo={{
          path: stacked_email_r_400().path,
          viewBox: stacked_email_r_400().viewBox,
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

      {/*_LOGIN FORM SECTION_*/}
      <LoginForm />

      {/*_DON'T HAVE AN ACCOUNT TEXT_*/}
      <div className="flex flex-col gap-0 items-center text-sm text-center">
        <p>{t("dont_have_account")}</p>
        <Link
          href={"/signup"}
          className="w-fit text-primary hover:underline focus:outline-none focus:underline active:scale-95"
        >
          {t("signup_link")}
        </Link>
      </div>
    </div>
  );
}
