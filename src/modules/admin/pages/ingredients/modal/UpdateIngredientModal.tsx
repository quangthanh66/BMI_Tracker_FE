import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import INGREDIENT_API from '@app/api/ingredients';
import { TIngredientItem, TUpdateIngredient } from '@app/api/ingredients/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { imageDb } from '@app/services/firebase/config';
import { SelectTypes, fieldValidate } from '@app/utils/helper';
import { useMutation } from '@tanstack/react-query';
import { Col, Form, Row, Select, Space, message } from 'antd';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import _ from 'lodash';
import { ChangeEvent, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { v4 } from 'uuid';

type TUpdateIngredientModal = {
  refetchFoodPage: () => void;
  ingredientProps: TIngredientItem;
  tagsSelect: SelectTypes[];
};

const UpdateIngredientModal = (
  { refetchFoodPage, ingredientProps, tagsSelect }: TUpdateIngredientModal,
  refPage: any,
) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();

  const { isLoading, mutate } = useMutation(INGREDIENT_API.UPDATE_INGREDIENT, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Update ingredient is successfully',
      });

      refetchFoodPage();
      onCloseModal();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant update ingredient . Please try again !',
      });
    },
  });

  useEffect(() => {
    if (ingredientProps) {
      form.setFieldsValue({
        ingredientName: ingredientProps.ingredientName,
        ingredientPhoto: ingredientProps.ingredientPhoto,
        quantity: ingredientProps.quantity,
        unitOfMeasurement: ingredientProps.unitOfMeasurement,
        ingredientCalories: ingredientProps.ingredientCalories,
        tagID: ingredientProps.tagID,
        isActive: ingredientProps.isActive,
      });

      setImageUpload(ingredientProps.ingredientPhoto);
    }
  }, [ingredientProps]);

  useImperativeHandle(refPage, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const submitForm = (values: TUpdateIngredient) => {
    const imageResult = _.last(imageUrls);

    mutate({
      ...values,
      ingredientID: ingredientProps.ingredientID,
      isActive: true,
      ingredientPhoto: imageResult,
      ingredientPhotoUrl: imageResult,
    });
  };

  const [imageUpload, setImageUpload] = useState<string>('');
  const [imageUrls, setImageUrls] = useState<any[]>([]);

  const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || !files[0]) return;

    setImageUpload(URL.createObjectURL(files[0]));
    const imageRef = ref(imageDb, `images/${files[0].name + v4()}`);
    uploadBytes(imageRef, files[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={<BaseTypography className="text-xl">Update ingredient</BaseTypography>}
      width={800}
    >
      {contextHolder}
      <Form layout="vertical" onFinish={submitForm} requiredMark={false} form={form}>
        <Row gutter={[14, 14]}>
          <Col span={12}>
            <Form.Item label="Name" name="ingredientName" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Unit" name="unit" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Nutrition information" name="nutritionalInformation">
              <BaseInput.TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Quantity" name="quantity" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ingredient Calories" name="ingredientCalories" rules={[fieldValidate.required]}>
              <BaseInput />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Tags" name="tagID" rules={[fieldValidate.required]}>
              <Select options={tagsSelect} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Photo" name="ingredientPhoto">
              <div className="flex items-center justify-between gap-x-2 h-10">
                <label
                  htmlFor="food-photo"
                  className="border border-blue-400 flex justify-center items-center h-full rounded-md flex-1 cursor-pointer gap-x-2"
                >
                  <UploadOutlined /> Upload
                </label>
              </div>

              <input id="food-photo" type="file" onChange={uploadFile} style={{ visibility: 'hidden' }} />
            </Form.Item>
          </Col>
          <Col span={24}>{imageUpload && <img className=" w-full " src={imageUpload} />}</Col>

          <Col span={24} className="flex justify-end">
            <Space>
              <BaseButton onClick={onCloseModal}>Close</BaseButton>
              <BaseButton
                icon={<EditOutlined />}
                className="flex items-center"
                htmlType="submit"
                loading={isLoading}
                type="primary"
              >
                Update
              </BaseButton>
            </Space>
          </Col>
        </Row>
      </Form>
    </BaseModal>
  );
};

export default forwardRef(UpdateIngredientModal);
