import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { SelectTypes, fieldValidate } from '@app/utils/helper';
import { Col, Form, Row, Select, Space, Spin, message } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { TAddNewWorkout, TWorkoutItem } from '@app/api/workout';
import { useMutation, useQuery } from '@tanstack/react-query';
import WORKOUT_API from '@app/api/workout/type';
import { TagsRequest } from '@app/api/tags/type';
import { TIngredientItem } from '@app/api/ingredients/type';
import TagsAPI from '@app/api/tags';

type TAddNewWorkoutModal = {
  ingredients: TIngredientItem[];
  workoutUpdateProps: TWorkoutItem;
  refetchWorkoutPage: () => void;
};

const AddNewWorkoutModal = ({ ingredients, refetchWorkoutPage, workoutUpdateProps }: TAddNewWorkoutModal, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const [tagsOptions, setTagsOptions] = useState<SelectTypes[]>([]);
  const [ingredientOptions, setIngredientOptions] = useState<SelectTypes[]>([]);

  const { isLoading: isLoadingHandleWorkout, mutate: handleWorkoutMutate } = useMutation(WORKOUT_API.ADD_NEW_WORKOUT, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Add a new workout is successfully',
      });

      refetchWorkoutPage();
      onCloseModal();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant add new workout . Please try again !',
      });
    },
  });

  const { isLoading: isLoadingUpdateWorkout, mutate: updateWorkoutMutate } = useMutation(WORKOUT_API.UPDATE_WORKOUT, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Update workout is successfully',
      });

      refetchWorkoutPage();
      onCloseModal();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant update workout . Please try again !',
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
    if (ingredients.length > 0) {
      const availableIngredients = ingredients.filter((item) => item.isActive);
      const convertIngredients = availableIngredients.map((item) => {
        return {
          label: item.ingredientName,
          value: item.ingredientID,
        };
      });

      setIngredientOptions(convertIngredients);
    }
  }, [ingredients]);

  useEffect(() => {
    if (workoutUpdateProps) {
      form.setFieldsValue(workoutUpdateProps);
    }
  }, [workoutUpdateProps]);

  const onCloseModal = () => {
    setIsOpenModal(false);
    form.resetFields();
  };

  const submitForm = (values: TAddNewWorkout) => {
    if (workoutUpdateProps) {
      updateWorkoutMutate({
        ...values,
        foodCalories: Number(values.foodCalories),
        foodTimeProcess: Number(values.foodTimeProcess),
        foodID: workoutUpdateProps.workoutID,
      });
    } else {
      handleWorkoutMutate({
        ...values,
        foodCalories: Number(values.foodCalories),
        foodTimeProcess: Number(values.foodTimeProcess),
      });
    }
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={<BaseTypography className="text-xl">{workoutUpdateProps ? 'Update workout' : 'Add new workout'}</BaseTypography>}
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
              <Form.Item label="Nutrition" name="foodNutrition" rules={[fieldValidate.required]}>
                <BaseInput />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Description" name="description">
                <BaseInput.TextArea rows={3} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Photo Link" name="foodPhoto">
                <BaseInput />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Video Link" name="foodVideo">
                <BaseInput />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Time process" name="foodTimeProcess" rules={[fieldValidate.required]}>
                <BaseInput type="number" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Ingredients" name="ingredientIDs" rules={[fieldValidate.required]}>
                <Select options={ingredientOptions} mode="multiple" allowClear />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Tags" name="tagIDs" rules={[fieldValidate.required]}>
                <Select
                  options={tagsOptions}
                  mode="multiple"
                  allowClear
                //  value={workoutUpdateProps && workoutUpdateProps.foodTags.map((tag) => tag.tagID)}
                />
              </Form.Item>
            </Col>

            <Col span={24} className="flex justify-end">
              <Space>
                <BaseButton onClick={onCloseModal}>Close</BaseButton>
                <BaseButton
                  className="flex items-center"
                  htmlType="submit"
                  loading={isLoadingHandleWorkout || isLoadingUpdateWorkout}
                  disabled={isLoadingHandleWorkout || isLoadingUpdateWorkout}
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

export default forwardRef(AddNewWorkoutModal);
