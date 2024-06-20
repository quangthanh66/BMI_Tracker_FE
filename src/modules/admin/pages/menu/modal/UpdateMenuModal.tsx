import { TAddNewMenu, TMenuItem } from '@app/api/menu/type';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { Col, Form, Row, Select, Space, message } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { SelectTypes, fieldValidate } from '@app/utils/helper';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import MENU_API from '@app/api/menu';

type TUpdateMenuProps = {
  foodsOptions: SelectTypes[];
  refetchPage: () => void;
  menuUpdate: TMenuItem;
};

const UpdateMenuModal = ({ foodsOptions, menuUpdate, refetchPage }: TUpdateMenuProps, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const { isLoading, mutate: updateMenuMutate } = useMutation(MENU_API.UPDATE_MENU, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Update menu is successfully',
      });

      refetchPage();
      onCloseModal();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant update menu . Please try again !',
      });
    },
  });

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  useEffect(() => {
    if (menuUpdate) {
      form.setFieldsValue({
        menuName: menuUpdate.menuName,
        menuDescription: menuUpdate.menuDescription,
        totalCalories: menuUpdate.totalCalories,
        menuFoods: [],
      });
    }
  }, [menuUpdate]);

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const submitForm = (values: TAddNewMenu) => {
    const convertMenusFood = values.menuFoods.map((item: any) => {
      return {
        foodID: item,
        mealType: 'Breakfast',
      };
    });

    updateMenuMutate({
      ...values,
      menuID: menuUpdate.menuID,
      menuFoods: convertMenusFood,
    });
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={<BaseTypography className="text-xl">Update menu</BaseTypography>}
      width={800}
      closeIcon
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
            <Form.Item label="Photo" name="menuPhoto" >
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

export default forwardRef(UpdateMenuModal);
