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

type TUpdateMenu = {
  categoriesOptions: SelectTypes[];
  foodsOptions: SelectTypes[];
  refetchPage: () => void;
  menuUpdate: TMenuItem;
  userSelect: SelectTypes[];
};

const UpdateMenuModal = (
  { categoriesOptions, foodsOptions, menuUpdate, refetchPage, userSelect }: TUpdateMenu,
  ref: any,
) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const { isLoading, mutate } = useMutation(MENU_API.UPDATE_MENU, {
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
      const convertFoods = menuUpdate.meals.map((item) => {
        return item.foodId;
      });

      form.setFieldsValue({
        menuName: menuUpdate.menuName,
        menuDescription: menuUpdate.menuDescription,
        menuType: menuUpdate.menuType,
        menuPhoto: menuUpdate.menuPhoto,
        categoryId: menuUpdate.categoryId,
        userId: menuUpdate.userId,
        foods: convertFoods,
      });
    }
  }, [menuUpdate]);

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const submitForm = (values: TAddNewMenu) => {
    const convertFoods = values.foods.map((foodItem: string) => {
      return {
        foodId: foodItem,
      };
    });

    mutate({
      ...values,
      foods: convertFoods,
      menuId: menuUpdate.menuId,
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

          <Col span={12}>
            <Form.Item label="Categories" name="categoryId" rules={[fieldValidate.required]}>
              <Select options={categoriesOptions} allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Foods" name="foods" rules={[fieldValidate.required]}>
              <Select options={foodsOptions} mode="multiple" allowClear />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="User" name="userId" rules={[fieldValidate.required]}>
              <Select options={userSelect} allowClear />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Type" name="menuType" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Photo" name="menuPhoto" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Description" name="menuDescription" rules={[fieldValidate.required]}>
              <BaseInput.TextArea rows={3} />
            </Form.Item>
          </Col>

          <Col span={24} className="flex justify-end">
            <Space>
              <BaseButton onClick={onCloseModal}>Close modal</BaseButton>
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
