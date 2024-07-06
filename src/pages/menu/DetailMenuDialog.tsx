import MENU_API from '@app/api/menu';
import { MenuDetailResponse } from '@app/api/menu/type';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTabs } from '@app/components/common/BaseTabs/BaseTabs';
import { useMutation } from '@tanstack/react-query';
import { Col, Empty, Image, Row, Spin, TabsProps, Tag, Typography, message } from 'antd';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import errorImage from 'assets/error-image-alt.png';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';

const DetailMenuDialog = ({}, ref: any) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [menuId, setMenuId] = useState(-1);

  const {
    isLoading: isLoadingViewDetailMenu,
    data: menuDetail,
    mutate: getMenuDetail,
  } = useMutation({
    mutationFn: MENU_API.getDetailMenu,
    onError: () =>
      messageApi.open({
        type: 'error',
        content: 'Cant get menu detail. Please try again !',
      }),
  });

  const { isLoading: isLoadingDeactive, mutate: mutateDeactive } = useMutation({
    mutationFn: MENU_API.deActiveFoodMenu,
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Deactive menu food is successful. Please try again !',
      }),
        getMenuDetail(menuId);
    },
    onError: () =>
      messageApi.open({
        type: 'error',
        content: 'Cant deactive menu food. Please try again !',
      }),
  });

  useImperativeHandle(ref, () => {
    return {
      openDialog: (menuProps: number) => {
        setMenuId(menuProps);
        getMenuDetail(menuProps);
        setIsOpenDialog(true);
      },
    };
  });

  const onCloseDialog = () => setIsOpenDialog(false);
  const menuDetailResult: MenuDetailResponse = useMemo(() => menuDetail as any, [menuDetail]);

  const onDeactiveFoodMenu = (foodID: number) => {
    mutateDeactive({
      foodID,
      menuID: menuId,
    });
  };

  const convertFoodTabs = (): TabsProps['items'] => {
    if (menuDetailResult) {
      const result: TabsProps['items'] = menuDetailResult.menuFoods.map((food, index) => {
        return {
          key: String(index + 1),
          label: food.food.foodName,
          children: (
            <Row gutter={[24, 24]} className="w-full  ">
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

                  <Tag color={food.food.isActive ? 'green' : 'red'}>{food.food.isActive ? 'Active' : 'Inactive'}</Tag>
                </div>

                <div className="flex items-center gap-x-2 flex-wrap line-clamp-4">
                  <Typography>{food.food.description}</Typography>
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
                  disabled={!food.food.isActive}
                  onClick={() => onDeactiveFoodMenu(food.food.foodID)}
                >
                  InActive
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
      title={menuDetailResult && (menuDetailResult.menuName as string)}
      footer={null}
      width={900}
    >
      {contextHolder}

      <Spin spinning={isLoadingViewDetailMenu || isLoadingDeactive} className="w-full h-full">
        {menuDetailResult && !menuDetailResult.menuFoods.length ? (
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

export default forwardRef(DetailMenuDialog);
