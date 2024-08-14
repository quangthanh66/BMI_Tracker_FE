import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { TWorkoutItem } from "@app/api/workout";
import WORKOUT_API from "@app/api/workout/type";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import FilterWorkout from "@app/modules/admin/pages/workout/FilterWorkout";
import AddNewWorkoutModal from "@app/modules/admin/pages/workout/modal/AddNewWorkoutModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, Col, Empty, message, Row, Spin, Tag, Typography } from "antd";
import useModal from "antd/lib/modal/useModal";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import WorkoutDetail from "./WorkoutDetail";

const WorkoutManagement = () => {
  const addNewWorkoutRef = useRef<any>();
  const workoutDetailRef = useRef<any>();

  const [modal, modalContextHolder] = useModal();
  const [messageApi, contextHolder] = message.useMessage();
  const [workout, setWorkout] = useState<TWorkoutItem[]>([]);
  const [workoutUpdate, setWorkoutUpdate] = useState<TWorkoutItem>();

  const {
    isLoading: isLoadingGetAllWorkout,
    refetch: getWorkout,
    data: workoutList,
  } = useQuery(["get-workout"], WORKOUT_API.GET_WORKOUT, {
    enabled: false,
    onSuccess: (response: TWorkoutItem[]) => {
      setWorkout(response);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Cant get Workout list. Please try again !",
      });
    },
  });

  const { isLoading: isLoadingDeleteWorkout, mutate: deleteWorkoutMutate } =
    useMutation(WORKOUT_API.DELETE_WORKOUT, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Delete workout is successfully",
        });

        getWorkout();
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Cant delete Workout. Please try again !",
        });
      },
    });

  useEffect(() => {
    getWorkout();
  }, []);

  const searchWorkout = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value.toLowerCase();
    const result = workoutList?.filter((workout) =>
      workout.workoutName.toLowerCase().includes(keySearch)
    );
    setWorkout(result as TWorkoutItem[]);
  };

  const confirmModal = (workoutID: string) => {
    modal.confirm({
      title: "Are you sure to delete Workout ?",
      okText: "Confirm to delete",
      cancelText: "Close",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        deleteWorkoutMutate(workoutID);
      },
    });
  };

  const updateWorkout = (workoutID: string) => {
    const workoutIsFound = workoutList?.find(
      (workout) => workout.workoutID === workoutID
    );
    setWorkoutUpdate(workoutIsFound as TWorkoutItem);
    addNewWorkoutRef.current.openModal();
  };

  const onOpenWorkoutDetail = (value: TWorkoutItem) => {
    workoutDetailRef.current.openModal(value);
  };

  return (
    <Spin
      spinning={isLoadingGetAllWorkout || isLoadingDeleteWorkout}
      tip="Loading workouts..."
    >
      {contextHolder}
      {modalContextHolder}

      <AddNewWorkoutModal
        ref={addNewWorkoutRef}
        refetchWorkoutPage={() => getWorkout()}
        workoutUpdateProps={workoutUpdate as TWorkoutItem}
      />

      <WorkoutDetail ref={workoutDetailRef} />

      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card size="small">
            <Typography.Text className="text-xl font-bold">
              Workouts management
            </Typography.Text>
          </Card>
        </Col>

        <Col span={24}>
          <FilterWorkout
            addNewWorkout={() => addNewWorkoutRef.current.openModal()}
            searchWorkout={searchWorkout}
          />
        </Col>

        <Col span={24}>
          <div className="grid grid-cols-4 gap-4 w-full">
            {workout.length > 0 &&
              workout.map((item) => {
                return (
                  <div
                    className="flex flex-col  gap-4 w-full h-full p-4 bg-white shadow-lg rounded-md"
                    key={item.workoutID}
                  >
                    <div className="w-full flex flex-col gap-2 flex-grow">
                      <Typography.Title className="!text-black" level={3}>
                        {item.workoutName}
                      </Typography.Title>

                      <Typography.Paragraph className="!text-black text-lg">
                        {item.workoutDescription.slice(0, 100)} ...
                      </Typography.Paragraph>

                      <div className="w-full flex flex-col gap-2 flex-grow">
                        <Typography.Text className="!text-black">
                          <span style={{ fontWeight: "bold" }}>
                            Created by :
                          </span>{" "}
                          <span style={{ textTransform: "lowercase" }}>
                            {item.fullName}
                          </span>
                        </Typography.Text>

                        <Typography.Text className="!text-black">
                          <span style={{ fontWeight: "bold" }}>Calories :</span>{" "}
                          <span style={{ textTransform: "lowercase" }}>
                            {item.totalCaloriesBurned} (Kcal)
                          </span>
                        </Typography.Text>

                        <Typography.Text className="!text-black">
                          <span style={{ fontWeight: "bold" }}>
                            Standard Weight :
                          </span>{" "}
                          <span style={{ textTransform: "lowercase" }}>
                            {item.standardWeight} (Kg)
                          </span>
                        </Typography.Text>

                        <Typography.Text className="!text-black">
                          <span style={{ fontWeight: "bold" }}>Status :</span>{" "}
                          <span className="font-semibold !text-black">
                            {item.isActive ? (
                              <Tag color="green">Activate</Tag>
                            ) : (
                              <Tag color="red">Deactivate</Tag>
                            )}
                          </span>
                        </Typography.Text>
                      </div>
                    </div>

                    <div className="flex items-center mt-4  gap-2 w-full">
                      {/* <BaseButton
                        danger
                        icon={<DeleteOutlined />}
                        className="flex-1"
                        onClick={() => confirmModal(item.workoutID)}
                        size="small"
                      >
                        Delete
                      </BaseButton> */}
                      {/* <BaseButton
                      icon={<FileAddOutlined />}
                      className="flex-1"
                      type="primary"
                      onClick={() => updateWorkout(item.workoutID)}
                      size="small"
                    >
                      Update
                    </BaseButton> */}
                    </div>
                    <BaseButton
                      icon={<EyeOutlined />}
                      type="primary"
                      block
                      size="small"
                      onClick={() => onOpenWorkoutDetail(item)}
                    >
                      View Detail
                    </BaseButton>
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
