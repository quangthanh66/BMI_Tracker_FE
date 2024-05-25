import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { SelectTypes, fieldValidate } from '@app/utils/helper';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import FEEDBACK_API from '@app/api/feedbacks';
import { CreateNewFeedbackTypes } from '@app/api/feedbacks/type';
import { Select, Spin, message } from 'antd';
import USERS_API from '@app/api/users';
import { UserItemTypes } from '@app/api/users/type';

type CreateFeedbackTypes = {
  onRefreshPage: () => void;
};

const CreateFeedbackModal = ({ onRefreshPage }: CreateFeedbackTypes, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const [userSelect, setUserSelect] = useState<SelectTypes[]>([]);
  const { isLoading: isLoadingGetUsers, refetch } = useQuery(['user-list'], USERS_API.GET_LIST, {
    enabled: false,
    onSuccess: (response: UserItemTypes[]) => {
      const convertUserSelect = response.map((user) => {
        return {
          label: user.fullName,
          value: user.accountID,
        };
      });

      setUserSelect(convertUserSelect);
    },
    onError: () => {},
  });
  const { isLoading, mutate } = useMutation(FEEDBACK_API.CREATE_FEEDBACK, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Create a new feedback is successful',
      });

      onCloseModal();
      onRefreshPage();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Create a new feedback is failed',
      });
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
    form.resetFields();
  };

  const onSubmit = (values: CreateNewFeedbackTypes) => {
    mutate(values);
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      title={<BaseTypography className="text-xl">Create a new feedback</BaseTypography>}
    >
      {contextHolder}
      <Spin spinning={isLoadingGetUsers}>
        <BaseForm form={form} layout="vertical" requiredMark={false} onFinish={onSubmit}>
          <BaseRow gutter={[20, 20]}>
            <BaseCol span={24}>
              <BaseForm.Item name="title" label="Title" rules={[fieldValidate.required]}>
                <BaseInput placeholder="Enter your title" required maxLength={50} />
              </BaseForm.Item>
            </BaseCol>

            <BaseCol span={24}>
              <BaseForm.Item name="description" label="Description" rules={[fieldValidate.required]}>
                <BaseInput placeholder="Enter your description" required maxLength={50} />
              </BaseForm.Item>
            </BaseCol>

            <BaseCol span={24}>
              <BaseForm.Item name="type" label="Type" rules={[fieldValidate.required]}>
                <BaseInput placeholder="Enter your type" required maxLength={50} />
              </BaseForm.Item>
            </BaseCol>

            <BaseCol span={24}>
              <BaseForm.Item name="userId" label="User" rules={[fieldValidate.required]}>
                <Select placeholder="Choose the user that make the feedback" options={userSelect} />
              </BaseForm.Item>
            </BaseCol>

            <BaseCol span={24} className="flex items-center justify-end gap-2">
              <BaseButton danger onClick={() => form.resetFields()}>
                Clear
              </BaseButton>
              <BaseButton
                icon={<PlusOutlined />}
                className="flex items-center"
                htmlType="submit"
                loading={isLoading}
                type="primary"
              >
                Submit
              </BaseButton>
            </BaseCol>
          </BaseRow>
        </BaseForm>
      </Spin>
    </BaseModal>
  );
};

export default forwardRef(CreateFeedbackModal);
