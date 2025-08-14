"use client";

import React, { useState } from "react";
import { useRouter, Link } from "i18n/navigation";
import { useTranslations } from "next-intl";

import {
  Button,
  Input,
  PRIVATE_ROUTES_CONFIG,
  PUBLIC_ROUTES_CONFIG,
  useToast,
} from "6_shared";

export function LoginForm({}) {
  const router = useRouter();

  const t = useTranslations("login_page");
  const tError = useTranslations("auth_err_msgs");

  const { addToast } = useToast();

  // State for managing form
  const [email, setEmail] = useState<string>("tinbukovina1c@gmail.com");
  const [password, setPassword] = useState<string>("Testuser123!");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function for handling login logic
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Check if all inputs are entered
    if (!email || !password) {
      setError(tError("error_missing_inputs"));
      setIsLoading(false);
      return;
    }

    // Check if email is vaild
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(tError("error_invalid_email"));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("1");
      if (response.ok) {
        console.log("2");
        router.push(PRIVATE_ROUTES_CONFIG.budget);
      } else {
        console.log("3");
        const responseData = await response.json();
        addToast(
          responseData.message || tError("error_server_generic"),
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      addToast(tError("error_network"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 text-card-foreground"
    >
      {/*_TITLE_*/}
      <div className="text-h6">{t("login_sub_title")}</div>

      <div className="flex flex-col gap-2">
        {/*_EMAIL_*/}
        <Input
          placeholder={t("email_input")}
          value={email}
          setValue={setEmail}
          disabled={isLoading}
          type="email"
        />
        {/*_PASSWORD_*/}
        <Input
          placeholder={t("password_input")}
          value={password}
          setValue={setPassword}
          type="password"
          disabled={isLoading}
        />
        {/*_FORGOT PASSWORD LINK_*/}
        <Link
          href={PUBLIC_ROUTES_CONFIG.forgot_password}
          className="w-fit text-sm text-primary hover:underline focus:outline-none focus:underline active:scale-95"
        >
          {t("forgot_password")}
        </Link>
      </div>

      {/*_LOGIN BUTTON_*/}
      <Button disabled={isLoading}>
        {isLoading ? t("logingin_in") : t("login_btn")}
      </Button>

      {/*_Display error_*/}
      {error ? (
        <p className="text-sm text-muted-foreground text-center mt-2">
          {error}
        </p>
      ) : (
        <p className="invisible text-sm mt-2">v</p>
      )}
    </form>
  );
}
