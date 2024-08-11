import { BaseCard } from "@app/components/common/BaseCard/BaseCard";
import { BaseCol } from "@app/components/common/BaseCol/BaseCol";
import { BaseRow } from "@app/components/common/BaseRow/BaseRow";
import React from "react";
import { PasswordForm } from "./passwordForm/PasswordForm/PasswordForm";

export const SecuritySettings: React.FC = () => (
  <BaseCard>
    <BaseRow gutter={[30, 0]}>
      <BaseCol span={24}>
        <PasswordForm />
      </BaseCol>

      {/* <BaseCol xs={24} xl={14}>
        <TwoFactorAuth />
      </BaseCol> */}
    </BaseRow>
  </BaseCard>
);
