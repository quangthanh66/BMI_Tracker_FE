import { TWorkoutItem } from '@app/api/workout';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { Badge, Descriptions, Tag } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

const WorkoutDetailDialog = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [workoutDetail, setWorkoutDetail] = useState<TWorkoutItem>();

  useImperativeHandle(ref, () => {
    return {
      openModal: (value: TWorkoutItem) => {
        setWorkoutDetail(value);
        setIsOpenModal(true);
      },
    };
  });
  const onCloseModal = () => setIsOpenModal(false);

  return (
    <BaseModal width={600} footer={null} open={isOpenModal} onCancel={onCloseModal} title="Workout Detail">
      {workoutDetail && (
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Name">{workoutDetail?.workoutName}</Descriptions.Item>
          <Descriptions.Item label="Description">{workoutDetail?.workoutDescription}</Descriptions.Item>
          <Descriptions.Item label="Total Calories">{workoutDetail?.totalCloriesBurned}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={workoutDetail.isActive ? 'green' : 'red'}>
              {workoutDetail.isActive ? 'Active' : 'In Active'}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Exercises">
            <div className="flex items-center gap-x-2">
              {workoutDetail.workoutExercises.map((item) => {
                return <Tag key={item.exerciseID}>{item.exerciseName}</Tag>;
              })}
            </div>
          </Descriptions.Item>
        </Descriptions>
      )}
    </BaseModal>
  );
};

export default forwardRef(WorkoutDetailDialog);
