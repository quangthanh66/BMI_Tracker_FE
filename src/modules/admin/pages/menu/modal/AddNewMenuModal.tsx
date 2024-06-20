import { PlusOutlined } from '@ant-design/icons';
import MENU_API from '@app/api/menu';
import { TAddNewMenu } from '@app/api/menu/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { SelectTypes, fieldValidate } from '@app/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { Col, Form, Row, Select, Space, message } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

type TAddNewMenuModal = {
  foodsOptions: SelectTypes[];
  refetchPage: () => void;
};

const AddNewMenuModal = ({ foodsOptions, refetchPage }: TAddNewMenuModal, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const { isLoading, mutate: mutateAddNewMenu } = useMutation(MENU_API.ADD_NEW_MENU, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Add a new menu is successfully',
      });

      refetchPage();
      onCloseModal();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant add new menu . Please try again !',
      });
    },
  });

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
    form.resetFields();
  };

  const submitForm = (values: TAddNewMenu) => {
    const convertMenusFood = values.menuFoods.map((item: any) => {
      return {
        foodID: item,
        mealType: 'Breakfast',
      };
    });
    mutateAddNewMenu({
      ...values,
      menuFoods: convertMenusFood,
      totalCalories: Number(values.totalCalories),
    });
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={<BaseTypography className="text-xl !text-white">Add new menu</BaseTypography>}
      closeIcon
      width={700}
    >
      {contextHolder}
      <Form layout="vertical" form={form} requiredMark={false} onFinish={submitForm}>
        <Row gutter={[14, 14]}>
          <Col span={24}>
            <Form.Item label="Name" name="menuName" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Description" name="menuDescription">
              <BaseInput.TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Photo" name="menuPhoto">
              <BaseInput.TextArea rows={3} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Foods" name="menuFoods" rules={[fieldValidate.required]}>
              <Select options={foodsOptions} mode="multiple" allowClear />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Total Calories" name="totalCalories" rules={[fieldValidate.required]}>
              <BaseInput min={0} type="number" />
            </Form.Item>
          </Col>

          <Col span={24} className="flex justify-end">
            <Space>
              <BaseButton onClick={onCloseModal}>Close</BaseButton>
              <BaseButton
                icon={<PlusOutlined />}
                className="flex items-center"
                htmlType="submit"
                loading={isLoading}
                type="primary"
              >
                Submit
              </BaseButton>
            </Space>
          </Col>
        </Row>
      </Form>
    </BaseModal>
  );
};

export default forwardRef(AddNewMenuModal);
