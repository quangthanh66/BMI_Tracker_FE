import PLAN_API from '@app/api/plan';
import { PlanDetailResponse } from '@app/api/plan/type';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTabs } from '@app/components/common/BaseTabs/BaseTabs';
import { useMutation } from '@tanstack/react-query';
import { Col, Empty, Image, Row, Spin, TabsProps, Tag, Typography, message } from 'antd';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import errorImage from 'assets/error-image-alt.png';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';

const DetailPlanDialog = ({}, ref: any) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [planId, setPlanId] = useState(-1);

  const {
    isLoading: isLoadingViewDetailPlan,
    data: planDetail,
    mutate: getPlanDetail,
  } = useMutation({
    mutationFn: PLAN_API.getDetailPlan,
    onError: () =>
      messageApi.open({
        type: 'error',
        content: 'Cant get plan detail. Please try again !',
      }),
  });

  const { isLoading: isLoadingDeactive, mutate: mutateDeactive } = useMutation({
    mutationFn: PLAN_API.deActiveFoodMenu,
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Deactive plan food is successful. Please try again !',
      }),
        getPlanDetail(planId);
    },
    onError: () =>
      messageApi.open({
        type: 'error',
        content: 'Cant deactive plan food. Please try again !',
      }),
  });

  useImperativeHandle(ref, () => {
    return {
      openDialog: (planProps: number) => {
        setPlanId(planProps);
        getPlanDetail(planProps);
        setIsOpenDialog(true);
      },
    };
  });

  const onCloseDialog = () => setIsOpenDialog(false);
  const planDetailResult: PlanDetailResponse = useMemo(() => planDetail as any, [planDetail]);

  // const onDeactiveFoodMenu = (foodID: number) => {
  //   mutateDeactive({
  //     foodID,
  //     menuID: PlanID,
  //   });
  // };

  const convertFoodTabs = (): TabsProps['items'] => {
    if (planDetailResult) {
      const result: TabsProps['items'] = planDetailResult.menuFoods.map((food, index) => {
        return {
          key: String(index + 1),
          label: food.food.foodName,
          children: (
            <Row gutter={[4, 4]} className="w-full ">
              <Col span={12} className="min-h-full">
                <Image
                  src={food.food.foodPhoto}
                  className="min-h-full w-full object-cover"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = errorImage;
                  }}
                />
              </Col>
              <Col span={12} className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between">
                  <Typography.Text>{food.food.foodName}</Typography.Text>

                  <Tag color={food.food.active ? 'green' : 'red'}>{food.food.active ? 'Active' : 'Inactive'}</Tag>
                </div>

                <div className="flex items-center gap-x-2 flex-wrap ">
                  <span className="font-semibold">Description</span>: {food.food.description}
                </div>

                <div className="flex items-center gap-x-2 flex-wrap">
                  <span className="font-semibold">Calories</span>: {food.food.foodCalories}
                </div>

                <div className="flex items-center gap-x-2 flex-wrap">
                  <span className="font-semibold">Nutrition</span>: {food.food.foodNutrition}
                </div>

                <div className="flex items-center gap-x-2 flex-wrap">
                  <span className="font-semibold">Time Process</span>: {food.food.foodTimeProcess} minutes
                </div>

                <div className="$ flex-wrap">
                  <span className="font-semibold">Video</span>: {food.food.foodVideo}
                </div>

                <BaseButton
                  type="primary"
                  danger
                  disabled={!food.food.active}
                //  onClick={() => onDeactiveFoodMenu(food.food.foodID)}
                >
                  DeActive
                </BaseButton>
              </Col>
            </Row>
          ),
        };
      });
      return result;
    }

    return [];
  };
  return (
    <BaseModal
      open={isOpenDialog}
      onCancel={onCloseDialog}
      title={planDetailResult && (planDetailResult.planName as string)}
      footer={null}
      width={900}
    >
      {contextHolder}

      <Spin spinning={isLoadingViewDetailPlan || isLoadingDeactive} className="w-full h-full">
        {planDetailResult && !planDetailResult.menuFoods.length ? (
          <Empty />
        ) : (
          <div className=" justify-center  w-full">
            <BaseTabs className="w-full" defaultActiveKey="1" items={convertFoodTabs()} />
          </div>
        )}
      </Spin>
    </BaseModal>
  );
};

export default forwardRef(DetailPlanDialog);
