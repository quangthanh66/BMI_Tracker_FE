import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { Col, Form, Row, Spin } from 'antd';
import { RecipeItem } from '@app/api/foods';
import { SelectTypes, fieldValidate } from '@app/utils/helper';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { PlusOutlined } from '@ant-design/icons';

type RecipeDialogProps = {
  ingredientSelect: SelectTypes[];
  afterClosed: (value: RecipeItem) => void;
};

const RecipeDialog = ({ ingredientSelect, afterClosed }: RecipeDialogProps, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => setIsOpenModal(false);

  const onSubmitForm = (values: RecipeItem) => {
    onCloseModal();
  };
  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={<BaseTypography className="text-xl">New Recipe</BaseTypography>}
    >
      <Form layout="vertical" onFinish={onSubmitForm} requiredMark={false} form={form}>
        <Row gutter={[14, 14]}>
          <Col span={24}>
            <Form.Item label="Ingredient" name={'ingredientID'} rules={[fieldValidate.required]}>
              <BaseSelect options={ingredientSelect} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Unit" name={'unit'} rules={[fieldValidate.required]}>
              <BaseInput placeholder="Unit" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Quantity" name={'quantity'} rules={[fieldValidate.required]}>
              <BaseInput placeholder="Quantity" min={0} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Is Active" name="isActive" rules={[fieldValidate.required]}>
              <BaseSelect
                options={[
                  {
                    label: 'Active',
                    value: true,
                  },
                  {
                    label: 'DeActive',
                    value: false,
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <BaseButton icon={<PlusOutlined />} type="primary" block htmlType="submit">
              Confirm
            </BaseButton>
          </Col>
        </Row>
      </Form>
    </BaseModal>
  );
};

export default forwardRef(RecipeDialog);
