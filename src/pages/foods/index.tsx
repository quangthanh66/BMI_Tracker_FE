import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  FileAddOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { TFoodItem } from "@app/api/foods";
import FOOD_API from "@app/api/foods/type";
import INGREDIENT_API from "@app/api/ingredients";
import { TIngredientItem } from "@app/api/ingredients/type";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import FilterFoods from "@app/modules/admin/pages/foods/FilterFoods";
import AddNewFoodModal from "@app/modules/admin/pages/foods/modal/AddNewFoodModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Card,
  Col,
  Empty,
  Image,
  message,
  Row,
  Spin,
  Tag,
  Typography,
} from "antd";
import useModal from "antd/lib/modal/useModal";
import errorImage from "assets/error-image-alt.png";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ViewDetailRecipeDialog from "./ViewDetailRecipeDialog";

const FoodManagement = () => {
  const addNewFoodRef = useRef<any>();
  const viewDetailRecipeRef = useRef<any>();

  const [modal, modalContextHolder] = useModal();
  const [messageApi, contextHolder] = message.useMessage();
  const [foods, setFoods] = useState<TFoodItem[]>([]);
  const [foodUpdate, setFoodUpdate] = useState<any>();
  const [ingredients, setIngredients] = useState<TIngredientItem[]>([]);

  const {
    isLoading: isLoadingGetAllFoods,
    refetch: getFoods,
    data: foodsList,
  } = useQuery(["get-foods"], FOOD_API.GET_FOODS, {
    enabled: false,
    onSuccess: (response: TFoodItem[]) => {
      setFoods(response);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Cant get foods list. Please try again !",
      });
    },
  });

  const { isLoading: isLoadingIngredient, refetch: refetchIngredient } =
    useQuery(["get-ingredients"], INGREDIENT_API.GET_INGREDIENTS, {
      enabled: false,
      onSuccess: (response: TIngredientItem[]) => {
        setIngredients(response);
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Cant get ingredient list. Please try again !",
        });
      },
    });

  const { isLoading: isLoadingDeleteFood, mutate: deleteFoodMutate } =
    useMutation(FOOD_API.DELETE_FOOD, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Delete food is successfully",
        });

        getFoods();
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Cant delete food. Please try again !",
        });
      },
    });

  useEffect(() => {
    getFoods();
    refetchIngredient();
  }, []);

  const searchFood = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value.toLowerCase();
    const result = foodsList?.filter((food) =>
      food.foodName.toLowerCase().includes(keySearch)
    );
    setFoods(result as TFoodItem[]);
  };

  const confirmModal = (foodID: string) => {
    modal.confirm({
      title: "Are you sure to delete food ?",
      okText: "Confirm to delete",
      cancelText: "Close",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        deleteFoodMutate(foodID);
      },
    });
  };

  const updateFood = (foodID: string) => {
    const foodIsFound = foodsList?.find((food) => food.foodID === foodID);
    setFoodUpdate(foodIsFound as TFoodItem);

    addNewFoodRef.current.openModal();
  };

  const onViewDetailRecipeDialog = (food: TFoodItem) => {
    viewDetailRecipeRef.current.openModal(food);
  };

  return (
    <Spin
      spinning={
        isLoadingGetAllFoods || isLoadingIngredient || isLoadingDeleteFood
      }
      tip="Loading foods..."
    >
      {contextHolder}
      {modalContextHolder}

      <AddNewFoodModal
        ref={addNewFoodRef}
        ingredients={ingredients}
        refetchFoodPage={() => getFoods()}
        foodUpdateProps={foodUpdate as TFoodItem}
      />

      <ViewDetailRecipeDialog
        ref={viewDetailRecipeRef}
        refreshFoods={() => getFoods()}
      />

      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card size="small">
            <Typography.Text className="text-xl font-bold">
              Foods management
            </Typography.Text>
          </Card>
        </Col>

        <Col span={24}>
          <FilterFoods
            addNewFood={() => {
              setFoodUpdate(undefined);
              addNewFoodRef.current.openModal();
            }}
            searchFood={searchFood}
          />
        </Col>

        <Col span={24}>
          <div className="grid grid-cols-4 gap-4 w-full">
            {foods.length > 0 &&
              [...foods].reverse().map((item) => {
                return (
                  <div
                    className="flex flex-col justify-between gap-2 w-full h-full p-4 bg-black-500 shadow-lg rounded-md"
                    key={item.foodID}
                  >
                    <div className="w-full flex flex-col gap-2 flex-grow">
                      <Image
                        alt="food-alt"
                        src={item.foodPhoto}
                        className="w-full h-[200px] object-cover rounded-md"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = errorImage;
                        }}
                      />
                      <Typography.Title level={5}>
                        {item.foodName}
                      </Typography.Title>
                      <Typography.Paragraph className="line-clamp-3">
                        {item.description}
                      </Typography.Paragraph>
                      <div className="w-full flex flex-col gap-2">
                        <Typography.Text className="!text-black">
                          <span style={{ fontWeight: "bold" }}>Tags :</span>{" "}
                          {item.foodTags.length > 0 ? (
                            item.foodTags.map((tag, index) => (
                              <span
                                key={index}
                                style={{
                                  textTransform: "lowercase",
                                  padding: "2px 4px",
                                  border: "1px solid #ccc",
                                  borderRadius: "5px",
                                  backgroundColor: "#00AA00",
                                  marginRight: "5px",
                                  color: "#FFFAF0",
                                }}
                              >
                                {tag.tagName}
                              </span>
                            ))
                          ) : (
                            <span>No tags available</span> // Optional: Message if there are no tags
                          )}
                        </Typography.Text>

                        <Typography.Text className="!text-black">
                          <span style={{ fontWeight: "bold" }}>
                            Time process :
                          </span>{" "}
                          <span style={{ textTransform: "lowercase" }}>
                            {item.foodTimeProcess} (minutes)
                          </span>
                        </Typography.Text>
                        <Typography.Text className="!text-black">
                          <span style={{ fontWeight: "bold" }}>Calories :</span>{" "}
                          <span style={{ textTransform: "lowercase" }}>
                            {item.foodCalories} (kcal)
                          </span>
                        </Typography.Text>

                        <Typography.Text className="!text-black">
                          <span style={{ fontWeight: "bold" }}>
                            Creation Date :
                          </span>{" "}
                          <span style={{ textTransform: "lowercase" }}>
                            {item.creationDate}
                          </span>
                        </Typography.Text>

                        <Typography.Text className="!text-black">
                          <span style={{ fontWeight: "bold" }}>Status :</span>{" "}
                          <span>
                            {item.isActive ? (
                              <Tag
                                color="green"
                                style={{ fontWeight: "bold", fontSize: "16px" }}
                              >
                                Activate
                              </Tag>
                            ) : (
                              <Tag
                                color="red"
                                style={{ fontWeight: "bold", fontSize: "16px" }}
                              >
                                Deactivate
                              </Tag>
                            )}
                          </span>
                        </Typography.Text>

                      </div>
                    </div>

                    <div className="flex items-center mt-4  gap-2 w-full">
                      <BaseButton
                        icon={<ProjectOutlined />}
                        className="flex-1"
                        size="small"
                        type="primary"
                        onClick={() => onViewDetailRecipeDialog(item)}
                      >
                        Recipe
                      </BaseButton>
                      {item.isActive === true && (
                        <BaseButton
                          icon={<FileAddOutlined />}
                          className="flex-1"
                          type="primary"
                          onClick={() => updateFood(item.foodID)}
                          size="small"
                        >
                          Update
                        </BaseButton>
                      )}
                      {item.isActive === true && (
                        <BaseButton
                          danger
                          icon={<DeleteOutlined />}
                          className="flex-1"
                          onClick={() => confirmModal(item.foodID)}
                          size="small"
                        >
                          Deactivate
                        </BaseButton>
                      )}

                    </div>
                  </div>
                );
              })}
          </div>
        </Col>

        {foods.length === 0 && (
          <Col span={24} className="flex justify-center">
            <Empty />
          </Col>
        )}
      </Row>
    </Spin>
  );
};

export default FoodManagement;
