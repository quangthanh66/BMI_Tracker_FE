import { CertificateColumns } from '@app/modules/admin/pages/certificate/constant';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import CertificateFilter from '@app/modules/admin/pages/certificate/CertificateFilter';
import { Card, Col, Row, Spin, Typography, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ViewDetailCertificate from '@app/modules/admin/pages/certificate/ViewDetailCertificate';
import DescriptionModal from '@app/modules/admin/pages/certificate/DescriptionModal';
import CreateCertificateModal from '@app/modules/admin/pages/certificate/CreateCertificateModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import CERTIFICATE_API from '@app/api/certificate';
import UpdateMenuModal from '@app/modules/admin/pages/certificate/UpdateMenuModal';
import { CertificateItemTypes } from '@app/api/certificate/type';

const CertificateManagement = () => {
  const [certificates, setCertificates] = useState<CertificateItemTypes[]>([]);
  const [certificateUpdate, setCertificateUpdate] = useState<CertificateItemTypes>();
  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading: isLoadingDeleteCertificate, mutate: mutateDeleteCertificate } = useMutation(CERTIFICATE_API.DELETE_CERTIFICATE, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Delete certificate is successful',
      });

      refetchCertificatesList();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Delete certificate is failed',
      });
    },
  });

  const {
    isLoading: isLoadingCertificateList,
    refetch: refetchCertificatesList,
    data: certificatesListServer,
  } = useQuery(['certificates-list'], CERTIFICATE_API.GET_LIST, {
    enabled: false,
    onSuccess: (response: any) => {
      setCertificates(response);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Get certificates list is failed',
      });
    },
  });

  const createCertificateRef = useRef<any>();
  const updateCertificateRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const viewDetailRef = useRef<any>();

  const openCreateCertificateModal = () => {
    createCertificateRef.current.openModal();
  };

  const openUpdateCertificateModal = (certificateProps: CertificateItemTypes) => {
    setCertificateUpdate(certificateProps);
    updateCertificateRef.current.openModal();
  };
  const onOpenDescriptionModal = () => {
    descriptionRef.current.openModal();
  };
  const onViewDetailCertificate = (certificateProps: CertificateItemTypes) => {
    setCertificateUpdate(certificateProps);
    viewDetailRef.current.openModal();
  };

  const onSearchCertificate = (keyValue: string) => {
    const result = certificatesListServer.filter((certificate: CertificateItemTypes) =>
      certificate.certificateName.toLowerCase().includes(keyValue.toLowerCase()),
    );
    setCertificates(result);
  };

  // const onFilterCertificate = (certificateStatus: string) => {
  //   if (certificateStatus === 'All') {
  //     setCertificates(certificatesListServer);
  //   } else {
  //     const result = certificatesListServer.filter((certificate: CertificateItemTypes) => {
  //       return certificate.status === certificateStatus;
  //     });

  //     setCertificates(result);
  //   }
  // };

  const onDeleteCertificate = (certificateId: string) => {
    mutateDeleteCertificate(certificateId);
  };

  useEffect(() => {
    refetchCertificatesList();
  }, []);

  return (
    <Spin spinning={isLoadingCertificateList || isLoadingDeleteCertificate} tip="Loading certificates ....">
      {contextHolder}
      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card>
            <Typography.Text className="text-xl font-bold">Certificate management</Typography.Text>
          </Card>
        </Col>
        <CreateCertificateModal ref={createCertificateRef} onRefreshPage={() => refetchCertificatesList()} />
        <UpdateMenuModal
          ref={updateCertificateRef}
          certificateUpdateProps={certificateUpdate as CertificateItemTypes}
          onRefreshPage={() => refetchCertificatesList()}
        />
        <ViewDetailCertificate ref={viewDetailRef} certificateProps={certificateUpdate as CertificateItemTypes} />

        {/* <Col span={24}>
          <Card size="small">
            <CertificateFilter
              onCreateNewCertificate={openCreateCertificateModal}
              onSearchCertificate={onSearchCertificate}
              onFilterCertificateStatus={onFilterCertificate}
            />
          </Card>
        </Col> */}

        <Col span={24}>
          <BaseTable
            columns={CertificateColumns({
              updateCertificateModal: openUpdateCertificateModal,
              descriptionModal: onOpenDescriptionModal,
              viewDetailModal: onViewDetailCertificate,
              deleteCertificate: onDeleteCertificate,
            })}
            dataSource={certificates}
            scroll={{
              y: (1 - 425 / window.innerHeight) * window.innerHeight,
              x: 1200,
            }}
          />
        </Col>
      </Row>
    </Spin>
  );
};

export default CertificateManagement;
