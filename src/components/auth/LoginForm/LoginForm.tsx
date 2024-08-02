import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import * as S from "./LoginForm.styles";
import * as Auth from "@app/components/layouts/AuthLayout/AuthLayout.styles";
import { useMutation, useQuery } from "@tanstack/react-query";
import AUTH_API from "@app/api/auth";
import { message } from "antd";
import { PAGE_ROUTES } from "@app/utils/router";
import { USER_ROLES_ENUM } from "@app/utils/constant";
import { useDispatch } from "react-redux";
import { setUserProfile } from "@app/store/slices/appSlice";
import { BaseSelect } from "@app/components/common/selects/BaseSelect/BaseSelect";
import { UserProfileResponse } from "@app/api/users/type";
import USERS_API from "@app/api/users";

interface LoginFormData {
  email: string;
  password: string;
  role: string;
}

export const initValues: LoginFormData = {
  email: "admin@gmail.com",
  password: "1",
  role: USER_ROLES_ENUM.ROLE_ADMIN,
};

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  const { refetch: getUserProfile } = useQuery(
    ["get-user-profile"],
    USERS_API.GET_PROFILE,
    {
      enabled: false,
      onSuccess: (response: any) => {
        dispatch(setUserProfile(response));

        response.roleNames.includes(USER_ROLES_ENUM.ROLE_MANAGER)
          ? navigate("/profile/personal-info")
          : navigate("/profile/personal-info");
      },
    }
  );

  const { isLoading, mutate } = useMutation(AUTH_API.LOGIN_ACCOUNT, {
    onSuccess: (response: any) => {
      localStorage.setItem("accessToken", response.accessToken);
      getUserProfile();
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Your account is invalid. Please try again",
      });
    },
  });

  const handleSubmit = (values: LoginFormData) => {
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
        <Auth.FormTitle>{t("common.login")}</Auth.FormTitle>
        <S.LoginDescription>{t("login.loginInfo")}</S.LoginDescription>
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
        {/* <Auth.ActionsWrapper>
          <BaseForm.Item name="loginAdmin" valuePropName="checked" noStyle>
            <Auth.FormCheckbox>
              <S.LoginRoleText>{t('login.loginAdmin')}</S.LoginRoleText>
            </Auth.FormCheckbox>
          </BaseForm.Item>
          <BaseForm.Item name="loginAdvisor" valuePropName="checked" noStyle>
            <Auth.FormCheckbox>
              <S.LoginRoleText>{t('login.loginAdvisor')}</S.LoginRoleText>
            </Auth.FormCheckbox>
          </BaseForm.Item>
          <Link to="/auth/forgot-password">
            <S.ForgotPasswordText>{t('common.forgotPass')}</S.ForgotPasswordText>
          </Link>
        </Auth.ActionsWrapper> */}

        <Auth.FormItem
          name="role"
          label="Role"
          rules={[{ required: true, message: t("common.requiredField") }]}
        >
          <BaseSelect
            defaultValue={USER_ROLES_ENUM.ROLE_ADMIN}
            options={[
              { label: "Admin", value: USER_ROLES_ENUM.ROLE_ADMIN },
              { label: "Manager", value: USER_ROLES_ENUM.ROLE_MANAGER },
            ]}
          />
        </Auth.FormItem>
        <BaseForm.Item noStyle>
          <Auth.SubmitButton
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            {t("common.login")}
          </Auth.SubmitButton>
        </BaseForm.Item>
        <Auth.FooterWrapper>
          <Auth.Text>
            {t("login.noAccount")}{" "}
            <Link to="/auth/sign-up">
              <Auth.LinkText>{t("common.here")}</Auth.LinkText>
            </Link>
          </Auth.Text>
        </Auth.FooterWrapper>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
