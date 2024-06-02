import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { SelectTypes, fieldValidate } from '@app/utils/helper';
import { Col, Form, Row, Select, Space, Spin, message } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { TCategoryItem } from '@app/api/categories/type';
import { TAddNewFood } from '@app/api/foods';
import { useMutation, useQuery } from '@tanstack/react-query';
import FOOD_API from '@app/api/foods/type';
import { IngredientTypes } from '../../ingredients/type';
import TagsAPI from '@app/api/tags';
import { TagsRequest } from '@app/api/tags/type';

type TAddNewFoodModal = {
  categories: TCategoryItem[];
  ingredients: IngredientTypes[];
  refetchFoodPage: () => void;
};

const AddNewFoodModal = ({ categories, ingredients, refetchFoodPage }: TAddNewFoodModal, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const [categoryOptions, setCategoryOptions] = useState<SelectTypes[]>([]);
  const [tagsOptions, setTagsOptions] = useState<SelectTypes[]>([]);
  const [ingredientOptions, setIngredientOptions] = useState<SelectTypes[]>([]);

  const { isLoading: isLoadingHandleFood, mutate: handleFoodMutate } = useMutation(FOOD_API.ADD_NEW_FOOD, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Add a new food is successfully',
      });

      refetchFoodPage();
      onCloseModal();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant add new food . Please try again !',
      });
    },
  });

  const { isLoading: isLoadingTags } = useQuery({
    queryKey: ['tags-key'],
    queryFn: TagsAPI.getAllTag,
    onError: () => message.error('Load tags is failed'),
    onSuccess: (response: TagsRequest[]) => {
      const result: SelectTypes[] = response.map((item) => {
        return {
          label: item.tagName,
          value: item.tagID,
        };
      });
      setTagsOptions(result);
    },
  });

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  useEffect(() => {
    if (categories.length > 0) {
      const convertCategories = categories.map((item) => {
        return {
          label: item.categoryName,
          value: item.categoryId,
        };
      });

      setCategoryOptions(convertCategories);
    }

    if (ingredients.length > 0) {
      const availableIngredients = ingredients.filter((item) => item.status !== 'false');
      const convertIngredients = availableIngredients.map((item) => {
        return {
          label: item.ingredientName,
          value: item.ingredientId,
        };
      });

      setIngredientOptions(convertIngredients);
    }
  }, [categories, ingredients]);

  const onCloseModal = () => {
    setIsOpenModal(false);
    form.resetFields();
  };

  const submitForm = (values: TAddNewFood) => {
    // const convertIngredients: any = values.ingredients.map((item) => {
    //   return {
    //     ingredientId: item,
    //   };
    // });
    // mutate({
    //   ...values,
    //   ingredients: convertIngredients,
    // });
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={<BaseTypography className="text-xl">Add new food</BaseTypography>}
      width={800}
    >
      {contextHolder}
      <Spin spinning={isLoadingTags}>
        <Form layout="vertical" onFinish={submitForm} requiredMark={false} form={form}>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <Form.Item label="Name" name="foodName" rules={[fieldValidate.required]}>
                <BaseInput />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Calories" name="foodCalories" rules={[fieldValidate.required]}>
                <BaseInput type="number" min={0} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Description" name="description" rules={[fieldValidate.required]}>
                <BaseInput.TextArea rows={3} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Photo Link" name="foodPhoto" rules={[fieldValidate.required]}>
                <BaseInput />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Video Link" name="foodVideo" rules={[fieldValidate.required]}>
                <BaseInput />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Time process" name="foodtimeProcess" rules={[fieldValidate.required]}>
                <BaseInput type="number" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Ingredients" name="recipeRequests" rules={[fieldValidate.required]}>
                <Select options={ingredientOptions} mode="multiple" allowClear />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Tags" name="tagIDs" rules={[fieldValidate.required]}>
                <Select options={tagsOptions} mode="multiple" allowClear />
              </Form.Item>
            </Col>

            <Col span={24} className="flex justify-end">
              <Space>
                <BaseButton onClick={onCloseModal}>Close</BaseButton>
                <BaseButton
                  className="flex items-center"
                  htmlType="submit"
                  loading={isLoadingHandleFood}
                  disabled={isLoadingHandleFood}
                  type="primary"
                >
                  Confirm
                </BaseButton>
              </Space>
            </Col>
          </Row>
        </Form>
      </Spin>
    </BaseModal>
  );
};

export default forwardRef(AddNewFoodModal);
