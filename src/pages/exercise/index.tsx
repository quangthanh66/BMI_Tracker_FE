import { Card, Col, Empty, Image, Row, Spin, Typography, message } from 'antd';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import errorImage from 'assets/error-image-alt.png';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { DeleteOutlined, ExclamationCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import EXERCISE_API from '@app/api/exercise';
import { ExerciseTypes } from '@app/modules/admin/pages/exercise/type';
import FilterExercise from '@app/modules/admin/pages/exercise/FilterExercise';
import AddNewExerciseModal from '@app/modules/admin/pages/exercise/modal/AddNewExerciseModal';
import UpdateExerciseModal from '@app/modules/admin/pages/exercise/modal/UpdateExerciseModal';
import useModal from 'antd/lib/modal/useModal';
import TagsAPI from '@app/api/tags';
import { TagsRequest } from '@app/api/tags/type';
import { SelectTypes } from '@app/utils/helper';

const ExerciseManagement = () => {
  const [exerciseUpdate, setExerciseUpdate] = useState<ExerciseTypes>();
  const [exercise, setExercise] = useState<ExerciseTypes[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [modal, modalContextHolder] = useModal();
  const addNewExerciseRef = useRef<any>();
  const updateExerciseRef = useRef<any>();
  const [tagsOptions, setTagsOptions] = useState<SelectTypes[]>([]);

  const {
    isLoading: isLoadingExercise,
    refetch,
    data: exerciseList,
  } = useQuery(['get-exericse'], EXERCISE_API.GET_EXERCISE, {
    enabled: false,
    onSuccess: (response: ExerciseTypes[]) => {
      const availableExercise = response.filter((item) => item.isActive !== false);
      setExercise(availableExercise);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant get exercise list. Please try again !',
      });
    },
  });

  const { isLoading: isLoadingDelete, mutate } = useMutation(EXERCISE_API.DELETE_EXERCISE, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Delete exercise is successfully',
      });

      refetch();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant delete exercise. Please try again !',
      });
    },
  });

  const { isLoading: isLoadingTags } = useQuery({
    queryKey: ['tags-key'],
    queryFn: TagsAPI.getAllTag,
    onError: () => message.error('Load tags is failed'),
    onSuccess: (response: TagsRequest[]) => {
      const result: SelectTypes[] = response.map((item) => {
        return {
          label: item.tagName,
          value: item.tagID,
        };
      });
      setTagsOptions(result);
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const confirmModal = (id: string) => {
    modal.confirm({
      title: 'Are you sure to delete this exercise ?',
      okText: 'Confirm to delete',
      cancelText: 'Close',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        mutate(id);
      },
    });
  };

  const searchExercise = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value.toLowerCase();
    const result = exerciseList?.filter(
      (exercise) => exercise.exerciseName.toLowerCase().includes(keySearch) && exercise.isActive !== false,
    );
    setExercise(result as ExerciseTypes[]);
  };

  const updateExercise = (item: ExerciseTypes) => {
    setExerciseUpdate(item);
    updateExerciseRef.current.openModal();
  };

  return (
    <Spin tip="Loading exercise ..." spinning={isLoadingExercise || isLoadingDelete || isLoadingTags}>
      {contextHolder}
      {modalContextHolder}
      <Row gutter={[14, 14]}>
        <AddNewExerciseModal refetchPage={() => refetch()} ref={addNewExerciseRef} tagsSelect={tagsOptions} />

        <UpdateExerciseModal
          refetchFoodPage={() => refetch()}
          exerciseProps={exerciseUpdate as ExerciseTypes}
          ref={updateExerciseRef}
        />

        <Col span={24}>
          <Card size="small">
            <Typography.Text className="text-xl font-bold !text-white ">Exercise management</Typography.Text>
          </Card>
        </Col>

        <Col span={24}>
          <FilterExercise
            searchExercise={searchExercise}
            addNewExercise={() => addNewExerciseRef.current.openModal()}
          />
        </Col>

        <Col span={24}>
          <Row gutter={[14, 14]}>
            {exercise.map((item) => {
              return (
                <Col span={6} key={item.exerciseID}>
                  <Card size="small">
                    <div className="flex flex-col justify-between gap-4 w-full">
                      <div className="w-full flex flex-col gap-4">
                        {/* <Image
                          alt="food-alt"
                          src={item.exercisePhoto}
                          className="w-full h-[200px] object-cover rounded-md"
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = errorImage;
                          }}
                        /> */}
                        <Typography.Title level={5}>{item.exerciseName}</Typography.Title>
                      </div>
                      <div className="flex flex-col justify-between w-full">
                        <Typography.Text>
                          Emoji: <span className="font-semibold">{item.emoji}</span>
                        </Typography.Text>
                        <Typography.Text>
                          Duration: <span className="font-semibold">{item.duration}</span>
                        </Typography.Text>
                        <Typography.Text>
                        Calories Burned: <span className="font-semibold">{item.caloriesBurned}</span>
                        </Typography.Text>
                        <Typography.Text>
                        Status: <span className="font-semibold">{item.isActive}</span>
                        </Typography.Text>

                      <div className="grid grid-cols-2 gap-2 w-full">
                        <BaseButton danger icon={<DeleteOutlined />} onClick={() => confirmModal(item.exerciseID)}>
                          Delete
                        </BaseButton>
                        <BaseButton icon={<FileAddOutlined />} type="primary" onClick={() => updateExercise(item)}>
                          Update
                        </BaseButton>
                      </div>
                    </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>

        {exercise.length === 0 && (
          <Col span={24} className="flex justify-center">
            <Empty />
          </Col>
        )}
      </Row>
    </Spin>
  );
};

export default ExerciseManagement;
