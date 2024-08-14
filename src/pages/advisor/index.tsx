import ADVISOR_API from "@app/api/advisor";
import { BaseTable } from "@app/components/common/BaseTable/BaseTable";
import { AdvisorColumns } from "@app/modules/trainer/pages/advisor/constant";
import { AdvisorItemTypes } from "@app/modules/trainer/pages/advisor/type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, Col, Empty, Row, Spin, Typography, message } from "antd";
import { useEffect, useRef, useState } from "react";

const AdvisorManagement = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [advisor, setAdvisor] = useState<AdvisorItemTypes[]>([]);
  const [advisorUpdate, setAdvisorUpdate] = useState<AdvisorItemTypes>();

  const {
    isLoading: isLoadingLoadAdvisor,
    refetch,
    data: advisorServer,
  } = useQuery(["advisor-list"], ADVISOR_API.GET_LIST, {
    onSuccess: (response: any) => {
      setAdvisor(response);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Load Advisor data is failed",
      });
    },
    enabled: false,
  });

  const { isLoading: isLoadingApproveAdvisor, mutate: approveAdvisorMutate } =
    useMutation({
      mutationFn: ADVISOR_API.GET_LIST,
      onSuccess: () => refetch(),
      onError: () =>
        messageApi.open({
          type: "error",
          content: "Approve advisor is failed",
        }),
    });

  const { isLoading: isLoadingActiveAdvisor, mutate: activeAdvisorMutate } =
    useMutation({
      mutationFn: ADVISOR_API.UPDATE_STATUS,
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Active advisor is success",
        });
        refetch();
      },
      onError: () =>
        messageApi.open({
          type: "error",
          content: "Active advisor is failed",
        }),
    });

  const createAdvisorRef = useRef<any>();
  const updateAdvisorRef = useRef<any>();

  useEffect(() => {
    refetch();
  }, []);

  const openCreateAdvisorModal = () => {
    createAdvisorRef.current.openModal();
  };

  const openUpdateAdvisorModal = (advisorItem: AdvisorItemTypes) => {
    setAdvisorUpdate(advisorItem);
    updateAdvisorRef.current.openModal();
  };

  const onSearchAdvisor = async (keyValue: string) => {
    if (advisorServer) {
      // const result = await commissionServer.filter((commission: CommissionItemTypes) =>
      //   commission.title.toLowerCase().includes(keyValue.toLowerCase()),
      // );
      // setCommission(result);
    }
  };

  const onFilterAdvisorStatus = (status: boolean) => {
    if (advisorServer) {
      if (status) {
        setAdvisor(advisorServer);
      } else {
        // const result = commissionServer.filter((commissionItem: CommissionItemTypes) => commissionItem.status === status);
        // setCommission(result);
      }
    }
  };

  const onApproveAdvisor = (advisorID: any) => {
    approveAdvisorMutate(advisorID);
  };

  const onActiveAdvisor = (advisorID: number) => activeAdvisorMutate(advisorID);

  return (
    <Spin
      spinning={
        isLoadingLoadAdvisor ||
        isLoadingApproveAdvisor ||
        isLoadingActiveAdvisor
      }
      tip="Loading advisor ..."
    >
      {contextHolder}
      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card>
            <Typography.Text className="text-xl font-bold">
              Advisor management
            </Typography.Text>
          </Card>
        </Col>
        {/* <UpdateSubscriptionModel
          ref={updateSubscriptionRef}
          subscriptionUpdate={subscriptionUpdate as SubscriptionItemTypes}
          onRefreshPage={() => refetch()}
        /> */}
        {/* <Col span={24}>
          <Card size="small">
            <AdvisorFilter
              onCreateAdvisor={openCreateAdvisorModal}
              onSearchAdvisor={onSearchAdvisor}
              onFilterAdvisorStatus={onFilterAdvisorStatus}
            />
          </Card>
        </Col> */}

        {advisor.length > 0 ? (
          <Col span={24}>
            <BaseTable
              className="max-w-[82vw]"
              columns={AdvisorColumns({
                updateAdvisorModal: openUpdateAdvisorModal,
                approveAdvisor: onApproveAdvisor,
                activeAdvisor: onActiveAdvisor,
              })}
              dataSource={advisor}
              scroll={{
                y: (1 - 325 / window.innerHeight) * window.innerHeight,
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

export default AdvisorManagement;
