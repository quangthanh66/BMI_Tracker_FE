import { SubscriptionColumns } from '@app/modules/trainer/pages/subscription/constant';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import SubscriptionFilter from '@app/modules/trainer/pages/subscription/SubscriptionFilter';
//import UpdateSubscriptionModel from '@app/modules/trainer/pages/subscription/UpdateSubscriptionModal';
import { SubscriptionItemTypes } from '@app/modules/trainer/pages/subscription/type';
import { Card, Col, Empty, Row, Spin, Typography, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import SUBSCRIPTION_API from '@app/api/subscription';

const SubscriptionManagement = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [subscription, setSubscription] = useState<SubscriptionItemTypes[]>([]);
  const [subscriptionUpdate, setSubscriptionUpdate] = useState<SubscriptionItemTypes>();

  const {
    isLoading: isLoadingLoadSubscription,
    refetch,
    data: subscriptionServer,
  } = useQuery(['subscription-list'], SUBSCRIPTION_API.GET_LIST, {
    onSuccess: (response: any) => {
      setSubscription(response);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Load Subscription data is failed',
      });
    },
    enabled: false,
  });

  const { isLoading: isLoadingApproveSubscription, mutate: approveSubscriptionMutate } = useMutation({
    mutationFn: SUBSCRIPTION_API.GET_LIST,
    onSuccess: () => refetch(),
    onError: () =>
      messageApi.open({
        type: 'error',
        content: 'Approve Subscription is failed',
      }),
  });

  const createSubscriptionRef = useRef<any>();
  const updateSubscriptionRef = useRef<any>();

  useEffect(() => {
    refetch();
  }, []);

  const openCreateSubscriptionModal = () => {
    createSubscriptionRef.current.openModal();
  };

  const openUpdateSubscriptionModal = (subscriptionItem: SubscriptionItemTypes) => {
    setSubscriptionUpdate(subscriptionItem);
    updateSubscriptionRef.current.openModal();
  };

  const onSearchSubscription = async (keyValue: string) => {
    if (subscriptionServer) {
      // const result = await commissionServer.filter((commission: CommissionItemTypes) =>
      //   commission.title.toLowerCase().includes(keyValue.toLowerCase()),
      // );
      // setCommission(result);
    }
  };

  const onFilterSubscriptionStatus = (status: boolean) => {
    if (subscriptionServer) {
      if (status) {
        setSubscription(subscriptionServer);
      } else {
        // const result = commissionServer.filter((commissionItem: CommissionItemTypes) => commissionItem.status === status);
        // setCommission(result);
      }
    }
  };

  const onApproveSubscription = (subscriptionID: any) => {
    approveSubscriptionMutate(subscriptionID);
  };

  return (
    <Spin spinning={isLoadingLoadSubscription || isLoadingApproveSubscription} tip="Loading subscription ...">
      {contextHolder}
      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card>
            <Typography.Text className="text-xl font-bold">Subscription management</Typography.Text>
          </Card>
        </Col>
        {/* <UpdateSubscriptionModel
          ref={updateSubscriptionRef}
          subscriptionUpdate={subscriptionUpdate as SubscriptionItemTypes}
          onRefreshPage={() => refetch()}
        /> */}
        {/* <Col span={24}>
          <Card size="small">
            <SubscriptionFilter
              onCreateSubscription={openCreateSubscriptionModal}
              onSearchSubscription={onSearchSubscription}
              onFilterSubscriptionStatus={onFilterSubscriptionStatus}
            />
          </Card>
        </Col> */}

        {subscription.length > 0 ? (
          <Col span={24}>
            <BaseTable
              className="max-w-[82vw]"
              columns={SubscriptionColumns({
                updateSubscriptionModal: openUpdateSubscriptionModal,
                approveSubscription: onApproveSubscription,
              })}
              dataSource={subscription}
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

export default SubscriptionManagement;
