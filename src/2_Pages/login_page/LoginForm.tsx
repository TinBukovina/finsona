"use client";
import React, { useState } from "react";
import { useRouter } from "i18n/navigation";
import LoginInput from "./LoginInput";
import { Link } from "i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "6_shared";
import Modal from "@scn_components/modal/Modal";
import { useToast } from "@scn_components/toast/ToastProvider";

export function LoginForm({}) {
  const router = useRouter();

  const t = useTranslations("login_page");

  const { addToast } = useToast();

  // State for handeling popup
  const [mountedWindow, setMountedWindow] = useState<boolean>(false);

  // State for managing form
  const [email, setEmail] = useState<string>("test@gmail.com");
  const [password, setPassword] = useState<string>("password");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function taht runs when user clicks login btn
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Check if all inputs are entered
    if (!email || !password) {
      setError(t("error_missing_inputs"));
      setIsLoading(false);
      return;
    }

    // Check if email is vaild
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t("error_invalid_email"));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const responseData = await response.json();
        addToast(responseData.message || t("error_server_generic"), "error");
      }
    } catch (error) {
      console.error(error);
      addToast(t("error_network"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 text-card-foreground"
    >
      <div className="text-h6">{t("login_sub_title")}</div>
      <div className="flex flex-col gap-2">
        {/*_EMAIL_*/}
        <LoginInput
          placeholder={t("email_input")}
          value={email}
          setValue={setEmail}
          disabled={isLoading}
          type="email"
        />
        {/*_PASSWORD_*/}
        <LoginInput
          placeholder={t("password_input")}
          value={password}
          setValue={setPassword}
          type="password"
          disabled={isLoading}
        />
        {/*_FORGOT PASSWORD LINK_*/}
        <Link
          href={"/forgot-password"}
          className="w-fit text-sm text-primary hover:underline focus:outline-none focus:underline active:scale-95"
        >
          {t("forgot_password")}
        </Link>
      </div>
      <Button disabled={isLoading}>
        {isLoading ? t("logingin_in") : t("login_btn")}
      </Button>
      {error && (
        <p className="text-sm text-destructive text-center mt-2">{error}</p>
      )}
    </form>
  );
}
