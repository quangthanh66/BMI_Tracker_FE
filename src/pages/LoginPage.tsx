import React from "react";
import { useTranslation } from "react-i18next";
import { LoginForm } from "@app/components/auth/LoginForm/LoginForm";
import { PageTitle } from "@app/components/common/PageTitle/PageTitle";
import { LoginWrapper } from "@app/components/layouts/AuthLayout/AuthLayout.styles";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t("common.login")}</PageTitle>

      <LoginWrapper>
        <LoginForm />
      </LoginWrapper>
    </>
  );
};

export default LoginPage;
