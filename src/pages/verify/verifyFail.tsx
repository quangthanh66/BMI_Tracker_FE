import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyFailAccount = () => {
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
          src="https://media.istockphoto.com/id/1445321065/photo/red-cancelled-x-cross-mark-sign-delete-or-remove-button-icon-in-a-circle-isolated-on-white.jpg?s=1024x1024&w=is&k=20&c=-XXc0RpRclC-IyOhCKqS6QOTiVKkZ9yQUYaMFQShLMA="
          width={100}
          height={100}
        />

        <h1 className="text-2xl">Verify account is failed</h1>

        <BaseButton type="primary" block onClick={onCloseModalButton}>
          Login Page
        </BaseButton>
      </div>
    </BaseModal>
  );
};

export default VerifyFailAccount;
