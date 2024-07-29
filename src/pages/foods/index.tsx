import { DeleteOutlined, ExclamationCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import { RecipeItem, TFoodItem, TUpdateFood } from '@app/api/foods';
import FOOD_API from '@app/api/foods/type';
import INGREDIENT_API from '@app/api/ingredients';
import { TIngredientItem } from '@app/api/ingredients/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import FilterFoods from '@app/modules/admin/pages/foods/FilterFoods';
import AddNewFoodModal from '@app/modules/admin/pages/foods/modal/AddNewFoodModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Spin, Row, Col, message, Empty, Card, Typography, Image, Button } from 'antd';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import errorImage from 'assets/error-image-alt.png';
import useModal from 'antd/lib/modal/useModal';
import ViewDetailRecipeDialog from './ViewDetailRecipeDialog';

const FoodManagement = () => {
  const addNewFoodRef = useRef<any>();
  const viewDetailRecipeRef = useRef<any>();

  const [modal, modalContextHolder] = useModal();
  const [messageApi, contextHolder] = message.useMessage();
  const [foods, setFoods] = useState<TFoodItem[]>([]);
  const [foodUpdate, setFoodUpdate] = useState<TFoodItem>();
  const [ingredients, setIngredients] = useState<TIngredientItem[]>([]);

  const {
    isLoading: isLoadingGetAllFoods,
    refetch: getFoods,
    data: foodsList,
  } = useQuery(['get-foods'], FOOD_API.GET_FOODS, {
    enabled: false,
    onSuccess: (response: TFoodItem[]) => {
      setFoods(response);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant get foods list. Please try again !',
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

  const { isLoading: isLoadingDeleteFood, mutate: deleteFoodMutate } = useMutation(FOOD_API.DELETE_FOOD, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Delete food is successfully',
      });

      getFoods();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant delete food. Please try again !',
      });
    },
  });

  useEffect(() => {
    getFoods();
    refetchIngredient();
  }, []);

  const searchFood = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value.toLowerCase();
    const result = foodsList?.filter((food) => food.foodName.toLowerCase().includes(keySearch));
    setFoods(result as TFoodItem[]);
  };

  const confirmModal = (foodID: string) => {
    modal.confirm({
      title: 'Are you sure to delete food ?',
      okText: 'Confirm to delete',
      cancelText: 'Close',
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

  const onViewDetailRecipeDialog = (recipes: RecipeItem[]) => viewDetailRecipeRef.current.openModal(recipes);

  return (
    <Spin spinning={isLoadingGetAllFoods || isLoadingIngredient || isLoadingDeleteFood} tip="Loading foods...">
      {contextHolder}
      {modalContextHolder}

      <AddNewFoodModal
        ref={addNewFoodRef}
        ingredients={ingredients}
        refetchFoodPage={() => getFoods()}
        foodUpdateProps={foodUpdate as TFoodItem}
      />

      <ViewDetailRecipeDialog ref={viewDetailRecipeRef} />

      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card size="small">
            <Typography.Text className="text-xl font-bold">Foods management</Typography.Text>
          </Card>
        </Col>

        <Col span={24}>
          <FilterFoods addNewFood={() => addNewFoodRef.current.openModal()} searchFood={searchFood} />
        </Col>

        <Col span={24}>
          <div className="grid grid-cols-4 gap-4 w-full">
            {foods
              .filter((foodItem) => foodItem.isActive)
              .map((item) => {
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
                      <Typography.Title level={5}>{item.foodName}</Typography.Title>
                      <Typography.Paragraph className="line-clamp-2">{item.description}</Typography.Paragraph>
                      <div className="w-full flex flex-col gap-2">
                        <Typography.Text className="!text-black">
                          <span style={{ fontWeight: 'bold' }}>Time process :</span>{" "}
                          <span style={{ textTransform: 'lowercase' }}>{item.foodTimeProcess} (minutes)</span>
                        </Typography.Text>
                        <Typography.Text className="!text-black">
                          <span style={{ fontWeight: 'bold' }}>Calories :</span>{" "}
                          <span style={{ textTransform: 'lowercase' }}>{item.foodCalories} (kcal)</span>
                        </Typography.Text>
                        <Typography.Text className="!text-black">
                          <span style={{ fontWeight: 'bold' }}>Date :</span>{" "}
                          <span style={{ textTransform: 'lowercase' }}>{item.creationDate}</span>
                        </Typography.Text>
                      </div>
                    </div>

                    <div className="flex items-center mt-4  gap-2 w-full">
                      <BaseButton
                        danger
                        icon={<DeleteOutlined />}
                        className="flex-1"
                        onClick={() => confirmModal(item.foodID)}
                        size="small"
                      >
                        Delete
                      </BaseButton>
                      <BaseButton
                        icon={<FileAddOutlined />}
                        className="flex-1"
                        type="primary"
                        onClick={() => updateFood(item.foodID)}
                        size="small"
                      >
                        Update
                      </BaseButton>
                    </div>

                    <BaseButton size="small" type="primary" onClick={() => onViewDetailRecipeDialog(item.recipes)}>
                      View detail recipe
                    </BaseButton>
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
