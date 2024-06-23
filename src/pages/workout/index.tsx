import { DeleteOutlined, ExclamationCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import { TWorkoutItem, TUpdateWorkout } from '@app/api/workout';
import WORKOUT_API from '@app/api/workout/type';
import INGREDIENT_API from '@app/api/ingredients';
import { TIngredientItem } from '@app/api/ingredients/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import FilterWorkout from '@app/modules/admin/pages/workout/FilterWorkout';
import AddNewWorkoutModal from '@app/modules/admin/pages/workout/modal/AddNewWorkoutModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Spin, Row, Col, message, Empty, Card, Typography, Image } from 'antd';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import errorImage from 'assets/error-image-alt.png';
import useModal from 'antd/lib/modal/useModal';

const WorkoutManagement = () => {
  const addNewWorkoutRef = useRef<any>();
  const updateWorkoutRef = useRef<any>();

  const [modal, modalContextHolder] = useModal();
  const [messageApi, contextHolder] = message.useMessage();
  const [workout, setWorkout] = useState<TWorkoutItem[]>([]);
  const [workoutUpdate, setWorkoutUpdate] = useState<TWorkoutItem>();
  const [ingredients, setIngredients] = useState<TIngredientItem[]>([]);

  const {
    isLoading: isLoadingGetAllWorkout,
    refetch: getWorkout,
    data: workoutList,
  } = useQuery(['get-workout'], WORKOUT_API.GET_WORKOUT, {
    enabled: false,
    onSuccess: (response: TWorkoutItem[]) => {
      setWorkout(response);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant get Workout list. Please try again !',
      });
    },
  });

  const { isLoading: isLoadingIngredient, refetch: refetchIngredient } = useQuery(
    ['get-ingredients'],
    INGREDIENT_API.GET_INGREDIENTS,
    {
      enabled: false,
      onSuccess: (response: TIngredientItem[]) => {
        setIngredients(response);
      },
      onError: () => {
        messageApi.open({
          type: 'error',
          content: 'Cant get ingredient list. Please try again !',
        });
      },
    },
  );

  const { isLoading: isLoadingDeleteWorkout, mutate: deleteWorkoutMutate } = useMutation(WORKOUT_API.DELETE_WORKOUT, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Delete workout is successfully',
      });

      getWorkout();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant delete Workout. Please try again !',
      });
    },
  });

  useEffect(() => {
    getWorkout();
    refetchIngredient();
  }, []);

  const searchWorkout = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value.toLowerCase();
    const result = workoutList?.filter((workout) => workout.workoutName.toLowerCase().includes(keySearch));
    setWorkout(result as TWorkoutItem[]);
  };

  const confirmModal = (workoutID: string) => {
    modal.confirm({
      title: 'Are you sure to delete Workout ?',
      okText: 'Confirm to delete',
      cancelText: 'Close',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        deleteWorkoutMutate(workoutID);
      },
    });
  };

  const updateWorkout = (workoutID: string) => {
    const workoutIsFound = workoutList?.find((workout) => workout.workoutID === workoutID);
    setWorkoutUpdate(workoutIsFound as TWorkoutItem);
    addNewWorkoutRef.current.openModal();
  };

  return (
    <Spin spinning={isLoadingGetAllWorkout || isLoadingIngredient || isLoadingDeleteWorkout} tip="Loading workouts...">
      {contextHolder}
      {modalContextHolder}

      <AddNewWorkoutModal
        ref={addNewWorkoutRef}
        ingredients={ingredients}
        refetchWorkoutPage={() => getWorkout()}
        workoutUpdateProps={workoutUpdate as TWorkoutItem}
      />

      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card size="small">
            <Typography.Text className="text-xl font-bold">Workouts management</Typography.Text>
          </Card>
        </Col>

        <Col span={24}>
          <FilterWorkout addNewWorkout={() => addNewWorkoutRef.current.openModal()} searchWorkout={searchWorkout} />
        </Col>

        <Col span={24}>
          <div className="grid grid-cols-4 gap-4 w-full">
            {workout
              .filter((workoutItem) => workoutItem.active)
              .map((item) => {
                return (
                  <div
                    className="flex flex-col justify-between gap-2 w-full h-full p-4 bg-black-500 shadow-lg rounded-md"
                    key={item.workoutID}
                  >
                    <div className="w-full flex flex-col gap-2 flex-grow">
                      <Image
                        alt="workout-alt"
                        src={item.foodPhoto}
                        className="w-full h-[200px] object-cover rounded-md"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = errorImage;
                        }}
                      />
                      <Typography.Title level={5}>{item.workoutName}</Typography.Title>
                      <Typography.Paragraph>{item.description.slice(0, 100)} ...</Typography.Paragraph>
                      <div className="flex flex-col justify-between w-full">
                        <Typography.Text>
                          Time process: <span className="font-semibold">{item.foodTimeProcess} minutes</span>
                        </Typography.Text>
                        <Typography.Text>
                          Calories: <span className="font-semibold">{item.foodCalories}</span>
                        </Typography.Text>
                        <Typography.Text>
                          Date: <span className="font-semibold">{item.creationDate}</span>
                        </Typography.Text>

                        {/* <Typography.Text>
                          Status: <span className="font-semibold">{item.active}</span>
                        </Typography.Text> */}
                      </div>
                    </div>

                    <div className="flex items-center mt-4  gap-2 w-full">
                      <BaseButton
                        danger
                        icon={<DeleteOutlined />}
                        className="flex-1"
                        onClick={() => confirmModal(item.workoutID)}
                        size="small"
                      >
                        Delete
                      </BaseButton>
                      <BaseButton
                        icon={<FileAddOutlined />}
                        className="flex-1"
                        type="primary"
                        onClick={() => updateWorkout(item.workoutID)}
                        size="small"
                      >
                        Update
                      </BaseButton>
                    </div>
                  </div>
                );
              })}
          </div>
        </Col>

        {workout.length === 0 && (
          <Col span={24} className="flex justify-center">
            <Empty />
          </Col>
        )}
      </Row>
    </Spin>
  );
};

export default WorkoutManagement;
