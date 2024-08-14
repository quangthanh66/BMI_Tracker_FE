import AUTH_API from "@app/api/auth";
import USERS_API from "@app/api/users";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { BaseSelect } from "@app/components/common/selects/BaseSelect/BaseSelect";
import * as Auth from "@app/components/layouts/AuthLayout/AuthLayout.styles";
import { setUserProfile } from "@app/store/slices/appSlice";
import { USER_ROLES_ENUM } from "@app/utils/constant";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./LoginForm.styles";

interface LoginFormData {
  email: string;
  password: string;
  role: string;
}

export const initValues: LoginFormData = {
  email: "admin@gmail.com",
  password: "As123456@",
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
          {/* <Auth.Text>
            {t("login.noAccount")}{" "}
            <Link to="/auth/sign-up">
              <Auth.LinkText>{t("common.here")}</Auth.LinkText>
            </Link>
          </Auth.Text> */}

          <Auth.ActionsWrapper>
            <Link to="/auth/forgot-password">
              <S.ForgotPasswordText>
                {t("common.forgotPass")}
              </S.ForgotPasswordText>
            </Link>
          </Auth.ActionsWrapper>
        </Auth.FooterWrapper>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
