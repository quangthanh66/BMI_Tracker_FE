import { CommissionColumns } from '@app/modules/trainer/pages/commission/constant';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import CommissionFilter from '@app/modules/trainer/pages/commission/CommissionFilter';
import UpdateCommissionModel from '@app/modules/trainer/pages/commission/UpdateCommissionModal';
import { CommissionItemTypes } from '@app/modules/trainer/pages/commission/type';
import { Card, Col, Empty, Row, Spin, Typography, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import COMMISSION_API from '@app/api/commission';

const CommissionManagement = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [commission, setCommission] = useState<CommissionItemTypes[]>([]);
  const [commissionUpdate, setCommissionUpdate] = useState<CommissionItemTypes>();

  const {
    isLoading: isLoadingLoadCommission,
    refetch,
    data: commissionServer,
  } = useQuery(['commission-list'], COMMISSION_API.GET_LIST, {
    onSuccess: (response: any) => {
      setCommission(response);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Load Commission data is failed',
      });
    },
    enabled: false,
  });

  const { isLoading: isLoadingApproveCommission, mutate: approveCommissionMutate } = useMutation({
    mutationFn: COMMISSION_API.APPROVE_COMMISSION,
    onSuccess: () => refetch(),
    onError: () =>
      messageApi.open({
        type: 'error',
        content: 'Approve commission is failed',
      }),
  });

  const createCommissionRef = useRef<any>();
  const updateCommissionRef = useRef<any>();

  useEffect(() => {
    refetch();
  }, []);

  const openCreateCommissionModal = () => {
    createCommissionRef.current.openModal();
  };

  const openUpdateCommissionModal = (commissionItem: CommissionItemTypes) => {
    setCommissionUpdate(commissionItem);
    updateCommissionRef.current.openModal();
  };

  const onSearchCommission = async (keyValue: string) => {
    if (commissionServer) {
      // const result = await commissionServer.filter((commission: CommissionItemTypes) =>
      //   commission.title.toLowerCase().includes(keyValue.toLowerCase()),
      // );
      // setCommission(result);
    }
  };

  const onFilterCommissionStatus = (status: boolean) => {
    if (commissionServer) {
      if (status) {
        setCommission(commissionServer);
      } else {
        // const result = commissionServer.filter((commissionItem: CommissionItemTypes) => commissionItem.status === status);
        // setCommission(result);
      }
    }
  };

  const onApproveCommission = (commissionID: number) => {
    approveCommissionMutate(commissionID);
  };

  return (
    <Spin spinning={isLoadingLoadCommission || isLoadingApproveCommission} tip="Loading commission ...">
      {contextHolder}
      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card>
            <Typography.Text className="text-xl font-bold">Commission management</Typography.Text>
          </Card>
        </Col>
        <UpdateCommissionModel
          ref={updateCommissionRef}
          commissionUpdate={commissionUpdate as CommissionItemTypes}
          onRefreshPage={() => refetch()}
        />
        {/* <Col span={24}>
          <Card size="small">
            <CommissionFilter
              onCreateCommission={openCreateCommissionModal}
              onSearchCommission={onSearchCommission}
              onFilterCommissionStatus={onFilterCommissionStatus}
            />
          </Card>
        </Col> */}

        {commission.length > 0 ? (
          <Col span={24}>
            <BaseTable
              className="max-w-[82vw]"
              columns={CommissionColumns({
                updateCommissionModal: openUpdateCommissionModal,
                approveCommission: onApproveCommission,
              })}
              dataSource={commission}
              scroll={{
                y: (1 - 350 / window.innerHeight) * window.innerHeight,
                x: 1200,
              }}
            />
          </Col>
        ) : (
          <Col span={24} className="flex justify-center">
            <Empty />
          </Col>
        )}
      </Row>
    </Spin>
  );
};

export default CommissionManagement;
