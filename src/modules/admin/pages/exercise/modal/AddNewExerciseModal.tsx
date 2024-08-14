import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import EXERCISE_API from "@app/api/exercise";
import { TAddNewExercise } from "@app/api/exercise/type";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import { BaseTypography } from "@app/components/common/BaseTypography/BaseTypography";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { BaseInput } from "@app/components/common/inputs/BaseInput/BaseInput";
import { imageDb } from "@app/services/firebase/config";
import { SelectTypes, fieldValidate } from "@app/utils/helper";
import { useMutation } from "@tanstack/react-query";
import { Col, Form, Row, Select, Space, message } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import _ from "lodash";
import { ChangeEvent, forwardRef, useImperativeHandle, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { v4 } from "uuid";

type TAddNewExerciseModal = {
  refetchPage: () => void;
  tagsSelect: SelectTypes[];
};

const AddNewExerciseModal = (
  { refetchPage, tagsSelect }: TAddNewExerciseModal,
  refProps: any
) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = BaseForm.useForm();
  const [imageUpload, setImageUpload] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<any[]>([]);

  const { isLoading, mutate: addNewExercise } = useMutation(
    EXERCISE_API.ADD_NEW_EXERCISE,
    {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Add a new exercise is successfully",
        });

        refetchPage();
        onCloseModal();
      },
      onError: (error) => {
        messageApi.open({
          type: "error",
          content: "Cannot add new exercise . Please try again !",
        });
      },
    }
  );

  useImperativeHandle(refProps, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
    form.resetFields();
  };

  const submitForm = (values: TAddNewExercise) => {
    addNewExercise({
      ...values,
      met: Number(values.met),
      exercisePhoto: _.last(imageUrls),
    });
  };

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

  const onRemovePhotoUpload = () => {
    setImageUpload("");
    setImageUrls([]);
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={
        <BaseTypography className="text-xl !text-black">
          Add exercise
        </BaseTypography>
      }
      width={800}
    >
      {contextHolder}
      <Form
        layout="vertical"
        onFinish={submitForm}
        requiredMark={false}
        form={form}
      >
        <Row gutter={[14, 14]}>
          <Col span={12}>
            <Form.Item
              label={<span style={{ fontWeight: "bold" }}>Name</span>}
              name="exerciseName"
              rules={[fieldValidate.required]}
            >
              <BaseInput />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={<span style={{ fontWeight: "bold" }}>Video</span>}
              name="exerciseVideo"
              rules={[fieldValidate.required]}
            >
              <BaseInput />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={<span style={{ fontWeight: "bold" }}>Met</span>}
              name="met"
              rules={[fieldValidate.required]}
            >
              <BaseInput type="number" min={0} max={16} step="0.1" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{ fontWeight: "bold" }}>Tags</span>}
              name="tagID"
              rules={[fieldValidate.required]}
            >
              <Select options={tagsSelect} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{ fontWeight: "bold" }}>Description</span>}
              name="exerciseDescription"
              rules={[fieldValidate.required]}
            >
              <BaseInput.TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={12}>
            {imageUpload ? (
              <div className="flex flex-col items-end gap-y-2 text-right">
                <BaseButton
                  size="small"
                  icon={<FaTrash color="red" />}
                  onClick={onRemovePhotoUpload}
                />
                <img className=" w-full " src={imageUpload} />
              </div>
            ) : (
              <Form.Item label="Photo" name="exercisePhoto">
                <div className="flex items-center justify-between gap-x-2 h-10">
                  <label
                    htmlFor="food-photo"
                    className="border border-blue-400 flex justify-center items-center h-full rounded-md flex-1 cursor-pointer gap-x-2"
                  >
                    <UploadOutlined /> Upload
                  </label>
                </div>

                <input
                  id="food-photo"
                  type="file"
                  onChange={uploadFile}
                  style={{ visibility: "hidden" }}
                />
              </Form.Item>
            )}
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

export default forwardRef(AddNewExerciseModal);
