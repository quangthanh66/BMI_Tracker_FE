import CERTIFICATE_API from "@app/api/certificate";
import { CertificateDetailResponse } from "@app/api/users/type";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import { useMutation } from "@tanstack/react-query";
import { Badge, Descriptions, Empty, Spin, Typography, message } from "antd";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";

type UpdateCertificateProps = {
  refreshPage: () => void;
};

const UpdateCertificateAdmin = (
  { refreshPage }: UpdateCertificateProps,
  ref: any
) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    isLoading: isLoadingCertificateDetail,
    data: certificateDetail,
    mutate: getCertificateDetail,
  } = useMutation(CERTIFICATE_API.GET_CERTIFICATE_DETAIL, {
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Your account is invalid. Please try again",
      });
    },
  });

  const {
    isLoading: isLoadingUpdateCertificate,
    mutate: updateCertificateMutate,
  } = useMutation(CERTIFICATE_API.UPDATE_CERTIFICATE, {
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Update Certificate is failed",
      });
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Update Certificate Status is successfully",
      });
      refreshPage();
      onCloseModal();
    },
  });

  useImperativeHandle(ref, () => {
    return {
      openModal: (id: number) => {
        getCertificateDetail(id);
        setIsOpenModal(true);
      },
    };
  });

  const onCloseModal = () => setIsOpenModal(false);
  const certficiateDetailResult: CertificateDetailResponse = useMemo(
    () => certificateDetail as any,
    [certificateDetail]
  );

  const onChangeCertificateStatus = (status: boolean) => {
    if (certficiateDetailResult) {
      updateCertificateMutate({
        certificateID: certficiateDetailResult.certificateID,
        certificateLink: certficiateDetailResult.certificateLink,
        certificateName: certficiateDetailResult.certificateName,
        isActive: status,
      });
    }
  };
  return (
    <BaseModal
      centered
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      closeIcon
      title={
        <Typography className="text-xl">Confirm status</Typography>
      }
      width={300}
    >
      {contextHolder}

      <Spin spinning={isLoadingCertificateDetail || isLoadingUpdateCertificate}>
        {certficiateDetailResult ? (
          <Descriptions className="!text-black" >
            {/* <Descriptions.Item label="Status" style={{ marginRight: '50px' }} className="!text-black"> */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Badge
                status="processing"
                text={certficiateDetailResult.isActive ? "Active" : "Deactivated"}
              />
              <BaseButton
                type="primary"
                onClick={() => onChangeCertificateStatus(!certficiateDetailResult.isActive)}
                style={{ marginLeft: '40px' }}
              >
                {certficiateDetailResult.isActive ? "Deactivate" : "Activate"}
              </BaseButton>


            </div>
            {/* </Descriptions.Item> */}
          </Descriptions>
        ) : (
          <Empty />
        )}
      </Spin>
    </BaseModal>
  );
};

export default forwardRef(UpdateCertificateAdmin);
