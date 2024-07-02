import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { Col, Form, Select, Typography, message } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { SelectTypes, fieldValidate } from '@app/utils/helper';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { SaveOutlined } from '@ant-design/icons';
import { BlogItemTypes, UpdateBlogTypes } from '@app/api/blogs/type';
import BLOG_API from '@app/api/blogs';
import { useMutation } from '@tanstack/react-query';

type UpdateBlogTypesParams = {
  blogUpdateProps: BlogItemTypes;
  onRefreshPage: () => void;
};

const UpdateMenuModal = ({ blogUpdateProps, onRefreshPage }: UpdateBlogTypesParams, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { isLoading, mutate } = useMutation(BLOG_API.UPDATE_BLOG, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Update blog is successful',
      });

      onCloseModal();
      onRefreshPage();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Update blog is fail',
      });
    },
  });

  const [form] = BaseForm.useForm();

  useEffect(() => {
    if (blogUpdateProps) {
      form.setFieldsValue({
        blogName: blogUpdateProps.blogName,
        blogContent: blogUpdateProps.blogContent,
        blogPhoto: blogUpdateProps.blogPhoto,
        link: blogUpdateProps.blogPhoto,
      });
    }
  }, [blogUpdateProps]);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => setIsOpenModal(false);
  const onSubmit = (values: UpdateBlogTypes) => {
    // mutate({ ...values, blogId: blogUpdateProps.bolgId });
  };

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      title={<Typography className="text-xl">Update blog</Typography>}
      width={800}
    >
      {contextHolder}
      <BaseForm form={form} layout="vertical" requiredMark={false} onFinish={onSubmit}>
        <BaseRow gutter={[20, 20]}>
          <BaseCol span={24}>
            <BaseForm.Item name="blogName" label="Name" rules={[fieldValidate.required]}>
              <BaseInput placeholder="Enter your blog name" required maxLength={50} />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24}>
            <BaseForm.Item name="blogContent" label="Content" rules={[fieldValidate.required]}>
              <BaseInput.TextArea rows={3} placeholder="Enter your blog content" required />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24}>
            <BaseForm.Item name="blogPhoto" label="Photo">
              <BaseInput placeholder="Enter your link image of the blog" required />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24}>
            <BaseForm.Item name="link" label="Link" rules={[fieldValidate.required]}>
              <BaseInput placeholder="Enter the link of the blog" required />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24} className="flex items-center justify-end gap-2">
            <BaseButton danger>Reset</BaseButton>
            <BaseButton
              icon={<SaveOutlined />}
              className="flex items-center"
              htmlType="submit"
              loading={isLoading}
              type="primary"
            >
              Save
            </BaseButton>
          </BaseCol>
        </BaseRow>
      </BaseForm>
    </BaseModal>
  );
};

export default forwardRef(UpdateMenuModal);
