import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { Col, DatePicker, Form, Select, Typography, message } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { CommissionItemTypes } from './type';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { fieldValidate } from '@app/utils/helper';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import COMMISSION_API from '@app/api/commission';

type UpdateCommissionTypes = {
  commissionUpdate: CommissionItemTypes;
  onRefreshPage: () => void;
};

const UpdateCommissionModal = ({ commissionUpdate, onRefreshPage }: UpdateCommissionTypes, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const { isLoading: isLoadingUpdateCommission, mutate: mutateUpdateCommission } = useMutation(
    COMMISSION_API.UPDATE_COMMISSION,
    {
      onSuccess: () => {
        messageApi.open({
          type: 'success',
          content: 'Update commission is successful',
        });

        onCloseModal();
        onRefreshPage();
      },
      onError: () => {
        messageApi.open({
          type: 'error',
          content: 'Update commission is failed',
        });
      },
    },
  );

  useEffect(() => {
    if (commissionUpdate) {
      form.setFieldsValue({
        title: commissionUpdate.title,
        description: commissionUpdate.description,
        type: commissionUpdate.type,
     //   userId: feedbackUpdate.users.accountID,
      });
    }
  }, [commissionUpdate]);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => setIsOpenModal(false);
  const onSubmit = (values: CommissionItemTypes) => {
    console.log(values);
  };


  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      title={<Typography className="text-xl">Update commission information</Typography>}
    >
      {contextHolder}
      <BaseForm form={form} layout="vertical" requiredMark={false} onFinish={onSubmit}>
        <BaseRow gutter={[20, 20]}>
          {/* <BaseCol span={24}>
            <BaseForm.Item name="paidDate" label="Paid Date" rules={[fieldValidate.required]}>
              <BaseInput placeholder="Enter your paid date" required maxLength={50} />
            </BaseForm.Item>
          </BaseCol> */}
          
          <BaseCol span={12}>
            <Form.Item name="paidDate" label={<span style={{fontWeight: 'bold'}}>Paid Date</span>} rules={[fieldValidate.required]}>
              <DatePicker format={'YYYY-MM-DD'} style={{ width: '100%' }} />
            </Form.Item>
          </BaseCol>

          <BaseCol span={12}>
            <BaseForm.Item name="paidAmount" label={<span style={{fontWeight: 'bold'}}>Paid amount</span>} rules={[fieldValidate.required]}>
              <BaseInput placeholder="Enter your paid amount" required maxLength={50} />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24}>
            <BaseForm.Item name="commissionDescription" label={<span style={{fontWeight: 'bold'}}>Description</span>} rules={[fieldValidate.required]}>
              <BaseInput placeholder="Enter description" required maxLength={50} />
            </BaseForm.Item>
          </BaseCol>

              <Col span={12}>
            <Form.Item label={<span style={{fontWeight: 'bold'}}>Status</span>} name="paymentStatus">
              <Select
                defaultValue={true}
                options={[
                  {
                    label: 'PAID',
                    value: true,
                  },
                  {
                    label: 'UNPAID',
                    value: false,
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <BaseCol span={24} className="flex items-center justify-end gap-2">
            <BaseButton danger onClick={() => form.resetFields()}>
              Clear
            </BaseButton>
            <BaseButton
              icon={<PlusOutlined />}
              className="flex items-center"
              htmlType="submit"
              loading={isLoadingUpdateCommission}
              type="primary"
            >
              Submit
            </BaseButton>
          </BaseCol>
        </BaseRow>
      </BaseForm>
    </BaseModal>
  );
};

export default forwardRef(UpdateCommissionModal);
