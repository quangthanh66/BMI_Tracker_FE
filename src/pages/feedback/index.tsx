import { FeedbackColumns } from '@app/modules/admin/pages/feedback/constant';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import FeedbackFilter from '@app/modules/admin/pages/feedback/FeedbackFilter';
import UpdateFeedbackModel from '@app/modules/admin/pages/feedback/UpdateFeedbackModal';
import { FeedbackItemTypes } from '@app/modules/admin/pages/feedback/type';
import { Card, Col, Empty, Row, Spin, Typography, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import FEEDBACK_API from '@app/api/feedbacks';

const FeedbackManagement = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [feedback, setFeedback] = useState<FeedbackItemTypes[]>([]);
  const [feedbackUpdate, setFeedbackUpdate] = useState<FeedbackItemTypes>();

  const {
    isLoading: isLoadingLoadFeedback,
    refetch,
    data: feedbackServer,
  } = useQuery(['feedbacks-list'], FEEDBACK_API.GET_LIST, {
    onSuccess: (response: any) => {
      setFeedback(response);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Load feedbacks data is failed',
      });
    },
    enabled: false,
  });

  const { isLoading: isLoadingApproveFeedback, mutate: approveFeedbackMutate } = useMutation({
    mutationFn: FEEDBACK_API.APPROVE_FEEDBACK,
    onSuccess: () => refetch(),
    onError: () =>
      messageApi.open({
        type: 'error',
        content: 'Approve Feedback is failed',
      }),
  });

  const createFeedbackRef = useRef<any>();
  const updateFeedbackRef = useRef<any>();

  useEffect(() => {
    refetch();
  }, []);

  const openCreateFeedbackModal = () => {
    createFeedbackRef.current.openModal();
  };

  const openUpdateFeedbackModal = (feedbackItem: FeedbackItemTypes) => {
    setFeedbackUpdate(feedbackItem);
    updateFeedbackRef.current.openModal();
  };

  const onSearchFeedback = async (keyValue: string) => {
    if (feedbackServer) {
      const result = await feedbackServer.filter((feedback: FeedbackItemTypes) =>
        feedback.purpose.toLowerCase().includes(keyValue.toLowerCase()),
      );
      setFeedback(result);
    }
  };

  const onFilterFeedbackStatus = (status: boolean) => {
    if (feedbackServer) {
      if (status) {
        setFeedback(feedbackServer);
      } else {
        const result = feedbackServer.filter((feedBackItem: FeedbackItemTypes) => feedBackItem.status === "status");
        setFeedback(result);
      }
    }
  };

  const onApproveFeedback = (feedbackId: number) => {
    approveFeedbackMutate(feedbackId);
  };

  return (
    <Spin spinning={isLoadingLoadFeedback || isLoadingApproveFeedback} tip="Loading feedbacks ...">
      {contextHolder}
      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card>
            <Typography.Text className="text-xl font-bold">User request management</Typography.Text>
          </Card>
        </Col>
        <UpdateFeedbackModel
          ref={updateFeedbackRef}
          feedbackUpdate={feedbackUpdate as FeedbackItemTypes}
          onRefreshPage={() => refetch()}
        />
        {/* <Col span={24}>
          <Card size="small">
            <FeedbackFilter
              onCreateFeedback={openCreateFeedbackModal}
              onSearchFeedback={onSearchFeedback}
              onFilterFeedbackStatus={onFilterFeedbackStatus}
            />
          </Card>
        </Col> */}

        {feedback.length > 0 ? (
          <Col span={24}>
            <BaseTable
              className="max-w-[82vw]"
              columns={FeedbackColumns({
                updateFeedbackModal: openUpdateFeedbackModal,
                approveFeedback: onApproveFeedback,
              })}
              dataSource={feedback}
              scroll={{
                y: (1 - 310 / window.innerHeight) * window.innerHeight,
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

export default FeedbackManagement;
