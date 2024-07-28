import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifySuccessAccount = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const onCloseModal = () => setIsOpen(false);

  const onCloseModalButton = () => {
    onCloseModal();
    navigate("/auth/login");
  };

  return (
    <BaseModal open={isOpen} onCancel={onCloseModal} footer={null} width={400}>
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/018/873/934/small_2x/blue-check-mark-verified-profile-account-social-media-symbol-user-interface-theme-3d-icon-render-illustration-isolated-png.png"
          width={100}
          height={100}
        />

        <h1 className="text-2xl">Verify account is successfully</h1>

        <BaseButton type="primary" block onClick={onCloseModalButton}>
          Login Page
        </BaseButton>
      </div>
    </BaseModal>
  );
};

export default VerifySuccessAccount;
