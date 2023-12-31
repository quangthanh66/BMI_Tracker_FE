import { FeedbackColumns } from '@app/modules/admin/pages/feedback/constant';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import FeedbackFilter from '@app/modules/admin/pages/feedback/FeedbackFilter';
import UpdateFeedbackModel from '@app/modules/admin/pages/feedback/UpdateFeedbackModal';
import { FeedbackItemTypes } from '@app/modules/admin/pages/feedback/type';
import { Card, Col, Row, Spin, Typography, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import FEEDBACK_API from '@app/api/feedbacks';
import CreateFeedbackModal from '@app/modules/admin/pages/feedback/CreateFeedbackModal';

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

  const { mutate: mutateDeleteFeedback, isLoading: isLoadingDeleteFeedback } = useMutation(
    FEEDBACK_API.DELETE_FEEDBACK,
    {
      onSuccess: () => {
        messageApi.open({
          type: 'success',
          content: 'Delete feedback is successful',
        });

        refetch();
      },
      onError: () => {
        messageApi.open({
          type: 'error',
          content: 'Delete feedback is failed. Please try again',
        });
      },
    },
  );

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
        feedback.title.toLowerCase().includes(keyValue.toLowerCase()),
      );
      setFeedback(result);
    }
  };

  const onFilterFeedbackStatu = (status: string) => {
    if (feedbackServer) {
      if (status === 'all') {
        setFeedback(feedbackServer);
      } else {
        const result = feedbackServer.filter(
          (feedBackItem: FeedbackItemTypes) => feedBackItem.status.toLowerCase() === status.toLowerCase(),
        );
        setFeedback(result);
      }
    }
  };

  const deleteFeedbackById = (feedBackId: string) => {
    mutateDeleteFeedback(feedBackId);
  };

  return (
    <Spin spinning={isLoadingLoadFeedback || isLoadingDeleteFeedback} tip="Loading feedbacks ...">
      {contextHolder}
      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card>
            <Typography.Text className="text-xl font-bold">Feedback management</Typography.Text>
          </Card>
        </Col>
        <CreateFeedbackModal ref={createFeedbackRef} onRefreshPage={() => refetch()} />
        <UpdateFeedbackModel
          ref={updateFeedbackRef}
          feedbackUpdate={feedbackUpdate as FeedbackItemTypes}
          onRefreshPage={() => refetch()}
        />
        <Col span={24}>
          <Card size="small">
            <FeedbackFilter
              onCreateFeedback={openCreateFeedbackModal}
              onSearchFeedback={onSearchFeedback}
              onFilterFeedbackStatus={onFilterFeedbackStatu}
            />
          </Card>
        </Col>

        <Col span={24}>
          <BaseTable
            className="max-w-[82vw]"
            columns={FeedbackColumns({
              updateFeedbackModal: openUpdateFeedbackModal,
              deleteFeedBack: deleteFeedbackById,
            })}
            dataSource={feedback}
            scroll={{
              y: (1 - 450 / window.innerHeight) * window.innerHeight,
              x: 1200,
            }}
          />
        </Col>
      </Row>
    </Spin>
  );
};

export default FeedbackManagement;
