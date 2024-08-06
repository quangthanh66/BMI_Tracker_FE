import COMMISSION_API from "@app/api/commission";
import { BaseTable } from "@app/components/common/BaseTable/BaseTable";
import UpdateCommissionModel from "@app/modules/trainer/pages/commission/UpdateCommissionModal";
import { CommissionColumns } from "@app/modules/trainer/pages/commission/constant";
import { CommissionItemTypes } from "@app/modules/trainer/pages/commission/type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, Col, Empty, Row, Spin, Typography, message } from "antd";
import { useEffect, useRef, useState } from "react";
import ViewDetailComission from "./ViewDetailComission";

const CommissionManagement = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [commission, setCommission] = useState<CommissionItemTypes[]>([]);
  const [commissionUpdate, setCommissionUpdate] =
    useState<CommissionItemTypes>();

  const { isLoading: isLoadingLoadCommission, refetch } = useQuery(
    ["commission-list"],
    COMMISSION_API.GET_LIST,
    {
      onSuccess: (response: any) => {
        setCommission(response);
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Load Commission data is failed",
        });
      },
      enabled: false,
    }
  );

  const { isLoading: isLoadingApproveCommission } = useMutation({
    mutationFn: COMMISSION_API.APPROVE_COMMISSION,
    onSuccess: () => refetch(),
    onError: () =>
      messageApi.open({
        type: "error",
        content: "Approve commission is failed",
      }),
  });

  const updateCommissionRef = useRef<any>();
  const viewDetailRef = useRef<any>();

  useEffect(() => {
    refetch();
  }, []);

  const openUpdateCommissionModal = (commissionItem: CommissionItemTypes) => {
    setCommissionUpdate(commissionItem);
    updateCommissionRef.current.openModal();
  };

  const onApproveCommission = () => {};
  const viewDetailCommission = (id: number) =>
    viewDetailRef.current.openModal(id);

  return (
    <Spin
      spinning={isLoadingLoadCommission || isLoadingApproveCommission}
      tip="Loading commission ..."
    >
      {contextHolder}
      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card>
            <Typography.Text className="text-xl font-bold">
              Commission management
            </Typography.Text>
          </Card>
        </Col>
        <UpdateCommissionModel
          ref={updateCommissionRef}
          commissionUpdate={commissionUpdate as CommissionItemTypes}
          onRefreshPage={() => refetch()}
        />

        <ViewDetailComission ref={viewDetailRef} />

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
                viewDetailFn: viewDetailCommission,
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
