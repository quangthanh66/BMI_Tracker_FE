import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";
import React from "react";
import { useTranslation } from "react-i18next";
import * as S from "./PhoneItem.styles";

interface PhoneItemsProps {
  required?: boolean;
  onClick?: () => void;
  verified?: boolean;
}

export const PhoneItem: React.FC<PhoneItemsProps> = ({
  required,
  onClick,
  verified,
}) => {
  const { t } = useTranslation();

  return (
    <BaseButtonsForm.Item
      name="phoneNumber"
      label={t("common.phone")}
      rules={[{ required, message: t("common.requiredField") }]}
    >
      <S.PhoneNumberInput className="ant-input" />
    </BaseButtonsForm.Item>
  );
};
