import PLAN_API from '@app/api/plan';
import { TPlanItem } from '@app/api/plan/type';
import FilterPlan from '@app/modules/admin/pages/plan/FilterPlan';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, Col, Empty, Image, Row, Spin, Typography, message } from 'antd';
import useModal from 'antd/lib/modal/useModal';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import errorImage from 'assets/error-image-alt.png';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AddNewPlanModal from '@app/modules/admin/pages/plan/modal/AddNewPlanModal';
import { SelectTypes } from '@app/utils/helper';
import FOOD_API from '@app/api/foods/type';
import { TFoodItem } from '@app/api/foods';
import UpdatePlanModal from '@app/modules/admin/pages/plan/modal/UpdatePlanModal';
import DetailPlanDialog from './DetailPlanDialog';
import { USER_ROLES_ENUM } from '@app/utils/constant';
import { UserItemTypes } from '@app/api/users/type';
import { useSelector } from 'react-redux';

const PlanManagement = () => {
  const addNewPlanRef = useRef<any>();
  const updatePlanRef = useRef<any>();
  const detailPlanRef = useRef<any>();
  const userProfileState: UserItemTypes = useSelector((state: any) => state.app.userProfile.payload);
  const [modal, modalContextHolder] = useModal();
  const [messageApi, contextHolder] = message.useMessage();
  const [planUpdate, setPlanUpdate] = useState<TPlanItem>();
  const [plan, setPlan] = useState<TPlanItem[]>([]);
  const [foodSelect, setFoodSelect] = useState<SelectTypes[]>([]);

  const {
    isLoading,
    refetch,
    data: planList,
  } = useQuery(['get-plan'], PLAN_API.GET_PLAN, {
    enabled: false,
    onSuccess: (response: TPlanItem[]) => {
      setPlan(response);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant get plan list. Please try again !',
      });
    },
  });




  const { isLoading: isLoadingFoods, refetch: refetchFoods } = useQuery(['get-foods'], FOOD_API.GET_FOODS, {
    enabled: false,
    onSuccess: (response: TFoodItem[]) => {
      const result = response.map((item) => {
        return {
          label: item.foodName,
          value: item.foodID,
        };
      });

      setFoodSelect(result);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant get food list. Please try again !',
      });
    },
  });


  const { isLoading: isLoadingDeleteFood, mutate: mutateDeletePlan } = useMutation(PLAN_API.DELETE_PLAN, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Delete plan is successfully',
      });

      refetch();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant delete plan. Please try again !',
      });
    },
  });

  useEffect(() => {
    refetch();
    refetchFoods();
  }, []);

  const addNewPlan = () => {
    addNewPlanRef.current.openModal();
  };

  const onOpenDetailPlanDialog = (planID: number) => detailPlanRef.current.openDialog(planID);

  const searchPlan = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value.toLowerCase();
    const result = planList?.filter((plan) => plan.planName.toLowerCase().includes(keySearch));
    setPlan(result as TPlanItem[]);
  };

  const confirmModal = (planID: number) => {
    modal.confirm({
      title: 'Are you sure to delete plan ?',
      okText: 'Delete',
      cancelText: 'Close',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        mutateDeletePlan(planID);
      },
    });
  };

  const updatePlan = (plan: TPlanItem) => {
    setPlanUpdate(plan);
    updatePlanRef.current.openModal();
  };


  return (
    <Spin spinning={isLoading || isLoadingFoods || isLoadingDeleteFood}>
      {contextHolder}
      {modalContextHolder}

      <DetailPlanDialog ref={detailPlanRef} />

      <UpdatePlanModal
        foodsOptions={foodSelect}
        refetchPage={() => refetch()}
        planUpdate={planUpdate as TPlanItem}
        ref={updatePlanRef}
      />

      <AddNewPlanModal foodsOptions={foodSelect} refetchPage={() => refetch()} ref={addNewPlanRef} />

      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card size="small">
            <Typography.Text className="text-xl font-bold !text-white">Plan management</Typography.Text>
          </Card>
        </Col>

        <Col span={24}>
          <FilterPlan addNewPlan={addNewPlan} searchPlan={searchPlan} />
        </Col>
        <Col span={24}>
          <div className="grid grid-cols-4 gap-4 w-full">
            {plan.map((item, index) => {
              return (
                <div
                  className="flex flex-col justify-between gap-4 w-full h-full p-4 bg-white shadow-lg rounded-md"
                  key={index}
                >
                  <div className="w-full flex flex-col gap-2 flex-grow">
                    <Image
                      alt="food-alt"
                      src={item.planPhoto}
                      className="w-full h-[200px] object-cover rounded-md"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = errorImage;
                      }}
                    />
                    <Typography.Title className="!text-black" level={5}>
                      {item.planName}
                    </Typography.Title>
                    <Typography.Paragraph className="!text-black">
                      {/* {item?.menuDescription.slice(0, 100)} ... */}

                      {item.planDescription ? item.planDescription.slice(0, 100) : '...'}
                    </Typography.Paragraph>
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-2 w-full">
                      <BaseButton danger className="flex-1" onClick={() => confirmModal(item.planID)}>
                        Delete plan
                      </BaseButton>
                      <BaseButton className="flex-1" type="primary" onClick={() => updatePlan(item)}>
                        Update plan
                      </BaseButton>
                    </div>

                    <BaseButton type="primary" onClick={() => onOpenDetailPlanDialog(item.planID)}>
                      View Detail
                    </BaseButton>
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
