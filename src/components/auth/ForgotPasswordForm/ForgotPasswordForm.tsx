import AUTH_API from "@app/api/auth";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import * as Auth from "@app/components/layouts/AuthLayout/AuthLayout.styles";
import { useMutation } from "@tanstack/react-query";
import { Form, message } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as S from "./ForgotPasswordForm.styles";

const initValues = {
  email: "bmitracker@gmail.com",
};

export const ForgotPasswordForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading: isLoadingForgotPassword, mutate: forgotPassword } =
    useMutation(AUTH_API.FORGOT_PASSWORD, {
      onError: () =>
        messageApi.open({
          type: "error",
          content: "Send email to reset password is failed",
        }),

      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Your request is sent ",
        }),
          navigate("/auth/login");
      },
    });

  const handleSubmit = (values: { email: string }) =>
    forgotPassword(values.email);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {contextHolder}
      <Auth.FormWrapper>
        <BaseForm
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark="optional"
          initialValues={initValues}
          form={form}
        >
          <Auth.BackWrapper onClick={() => navigate(-1)}>
            <Auth.BackIcon />
            {t("common.back")}
          </Auth.BackWrapper>
          <Auth.FormTitle>{t("common.resetPassword")}</Auth.FormTitle>
          <S.Description>{t("forgotPassword.description")}</S.Description>
          <Auth.FormItem
            name="email"
            label={t("common.email")}
            rules={[{ required: true, message: t("common.emailError") }]}
          >
            <Auth.FormInput placeholder={t("common.email")} />
          </Auth.FormItem>
          <BaseForm.Item noStyle>
            <S.SubmitButton
              type="primary"
              htmlType="submit"
              loading={isLoadingForgotPassword}
            >
              {t("forgotPassword.sendInstructions")}
            </S.SubmitButton>
          </BaseForm.Item>
        </BaseForm>
      </Auth.FormWrapper>
    </div>
  );
};
