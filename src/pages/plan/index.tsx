import PLAN_API from "@app/api/plan";
import { TPlanItem, TUpdatePlan } from "@app/api/plan/type";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import FilterPlan from "@app/modules/admin/pages/plan/FilterPlan";
import AddNewPlanModal from "@app/modules/admin/pages/plan/modal/AddNewPlanModal";
import UpdatePlanModal from "@app/modules/admin/pages/plan/modal/UpdatePlanModal";
import { PLAN_STATUS } from "@app/utils/constant";
import { SelectTypes } from "@app/utils/helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, Col, Empty, Row, Spin, Tag, Typography, message } from "antd";
import useModal from "antd/lib/modal/useModal";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import DetailPlanDialog from "./DetailPlanDialog";

const PlanManagement = () => {
  const addNewPlanRef = useRef<any>();
  const updatePlanRef = useRef<any>();
  const detailPlanRef = useRef<any>();
  const [modal, modalContextHolder] = useModal();
  const [messageApi, contextHolder] = message.useMessage();
  const [planUpdate, setPlanUpdate] = useState<TUpdatePlan>();
  const [plan, setPlan] = useState<TPlanItem[]>([]);
  const [foodSelect, setFoodSelect] = useState<SelectTypes[]>([]);

  const {
    isLoading,
    refetch,
    data: planList,
  } = useQuery(["get-plan"], PLAN_API.GET_PLAN, {
    enabled: false,
    onSuccess: (response: TPlanItem[]) => {
      setPlan(response);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Cant get plan list. Please try again !",
      });
    },
  });

  const { isLoading: isLoadingDeleteFood, mutate: mutateDeletePlan } =
    useMutation(PLAN_API.UPDATE_PLAN, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Approve plan is successfully",
        });

        refetch();
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Cant delete plan. Please try again !",
        });
      },
    });

  useEffect(() => {
    refetch();
  }, []);

  const addNewPlan = () => {
    addNewPlanRef.current.openModal();
  };

  const onOpenDetailPlanDialog = (planID: number) =>
    detailPlanRef.current.openDialog(planID);

  const searchPlan = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value.toLowerCase();
    const result = planList?.filter((plan) =>
      plan.packageName.toLowerCase().includes(keySearch)
    );
    setPlan(result as TPlanItem[]);
  };

  // const confirmModal = (planID: number) => {
  //   modal.confirm({
  //     title: 'Are you sure to confirm plan ?',
  //     okText: 'Confirm',
  //     cancelText: 'Close',
  //     icon: <ExclamationCircleOutlined />,
  //     onOk: () => {
  //       mutateDeletePlan(planID);
  //     },
  //   });
  // };

  const updatePlan = (plan: TUpdatePlan) => {
    setPlanUpdate(plan);
    updatePlanRef.current.openModal();
  };

  return (
    <Spin spinning={isLoading || isLoadingDeleteFood}>
      {contextHolder}
      {modalContextHolder}

      <DetailPlanDialog ref={detailPlanRef} />

      <UpdatePlanModal
        refetchPage={() => refetch()}
        planUpdate={planUpdate as TUpdatePlan}
        ref={updatePlanRef}
      />

      <AddNewPlanModal
        foodsOptions={foodSelect}
        refetchPage={() => refetch()}
        ref={addNewPlanRef}
      />

      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card size="small">
            <Typography.Text className="text-xl font-bold !text-black">
              Plan management
            </Typography.Text>
          </Card>
        </Col>

        <Col span={24}>
          <FilterPlan addNewPlan={addNewPlan} searchPlan={searchPlan} />
        </Col>
        <Col span={24}>
          <div className="grid grid-cols-4 gap-4 w-full">
            {plan.length > 0 &&
              plan.map((item, index) => {
                return (
                  <div
                    className="flex flex-col  gap-4 w-full h-full p-4 bg-white shadow-lg rounded-md"
                    key={index}
                  >
                    <div className="w-full flex flex-col gap-2 flex-grow">
                      <Typography.Title className="!text-black" level={3}>
                        {item.packageName}
                      </Typography.Title>

                      <Typography.Paragraph className="!text-black text-lg">
                        {item?.description.slice(0, 100)} ...
                        {item.description
                          ? item.description.slice(0, 100)
                          : "..."}
                      </Typography.Paragraph>

                      <Typography.Text className="!text-black">
                        <span style={{ fontWeight: "bold" }}>Created by :</span>{" "}
                        <span style={{ textTransform: "lowercase" }}>
                          {item.fullName}
                        </span>
                      </Typography.Text>

                      <Typography.Text className="!text-black">
                        <span style={{ fontWeight: "bold" }}>Code :</span>{" "}
                        <span style={{ textTransform: "lowercase" }}>
                          {item.packageCode}
                        </span>
                      </Typography.Text>

                      <Typography.Text className="!text-black">
                        <span style={{ fontWeight: "bold" }}>
                          Registered member :
                        </span>{" "}
                        <span style={{ textTransform: "lowercase" }}>
                          {item.numberOfUses} (member)
                        </span>
                      </Typography.Text>

                      <Typography.Text className="!text-black">
                        <span style={{ fontWeight: "bold" }}>Price :</span>{" "}
                        <span style={{ textTransform: "lowercase" }}>
                          {item.price} (VND)
                        </span>
                      </Typography.Text>

                      <Typography.Text className="!text-black">
                        <span style={{ fontWeight: "bold" }}>Duration :</span>{" "}
                        <span style={{ textTransform: "lowercase" }}>
                          {item.packageDuration} (Days)
                        </span>
                      </Typography.Text>

                      <Typography.Text className="!text-black">
                        <span style={{ fontWeight: "bold" }}>Status :</span>{" "}
                        <span className="font-semibold !text-black">
                          {item.packageStatus === "APPROVED" ? (
                            <Tag color="green">Approved</Tag>
                          ) : item.packageStatus === "PENDING" ? (
                            <Tag color="blue">Pending</Tag>
                          ) : (
                            <Tag color="red">Rejected</Tag>
                          )}
                        </span>
                      </Typography.Text>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-2 w-full">
                        {/* <BaseButton danger className="flex-1" onClick={() => confirmModal(item.planID)}>
                      Delete
                      </BaseButton> */}
                        {item.packageStatus === PLAN_STATUS.PENDING && (
                          <BaseButton
                            className="flex-1"
                            type="primary"
                            onClick={() => updatePlan(item)}
                          >
                            Confirm
                          </BaseButton>
                        )}
                      </div>

                      {/* <BaseButton type="primary" onClick={() => onOpenDetailPlanDialog(item.planID)}>
                      View Detail
                    </BaseButton> */}
                    </div>
                  </div>
                );
              })}
          </div>
        </Col>
      </Row>

      {plan.length === 0 && (
        <Col span={24} className="flex justify-center">
          <Empty />
        </Col>
      )}
    </Spin>
  );
};

export default PlanManagement;
