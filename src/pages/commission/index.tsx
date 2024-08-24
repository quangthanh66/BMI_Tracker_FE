import COMMISSION_API from "@app/api/commission";
import { BaseTable } from "@app/components/common/BaseTable/BaseTable";
import CommissionFilter from "@app/modules/trainer/pages/commission/CommissionFilter";
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
  const [originalCommissions, setOriginalCommissions] = useState<
    CommissionItemTypes[]
  >([]);
  const [commissionUpdate, setCommissionUpdate] =
    useState<CommissionItemTypes>();

  const { isLoading: isLoadingLoadCommission, refetch } = useQuery(
    ["commission-list"],
    COMMISSION_API.GET_LIST,
    {
      onSuccess: (response: any) => {
        setCommission(response);
        setOriginalCommissions(response);
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

  const createCommissionRef = useRef<any>();

  const openCreateCommissionModal = () => {
    createCommissionRef.current.openModal();
  };

  const { isLoading: isLoadingApproveCommission } = useMutation({
    mutationFn: COMMISSION_API.APPROVE_COMMISSION,
    onSuccess: () => refetch(),
    onError: () =>
      messageApi.open({
        type: "error",
        content: "Approve commission is failed",
      }),
  });
  const onSearchCommission = async (keyValue: string) => {};

  const onFilterCommissionStatus = (status: string) => {
    console.log("Filtering by status:", status);
    if (status === "All") {
      setCommission(originalCommissions); // Show all commissions
    } else if (status) {
      const result = originalCommissions.filter(
        (commissionItem: CommissionItemTypes) =>
          commissionItem.paymentStatus === status
      );
      setCommission(result); // Filtered commissions
    }
  };

  const updateCommissionRef = useRef<any>();
  const viewDetailRef = useRef<any>();

  useEffect(() => {
    refetch();
  }, []);

  const openUpdateCommissionModal = (commissionItem: CommissionItemTypes) => {
    setCommissionUpdate(commissionItem);
    updateCommissionRef.current.openModal();
  };

  const viewDetailCommission = (id: number) =>
    viewDetailRef.current.openModal(id);

  return (
    <Spin
      spinning={isLoadingLoadCommission || isLoadingApproveCommission}
      tip="Loading commission ..."
    >
      {contextHolder}
      <Row gutter={[14, 14]}>
        <Col span={12}>
          <Card>
            <Typography.Text className="text-xl font-bold">
              Commission management
            </Typography.Text>
          </Card>
        </Col>
        <Col span={12}>
          <CommissionFilter
            onCreateCommission={openCreateCommissionModal}
            onSearchCommission={onSearchCommission}
            onFilterCommissionStatus={onFilterCommissionStatus}
          />
        </Col>
        <UpdateCommissionModel
          ref={updateCommissionRef}
          commissionUpdate={commissionUpdate as CommissionItemTypes}
          onRefreshPage={() => refetch()}
        />

        <ViewDetailComission ref={viewDetailRef} />

        {commission.length > 0 ? (
          <Col span={24}>
            <BaseTable
              className="max-w-[82vw]"
              columns={CommissionColumns({
                updateCommissionModal: openUpdateCommissionModal,
                viewDetailFn: viewDetailCommission,
              })}
              dataSource={commission}
              pagination={false}
              scroll={{
                y: (1 - 320 / window.innerHeight) * window.innerHeight,
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
