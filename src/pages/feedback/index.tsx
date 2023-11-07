import { FEEDBACK_TABLE_DATA, FeedbackColumns } from '@app/modules/admin/pages/feedback/constant';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import CreateFeedbackModel from '@app/modules/admin/pages/feedback/CreateFeedbackModal';
import FeedbackFilter from '@app/modules/admin/pages/feedback/FeedbackFilter';
import UpdateFeedbackModel from '@app/modules/admin/pages/feedback/UpdateFeedbackModal';
import { FeedbackItemTypes } from '@app/modules/admin/pages/feedback/type';
import { Card, Col, Row, Typography } from 'antd';
import { useRef, useState } from 'react';

const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState<FeedbackItemTypes[]>(FEEDBACK_TABLE_DATA);
  const createFeedbackRef = useRef<any>();
  const updateFeedbackRef = useRef<any>();

  const openCreateFeedbackModal = () => {
    createFeedbackRef.current.openModal();
  };

  const openUpdateFeedbackModal = () => {
    updateFeedbackRef.current.openModal();
  };

  const onSearchFeedback = async (keyValue: string) => {
    const result = await FEEDBACK_TABLE_DATA.filter((feedback) =>
      feedback.Name.toLowerCase().includes(keyValue.toLowerCase()),
    );

    setFeedback(result);
  };

  return (
    <Row gutter={[14, 14]}>
      <Col span={24}>
        <Card>
          <Typography.Text className="text-xl font-bold">Feedback management</Typography.Text>
        </Card>
      </Col>
      <CreateFeedbackModel ref={createFeedbackRef} />
      <UpdateFeedbackModel ref={updateFeedbackRef} />
      <Col span={24}>
        <Card size="small">
          <FeedbackFilter onCreateFeedback={openCreateFeedbackModal} onSearchFeedback={onSearchFeedback} />
        </Card>
      </Col>

      <Col span={24}>
        <BaseTable
          columns={FeedbackColumns({ updateFeedbackModal: openCreateFeedbackModal })}
          dataSource={feedback}
          scroll={{
            y: (1 - 450 / window.innerHeight) * window.innerHeight,
            x: 1200,
          }}
        />
      </Col>
    </Row>
  );
};

export default FeedbackManagement;
