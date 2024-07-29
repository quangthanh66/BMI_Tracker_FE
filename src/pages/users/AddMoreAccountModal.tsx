import USERS_API from "@app/api/users";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import { BaseSelect } from "@app/components/common/selects/BaseSelect/BaseSelect";
import { ADD_USER_ROLES, USER_ROLES_ENUM, USER_ROLES_VALUES } from "@app/utils/constant";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

type AddMoreAccountProps = {
  refreshPage: () => void;
};

const AddMoreAccountModal = (
  { refreshPage }: AddMoreAccountProps,
  ref: any
) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [accountId, setAccountId] = useState<number>(0);
  const [role, setRole] = useState<any>(USER_ROLES_ENUM.ROLE_MEMBER);

  const { isLoading: isLoadingAddMoreAccount, mutate } = useMutation(
    USERS_API.ADD_MORE_ACCOUNT,
    {
      onSuccess: () => {
        messageApi.success("Add new account is successfully");
        refreshPage();
        onCloseModal();
      },
    }
  );

  useImperativeHandle(ref, () => {
    return {
      openModal: (value: number) => {
        setAccountId(value);
        setIsOpenModal(true);
      },
    };
  });

  const onCloseModal = () => setIsOpenModal(false);

  const onSubmitForm = () => {
    mutate({
      accountID: accountId,
      roleName: role,
    });
  };

  return (
    <BaseModal
      title="Add more account"
      onCancel={onCloseModal}
      open={isOpenModal}
      footer={null}
    >
      {contextHolder}
      <div className="flex flex-col gap-y-4">
        <BaseSelect
          options={ADD_USER_ROLES}
          defaultValue={role}
          onChange={(value) => setRole(value)}
        />
        <BaseButton
          type="primary"
          block
          onClick={onSubmitForm}
          loading={isLoadingAddMoreAccount}
        >
          Confirm
        </BaseButton>
      </div>
    </BaseModal>
  );
};

export default forwardRef(AddMoreAccountModal);
