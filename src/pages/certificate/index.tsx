import { Card, Col, Row, Spin, Typography, message } from "antd";
import { useEffect, useRef, useState } from "react";
import ViewDetailCertificate from "@app/modules/admin/pages/certificate/ViewDetailCertificate";
import CreateCertificateModal from "@app/modules/admin/pages/certificate/CreateCertificateModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import CERTIFICATE_API from "@app/api/certificate";
import UpdateMenuModal from "@app/modules/admin/pages/certificate/UpdateMenuModal";
import { CertificateItemTypes } from "@app/api/certificate/type";
import { BaseTable } from "@app/components/common/BaseTable/BaseTable";
import { CertificateColumns } from "@app/modules/admin/pages/certificate/constant";
import CertificateFilter from "@app/modules/admin/pages/certificate/CertificateFilter";
import { useSelector } from "react-redux";
import { UserItemTypes } from "@app/api/users/type";
import { USER_ROLES_ENUM } from "@app/utils/constant";
import UpdateCertificateAdmin from "./UpdateCertificateAdmin";

const CertificateManagement = () => {
  const [certificates, setCertificates] = useState<CertificateItemTypes[]>([]);
  const [certificateUpdate, setCertificateUpdate] =
    useState<CertificateItemTypes>();
  const [messageApi, contextHolder] = message.useMessage();
  const userProfileState: UserItemTypes = useSelector(
    (state: any) => state.app.userProfile.payload
  );
  const createCertificateRef = useRef<any>();
  const updateCertificateRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const viewDetailRef = useRef<any>();
  const updateCertificateAdminRef = useRef<any>();

  const {
    isLoading: isLoadingDeleteCertificate,
    mutate: mutateDeleteCertificate,
  } = useMutation(CERTIFICATE_API.DELETE_CERTIFICATE, {
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Delete certificate is failed",
      });
    },
    onSuccess: () => onRefetchList(),
  });

  const {
    isLoading: isLoadingCertificateList,
    refetch: refetchCertificatesList,
    data: certificatesListServer,
  } = useQuery(["certificates-list"], CERTIFICATE_API.GET_LIST, {
    enabled: false,
    onSuccess: (response: CertificateItemTypes[]) => {
      setCertificates(response);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Get certificates list is failed",
      });
    },
  });

  const {
    isLoading: isLoadingCertificateAdvisor,
    mutate: getCertificateAdvisorByID,
  } = useMutation({
    mutationFn: CERTIFICATE_API.GET_CERTIFICATE_BY_ADVISOR,
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Get certificates list is failed",
      });
    },
    onSuccess: (response: any) => {
      setCertificates(response);
    },
  });

  const openCreateCertificateModal = () => {
    createCertificateRef.current.openModal();
  };

  const openUpdateCertificateModal = (
    certificateProps: CertificateItemTypes
  ) => {
    setCertificateUpdate(certificateProps);

    userProfileState.role === USER_ROLES_ENUM.ROLE_MANAGER
      ? updateCertificateRef.current.openModal()
      : updateCertificateAdminRef.current.openModal(
          certificateProps.certificateID
        );
  };
  const onOpenDescriptionModal = () => {
    descriptionRef.current.openModal();
  };
  const onViewDetailCertificate = (certificateProps: CertificateItemTypes) => {
    setCertificateUpdate(certificateProps);
    viewDetailRef.current.openModal();
  };

  const onDeleteCertificate = (certificateId: string) => {
    mutateDeleteCertificate(certificateId, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Delete certificate is successful",
        });

        refetchCertificatesList();
      },
    });
  };

  useEffect(() => {
    userProfileState.role === USER_ROLES_ENUM.ROLE_MANAGER
      ? getCertificateAdvisorByID(Number(userProfileState.accountID))
      : refetchCertificatesList();
  }, []);

  const onRefetchList = () => {
    refetchCertificatesList();
    // userProfileState.role === USER_ROLES_ENUM.ROLE_MANAGER
    //   ? getCertificateAdvisorByID(Number(userProfileState.accountID))
    //   : refetchCertificatesList();
  };

  return (
    <Spin
      spinning={isLoadingDeleteCertificate || isLoadingCertificateAdvisor}
      tip="Loading certificates ...."
    >
      {contextHolder}
      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card>
            <Typography.Text className="text-xl font-bold">
              Certificate management
            </Typography.Text>
          </Card>
        </Col>

        <CreateCertificateModal
          ref={createCertificateRef}
          onRefreshPage={onRefetchList}
        />
        <UpdateMenuModal
          ref={updateCertificateRef}
          certificateUpdateProps={certificateUpdate as CertificateItemTypes}
          onRefreshPage={onRefetchList}
        />
        <ViewDetailCertificate
          ref={viewDetailRef}
          certificateProps={certificateUpdate as CertificateItemTypes}
        />
        <UpdateCertificateAdmin
          ref={updateCertificateAdminRef}
          refreshPage={onRefetchList}
        />

        {/* <Col span={24}>
          <Card size="small">
            <CertificateFilter
              onCreateNewCertificate={openCreateCertificateModal}
            />
          </Card>
        </Col> */}

        <Col span={24}>
          {certificates && certificates.length > 0 && (
            <BaseTable
              columns={CertificateColumns({
                updateCertificateModal: openUpdateCertificateModal,
                descriptionModal: onOpenDescriptionModal,
                viewDetailModal: onViewDetailCertificate,
                deleteCertificate: onDeleteCertificate,
              })}
              dataSource={certificates}
              scroll={{
                y: (1 - 310 / window.innerHeight) * window.innerHeight,
                x: 1200,
              }}
            />
          )}
        </Col>
      </Row>
    </Spin>
  );
};

export default CertificateManagement;
