import React from "react";
import { BaseInput } from "@app/components/common/inputs/BaseInput/BaseInput";
import { BaseButtonsForm } from "@app/components/common/forms/BaseButtonsForm/BaseButtonsForm";

export const FirstNameItem: React.FC = () => {
  return (
    <BaseButtonsForm.Item name="fullName" label={"Full name"}>
      <BaseInput />
    </BaseButtonsForm.Item>
  );
};
