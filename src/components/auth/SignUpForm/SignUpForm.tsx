import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { useAppDispatch } from "@app/hooks/reduxHooks";
import { doSignUp } from "@app/store/slices/authSlice";
import { notificationController } from "@app/controllers/notificationController";
import { ReactComponent as GoogleIcon } from "@app/assets/icons/google.svg";
import { ReactComponent as FacebookIcon } from "@app/assets/icons/facebook.svg";
import * as Auth from "@app/components/layouts/AuthLayout/AuthLayout.styles";
import * as S from "./SignUpForm.styles";
import { useMutation } from "@tanstack/react-query";
import AUTH_API from "@app/api/auth";
import { BaseSelect } from "@app/components/common/selects/BaseSelect/BaseSelect";
import { USER_SEX_VALUES } from "@app/utils/constant";
import { SignUpAccountTypes } from "@app/api/auth/type";
import { message } from "antd";
import { PAGE_ROUTES } from "@app/utils/router";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initValues = {
  firstName: "Chris",
  lastName: "Johnson",
  email: "admin@gmail.com",
  password: "undefined",
  confirmPassword: "undefined",
  termOfUse: true,
};

export const SignUpForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation(AUTH_API.SIGN_UP_ACCOUNT, {
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Create a new account is successful",
      });

      navigate(PAGE_ROUTES.AUTH.LOGIN);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Your information is invalid. Please try again",
      });
    },
  });
  const { t } = useTranslation();

  const handleSubmit = (values: SignUpAccountTypes) => {
    mutate(values);
  };

  return (
    <Auth.FormWrapper>
      {contextHolder}
      <BaseForm
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark="optional"
        initialValues={initValues}
      >
        <S.Title>{t("common.signUp")}</S.Title>
        <Auth.FormItem
          name="fullName"
          label="Full name"
          rules={[{ required: true, message: t("common.requiredField") }]}
        >
          <Auth.FormInput placeholder="Please enter your full name" />
        </Auth.FormItem>
        <Auth.FormItem
          name="phoneNumber"
          label="Phone number"
          rules={[{ required: true, message: t("common.requiredField") }]}
        >
          <Auth.FormInput placeholder={"Please enter your phone number"} />
        </Auth.FormItem>
        <Auth.FormItem
          name="sex"
          label="Sex"
          rules={[{ required: true, message: t("common.requiredField") }]}
        >
          <BaseSelect
            options={USER_SEX_VALUES}
            placeholder={"Please choose your sex"}
          />
        </Auth.FormItem>
        <Auth.FormItem
          name="email"
          label={t("common.email")}
          rules={[
            { required: true, message: t("common.requiredField") },
            {
              type: "email",
              message: t("common.notValidEmail"),
            },
          ]}
        >
          <Auth.FormInput placeholder={t("common.email")} />
        </Auth.FormItem>
        <Auth.FormItem
          label={t("common.password")}
          name="password"
          rules={[{ required: true, message: t("common.requiredField") }]}
        >
          <Auth.FormInputPassword placeholder={t("common.password")} />
        </Auth.FormItem>
        <Auth.FormItem
          label={t("common.confirmPassword")}
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: t("common.requiredField") },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t("common.confirmPasswordError"))
                );
              },
            }),
          ]}
        >
          <Auth.FormInputPassword placeholder={t("common.confirmPassword")} />
        </Auth.FormItem>
        <Auth.ActionsWrapper>
          <BaseForm.Item name="termOfUse" valuePropName="checked" noStyle>
            <Auth.FormCheckbox>
              <Auth.Text>
                {t("signup.agree")}{" "}
                <Link to="/" target={"_blank"}>
                  <Auth.LinkText>{t("signup.termOfUse")}</Auth.LinkText>
                </Link>{" "}
                and{" "}
                <Link to="/" target={"_blank"}>
                  <Auth.LinkText>{t("signup.privacyOPolicy")}</Auth.LinkText>
                </Link>
              </Auth.Text>
            </Auth.FormCheckbox>
          </BaseForm.Item>
        </Auth.ActionsWrapper>
        <BaseForm.Item noStyle>
          <Auth.SubmitButton
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            {t("common.signUp")}
          </Auth.SubmitButton>
        </BaseForm.Item>
        <Auth.FooterWrapper>
          <Auth.Text>
            {t("signup.alreadyHaveAccount")}{" "}
            <Link to="/auth/login">
              <Auth.LinkText>{t("common.here")}</Auth.LinkText>
            </Link>
          </Auth.Text>
        </Auth.FooterWrapper>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
