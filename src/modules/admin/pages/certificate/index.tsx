import { Card, Col, Row, Spin, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import CertificateFilter from './CertificateFilter';
import CreateCertificateModal from './CreateCertificateModal';
import UpdateCertificateModal from './UpdateCertificateModal';
import { CertificateColumns } from './constant';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import DescriptionModal from './DescriptionModal';
import ViewDetailCertificate from './ViewDetailCertificate';
import { useQuery } from '@tanstack/react-query';
import CERTIFICATE_API from '@app/api/certificate';

const Certificate = () => {
  const {
    isLoading: isLoadingCertificateList,
    refetch: refetchCertificatesList,
    data: certificatesListServer,
  } = useQuery(['certificates-list'], CERTIFICATE_API.GET_LIST, {
    enabled: false,
    onSuccess: (response) => {
      console.log(response);
    },
    onError: () => {},
  });

  const createCertificateRef = useRef<any>();
  const updateCertificateRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const viewDetailRef = useRef<any>();

  const onCreateNewCertificate = () => {
    createCertificateRef.current.openModal();
  };

  const onUpdateCertificate = () => {
    updateCertificateRef.current.openModal();
  };

  const onOpenDescriptionModal = () => {
    descriptionRef.current.openModal();
  };

  const onSearchCertificateName = (value: string) => {
    console.log(value);
  };

  const filterCertificateStatus = (statusParams: string) => {
    console.log(certificatesListServer?.data);
    console.log(statusParams);
  };

  const onViewDetailCertificate = () => {
    viewDetailRef.current.openModal();
  };

  useEffect(() => {
    refetchCertificatesList();
  }, []);

  return (
    <Spin spinning={isLoadingCertificateList} tip="Loading Certificates...">
      <Row gutter={[14, 14]}>
        <UpdateCertificateModal ref={updateCertificateRef} />
        <DescriptionModal ref={descriptionRef} content="This is a content of the Certificate" />

        <Col span={24}>
          <Card>
            <Typography.Text className="text-xl font-bold">Certificate management 2</Typography.Text>
          </Card>
        </Col>

        <Col span={24}>
          <Card size="small">
            <CertificateFilter
              onCreateNewCertificate={onCreateNewCertificate}
              onSearchCertificate={onSearchCertificateName}
              // onFilterCertificateStatus={filterCertificateStatus}
            />
          </Card>
        </Col>
      </Row>
    </Spin>
  );
};

export default Certificate;
