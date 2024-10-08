import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
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
          src="https://cdn-icons-png.flaticon.com/512/8439/8439341.png"
          width={100}
          height={100}
        />

        <h1 className="text-2xl" style={{ textAlign: 'center' }} >Account has been verified</h1>
        <h1 className="text-2x1" style={{ textAlign: 'center' }} >Please login with your mobile device to use the application.</h1>
        {/* <BaseButton type="primary" block onClick={onCloseModalButton}>
          Login
        </BaseButton> */}
      </div>
    </BaseModal>
  );
};

export default VerifyAccount;
