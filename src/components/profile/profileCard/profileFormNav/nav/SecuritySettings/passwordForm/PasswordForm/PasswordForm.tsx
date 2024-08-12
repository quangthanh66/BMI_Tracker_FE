import AUTH_API from "@app/api/auth";
import { ChangePasswordForm } from "@app/api/auth/type";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseCol } from "@app/components/common/BaseCol/BaseCol";
import { BaseRow } from "@app/components/common/BaseRow/BaseRow";
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";
import { ConfirmItemPassword } from "@app/components/profile/profileCard/profileFormNav/nav/SecuritySettings/passwordForm/ConfirmPasswordItem/ConfirmPasswordItem";
import { CurrentPasswordItem } from "@app/components/profile/profileCard/profileFormNav/nav/SecuritySettings/passwordForm/CurrentPasswordItem/CurrentPasswordItem";
import { NewPasswordItem } from "@app/components/profile/profileCard/profileFormNav/nav/SecuritySettings/passwordForm/NewPasswordItem/NewPasswordItem";
import { useMutation } from "@tanstack/react-query";
import { Form, message } from "antd";
import _ from "lodash";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export const PasswordForm: React.FC = () => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading: isLoadingChangePassword, mutate: changePassword } =
    useMutation(AUTH_API.CHANGE_PASSWORD, {
      onError: () =>
        messageApi.open({
          type: "error",
          content: "Current password is failed, please check again",
        }),

      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Change password is successful",
        }),
          form.resetFields();
      },
    });

  const onFinish = (values: ChangePasswordForm) => {
    const result = _.omit(values, ["confirmPassword"]);
    changePassword(result);
  };

  return (
    <BaseButtonsForm
      name="newPassword"
      requiredMark="optional"
      isFieldsChanged={isFieldsChanged}
      onFieldsChange={() => setFieldsChanged(true)}
      onFinish={onFinish}
      form={form}
      footer={<></>}
    >
      {contextHolder}
      <BaseRow gutter={[24, 24]}>
        <BaseCol span={24}>
          <BaseButtonsForm.Item>
            <BaseButtonsForm.Title>
              {t("profile.nav.securitySettings.changePassword")}
            </BaseButtonsForm.Title>
          </BaseButtonsForm.Item>
        </BaseCol>

        <BaseCol span={24}>
          <CurrentPasswordItem />
        </BaseCol>

        <BaseCol span={24}>
          <NewPasswordItem />
        </BaseCol>

        <BaseCol span={24}>
          <ConfirmItemPassword />
        </BaseCol>

        <BaseCol span={24}>
          <BaseButton
            htmlType="submit"
            type="primary"
            className="w-full"
            loading={isLoadingChangePassword}
          >
            Confirm change password
          </BaseButton>
        </BaseCol>
      </BaseRow>
    </BaseButtonsForm>
  );
};
