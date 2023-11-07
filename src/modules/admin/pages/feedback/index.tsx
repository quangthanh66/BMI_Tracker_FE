import { Card, Col, Row, Typography } from 'antd';
import { useRef } from 'react';
import FeedbackFilter from './FeedbackFilter';
import CreateFeedbackModal from './CreateFeedbackModal';
import UpdateFeedbackModal from './UpdateFeedbackModal';
import { FEEDBACK_TABLE_DATA, FeedbackColumns } from './constant';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import DescriptionModal from './DescriptionModal';
import FeedbackManagement from '@app/pages/feedback';

const Feedback = () => {
  const createFeedbackRef = useRef<any>();
  const updateFeedbackRef = useRef<any>();
  const descriptionRef = useRef<any>();

  const onCreateFeedback = () => {
    createFeedbackRef.current.openModal();
  };

  const onUpdateFeedback = () => {
    updateFeedbackRef.current.openModal();
  };

  const onOpenDescriptionModal = () => {
    console.log('Inside open');
    descriptionRef.current.openModal();
  };

  const onSearchFeedback = (value: string) => {
    console.log(value);
  };
  return (
    <Row gutter={[14, 14]}>
      <CreateFeedbackModal ref={createFeedbackRef} />
      <UpdateFeedbackModal ref={updateFeedbackRef} />
      <DescriptionModal ref={descriptionRef} content="This is a description of the feedback" />

      <Col span={24}>
        <Card>
          <Typography.Text className="text-xl font-bold">Feedback management</Typography.Text>
        </Card>
      </Col>

      <Col span={24}>
        <Card size="small">
          <FeedbackFilter onCreateFeedback={onCreateFeedback} onSearchFeedback={onSearchFeedback} />
        </Card>
      </Col>

      <Col span={24}>
        <BaseTable
          columns={FeedbackColumns({ updateFeedbackModal: onUpdateFeedback, descriptionModal: onOpenDescriptionModal })}
          dataSource={FEEDBACK_TABLE_DATA}
          scroll={{
            y: (1 - 485 / window.innerHeight) * window.innerHeight,
            x: 1200,
          }}
        />
      </Col>
    </Row>
  );
};

export default FeedbackManagement;
