import TagsAPI from "@app/api/tags";
import { CreateNewTagRequest, ETagTypesWithNumber } from "@app/api/tags/type";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import { BaseInput } from "@app/components/common/inputs/BaseInput/BaseInput";
import { BaseSelect } from "@app/components/common/selects/BaseSelect/BaseSelect";
import { fieldValidate } from "@app/utils/helper";
import { useMutation } from "@tanstack/react-query";
import { Col, Form, message, Row } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

const TagTypes = [
  {
    label: "Meal Type",
    value: ETagTypesWithNumber.MEAL_TYPE,
  },
  {
    label: "Special Diet",
    value: ETagTypesWithNumber.SPECIAL_DIET,
  },
  {
    label: "Allergy",
    value: ETagTypesWithNumber.ALLERGY,
  },
  {
    label: "Dish Type",
    value: ETagTypesWithNumber.DISH_TYPE,
  },
  {
    label: "Exercise Type",
    value: ETagTypesWithNumber.EXERCISE_TYPE,
  },
  {
    label: "Ingredient Type",
    value: ETagTypesWithNumber.INGREDIENT_TYPE,
  },
  {
    label: "BMI Category",
    value: ETagTypesWithNumber.BMI_CATEGORY,
  },
];

const CreateNewTagModal = ({}, ref: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = Form.useForm();
  const onCloseModal = () => setIsOpenModal(false);

  const { isLoading: isLoadingCreateNewTag, mutate: addNewTag } = useMutation(
    TagsAPI.addNewTag,
    {
      onError: () =>
        messageApi.open({
          type: "error",
          content: "Can't create new tag . Please try again !",
        }),
      onSuccess: (response) => {
        messageApi.open({
          type: "success",
          content: "Create a new tag is successful",
        }),
          onCloseModal();
      },
    }
  );

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onSubmitToGetTagType = (values: CreateNewTagRequest) =>
    addNewTag(values);
  return (
    <BaseModal
      open={isOpenModal}
      onCancel={onCloseModal}
      title="Create New Tag"
      footer={null}
      closeIcon
    >
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        requiredMark
        onFinish={onSubmitToGetTagType}
      >
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Form.Item name="tagName" rules={[fieldValidate.required]}>
              <BaseInput placeholder="Name..." />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="tagDescription" rules={[fieldValidate.required]}>
              <BaseInput.TextArea rows={3} placeholder="Description..." />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="tagTypeID" rules={[fieldValidate.required]}>
              <BaseSelect options={TagTypes} placeholder="Type..." />
            </Form.Item>
          </Col>

          <Col span={24} className="flex items-center justify-end gap-x-4">
            <BaseButton onClick={onCloseModal} disabled={isLoadingCreateNewTag}>
              Close Modal
            </BaseButton>
            <BaseButton
              type="primary"
              htmlType="submit"
              loading={isLoadingCreateNewTag}
            >
              Confirm
            </BaseButton>
          </Col>
        </Row>
      </Form>
    </BaseModal>
  );
};

export default forwardRef(CreateNewTagModal);
