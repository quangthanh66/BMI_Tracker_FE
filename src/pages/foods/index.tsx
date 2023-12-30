import { DeleteOutlined, ExclamationCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import CATEGORIES_API from '@app/api/categories';
import { TCategoryItem } from '@app/api/categories/type';
import { TFoodItem } from '@app/api/foods';
import FOOD_API from '@app/api/foods/type';
import INGREDIENT_API from '@app/api/ingredients';
import { TIngredientItem } from '@app/api/ingredients/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import FilterFoods from '@app/modules/admin/pages/foods/FilterFoods';
import AddNewFoodModal from '@app/modules/admin/pages/foods/modal/AddNewFoodModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Spin, Row, Col, message, Empty, Card, Typography, Image, Space } from 'antd';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import errorImage from 'assets/error-image-alt.png';
import useModal from 'antd/lib/modal/useModal';
import UpdateFoodModal from '@app/modules/admin/pages/foods/modal/UpdateFoodModal';

const FoodManagement = () => {
  const addNewFoodRef = useRef<any>();
  const updateFoodRef = useRef<any>();
  const viewFoodDetailRef = useRef<any>();

  const [modal, modalContextHolder] = useModal();
  const [messageApi, contextHolder] = message.useMessage();
  const [foods, setFoods] = useState<TFoodItem[]>([]);
  const [foodUpdate, setFoodUpdate] = useState<TFoodItem>();
  const [categories, setCategories] = useState<TCategoryItem[]>([]);
  const [ingredients, setIngredients] = useState<TIngredientItem[]>([]);

  const {
    isLoading,
    refetch,
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

  const { isLoading: isLoadingCategories, refetch: refetchCategories } = useQuery(
    ['get-category'],
    CATEGORIES_API.GET_CATEGORIES,
    {
      enabled: false,
      onSuccess: (response: TCategoryItem[]) => {
        setCategories(response);
      },
      onError: () => {
        messageApi.open({
          type: 'error',
          content: 'Cant get categories list. Please try again !',
        });
      },
    },
  );

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

  const { isLoading: isLoadingDeleteFood, mutate } = useMutation(FOOD_API.DELETE_FOOD, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Delete food is successfully',
      });

      refetch();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant delete food. Please try again !',
      });
    },
  });

  useEffect(() => {
    refetch();
    refetchCategories();
    refetchIngredient();
  }, []);

  const searchFood = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value.toLowerCase();
    const result = foodsList?.filter((food) => food.foodName.toLowerCase().includes(keySearch));
    setFoods(result as TFoodItem[]);
  };

  const filterFoodStatus = (status: string) => {
    if (status === 'all') {
      setFoods(foodsList as TFoodItem[]);
    } else {
      const newFoodsList = foodsList?.filter((food) => food.status.toLowerCase() === status.toLowerCase());
      setFoods(newFoodsList as TFoodItem[]);
    }
  };

  const confirmModal = (foodId: string) => {
    modal.confirm({
      title: 'Are you sure to delete food ?',
      okText: 'Confirm to delete',
      cancelText: 'Close modal',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        mutate(foodId);
      },
    });
  };

  const updateFood = (foodId: string) => {
    const foodIsFound = foodsList?.find((food) => food.foodId === foodId);
    setFoodUpdate(foodIsFound as TFoodItem);
    updateFoodRef.current.openModal();
  };

  return (
    <Spin
      spinning={isLoading || isLoadingCategories || isLoadingIngredient || isLoadingDeleteFood}
      tip="Loading foods..."
    >
      {contextHolder}
      {modalContextHolder}

      <AddNewFoodModal
        ref={addNewFoodRef}
        categories={categories}
        ingredients={ingredients}
        refetchFoodPage={() => refetch()}
      />

      <UpdateFoodModal
        ref={updateFoodRef}
        categories={categories}
        ingredients={ingredients}
        refetchFoodPage={() => refetch()}
        foodUpdate={foodUpdate as TFoodItem}
      />

      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card size="small">
            <Typography.Text className="text-xl font-bold">Foods management</Typography.Text>
          </Card>
        </Col>

        <Col span={24}>
          <FilterFoods
            addNewFood={() => addNewFoodRef.current.openModal()}
            searchFood={searchFood}
            filterFoodStatus={filterFoodStatus}
          />
        </Col>

        <Col span={24}>
          <Row gutter={[14, 14]}>
            {foods.map((item) => {
              return (
                <Col span={6} key={item.foodId}>
                  <Card size="small">
                    <div className="flex flex-col justify-between gap-4 w-full">
                      <div className="w-full flex flex-col gap-2">
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
                        <Typography.Paragraph>{item.foodDesciption.slice(0, 100)} ...</Typography.Paragraph>
                        <div className="flex justify-between w-full">
                          <Typography.Text>
                            Time process: <span className="font-semibold">{item.foodtimeProcess} minutes</span>
                          </Typography.Text>
                          <Typography.Text>
                            Calories: <span className="font-semibold">{item.foodCalorios}</span>
                          </Typography.Text>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full">
                        <BaseButton
                          danger
                          icon={<DeleteOutlined />}
                          className="flex-1"
                          onClick={() => confirmModal(item.foodId)}
                        >
                          Delete food
                        </BaseButton>
                        <BaseButton
                          icon={<FileAddOutlined />}
                          className="flex-1"
                          type="primary"
                          onClick={() => updateFood(item.foodId)}
                        >
                          Update food
                        </BaseButton>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
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
