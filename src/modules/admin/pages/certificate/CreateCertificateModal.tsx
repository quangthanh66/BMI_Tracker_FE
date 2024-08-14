import { PlusOutlined } from "@ant-design/icons";
import ADVISOR_API from "@app/api/advisor";
import { AdvisorItemTypes } from "@app/api/advisor/type";
import CERTIFICATE_API from "@app/api/certificate";
import { CreateCertificateRequest } from "@app/api/certificate/type";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseCol } from "@app/components/common/BaseCol/BaseCol";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import { BaseRow } from "@app/components/common/BaseRow/BaseRow";
import { BaseTypography } from "@app/components/common/BaseTypography/BaseTypography";
import { BaseForm } from "@app/components/common/forms/BaseForm/BaseForm";
import { BaseInput } from "@app/components/common/inputs/BaseInput/BaseInput";
import { BaseSelect } from "@app/components/common/selects/BaseSelect/BaseSelect";
import { fieldValidate, SelectTypes } from "@app/utils/helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message, Spin } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

type CreateCertificateTypes = {
  onRefreshPage: () => void;
};

const CreateCertificateModal = (
  { onRefreshPage }: CreateCertificateTypes,
  ref: any
) => {
  const [form] = BaseForm.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [advisors, setAdvisors] = useState<SelectTypes[]>([]);

  const { isLoading: isLoadingCreateCertificate, mutate } = useMutation(
    CERTIFICATE_API.CREATE_NEW_CERTIFICATE,
    {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Add Certificate is success",
        });

        onCloseModal();
        onRefreshPage();
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Add Certificate is failed",
        });
      },
    }
  );

  const { isLoading: isLoadingGetAdvisor, refetch: refetchAdvisor } = useQuery(
    ["advisor-list"],
    ADVISOR_API.GET_LIST,
    {
      enabled: false,
      onSuccess: (response: AdvisorItemTypes[]) => {
        const convertToAdvisorSelect = response.map((item) => {
          return {
            label: item.fullName,
            value: item.advisorID,
          };
        });

        setAdvisors(convertToAdvisorSelect);
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Get advisor list is failed",
        });
      },
    }
  );

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
    form.resetFields();
  };

  const onSubmit = (values: CreateCertificateRequest) => {
    mutate({ ...values });
  };

  useEffect(() => {
    refetchAdvisor();
  }, []);

  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      title={
        <BaseTypography className="text-xl">
          Add certificate
        </BaseTypography>
      }
    >
      {contextHolder}

      <Spin spinning={isLoadingGetAdvisor}>
        <BaseForm
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={onSubmit}
        >
          <BaseRow gutter={[20, 20]}>
            <BaseCol span={24}>
              <BaseForm.Item
                name="certificateName"
                label="Name"
                rules={[fieldValidate.required]}
              >
                <BaseInput
                  placeholder="Enter your certificate name"
                  required
                  maxLength={50}
                />
              </BaseForm.Item>
            </BaseCol>

            <BaseCol span={24}>
              <BaseForm.Item
                name="certificateLink"
                label="Link"
                rules={[fieldValidate.required]}
              >
                <BaseInput.TextArea
                  rows={3}
                  placeholder="Enter your link certificate"
                  required
                />
              </BaseForm.Item>
            </BaseCol>

            <BaseCol span={24}>
              <BaseForm.Item
                name="advisorID"
                label="Advisor"
                rules={[fieldValidate.required]}
              >
                <BaseSelect
                  options={advisors}
                  placeholder="Select the advisor"
                />
              </BaseForm.Item>
            </BaseCol>

            <BaseCol span={24} className="flex items-center justify-end gap-2">
              <BaseButton danger onClick={() => form.resetFields()}>
                Clear
              </BaseButton>
              <BaseButton
                icon={<PlusOutlined />}
                className="flex items-center"
                htmlType="submit"
                loading={isLoadingCreateCertificate}
                type="primary"
              >
                Submit
              </BaseButton>
            </BaseCol>
          </BaseRow>
        </BaseForm>
      </Spin>
    </BaseModal>
  );
};

export default forwardRef(CreateCertificateModal);
