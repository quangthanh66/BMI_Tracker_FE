import { Card, Col, Empty, Image, Row, Spin, Typography, message } from 'antd';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import errorImage from 'assets/error-image-alt.png';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { DeleteOutlined, ExclamationCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import INGREDIENT_API from '@app/api/ingredients';
import { IngredientTypes } from '@app/modules/admin/pages/ingredients/type';
import FilterIngredients from '@app/modules/admin/pages/ingredients/FilterIngredients';
import AddNewIngredientModal from '@app/modules/admin/pages/ingredients/modal/AddNewIngredientModal';
import UpdateIngredientModal from '@app/modules/admin/pages/ingredients/modal/UpdateIngredientModal';
import useModal from 'antd/lib/modal/useModal';
import TagsAPI from '@app/api/tags';
import { TagsRequest } from '@app/api/tags/type';
import { SelectTypes } from '@app/utils/helper';

const IngredientManagement = () => {
  const [ingredientUpdate, setIngredientUpdate] = useState<IngredientTypes>();
  const [ingredients, setIngredients] = useState<IngredientTypes[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [modal, modalContextHolder] = useModal();
  const addNewIngredientRef = useRef<any>();
  const updateIngredientRef = useRef<any>();
  const [tagsOptions, setTagsOptions] = useState<SelectTypes[]>([]);

  const {
    isLoading: isLoadingIngredient,
    refetch,
    data: ingredientsList,
  } = useQuery(['get-ingredients'], INGREDIENT_API.GET_INGREDIENTS, {
    enabled: false,
    onSuccess: (response: IngredientTypes[]) => {
      const availableIngredients = response.filter((item) => item.status !== 'false');
      setIngredients(availableIngredients);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant get ingredient list. Please try again !',
      });
    },
  });

  const { isLoading: isLoadingDelete, mutate } = useMutation(INGREDIENT_API.DELETE_INGREDIENT, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Delete ingredient is successfully',
      });

      refetch();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant delete ingredient. Please try again !',
      });
    },
  });

  const { isLoading: isLoadingTags } = useQuery({
    queryKey: ['tags-key'],
    queryFn: INGREDIENT_API.GET_INGREDIENT_TAGS,
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
      title: 'Are you sure to delete this ingredient ?',
      okText: 'Confirm to delete',
      cancelText: 'Close',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        mutate(id);
      },
    });
  };

  const searchIngredients = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value.toLowerCase();
    const result = ingredientsList?.filter(
      (ingredient) => ingredient.ingredientName.toLowerCase().includes(keySearch) && ingredient.status !== 'false',
    );
    setIngredients(result as IngredientTypes[]);
  };

  const updateIngredient = (item: IngredientTypes) => {
    setIngredientUpdate(item);
    updateIngredientRef.current.openModal();
  };

  return (
    <Spin tip="Loading ingredients ..." spinning={isLoadingIngredient || isLoadingDelete || isLoadingTags}>
      {contextHolder}
      {modalContextHolder}
      <Row gutter={[14, 14]}>
        <AddNewIngredientModal refetchPage={() => refetch()} ref={addNewIngredientRef} tagsSelect={tagsOptions} />

        <UpdateIngredientModal
          refetchFoodPage={() => refetch()}
          ingredientProps={ingredientUpdate as IngredientTypes}
          ref={updateIngredientRef}
          tagsSelect={tagsOptions}
        />

        <Col span={24}>
          <Card size="small">
            <Typography.Text className="text-xl font-bold !text-white ">Ingredients management</Typography.Text>
          </Card>
        </Col>

        <Col span={24}>
          <FilterIngredients
            searchIngredients={searchIngredients}
            addNewIngredient={() => addNewIngredientRef.current.openModal()}
          />
        </Col>

        <Col span={24}>
          <Row gutter={[14, 14]}>
            {ingredients.map((item) => {
              return (
                <Col span={6} key={item.ingredientID}>
                  <Card size="small">
                    <div className="flex flex-col justify-between gap-4 w-full">
                      <div className="w-full flex flex-col gap-4">
                        <Image
                          alt="food-alt"
                          src={item.ingredientPhoto}
                          className="w-full h-[200px] object-cover rounded-md"
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = errorImage;
                          }}
                        />
                        <Typography.Title level={5}>{item.ingredientName}</Typography.Title>
                      </div>

                      <div className="grid grid-cols-2 gap-2 w-full">
                        <BaseButton danger icon={<DeleteOutlined />} onClick={() => confirmModal(item.ingredientID)}>
                          Delete
                        </BaseButton>
                        <BaseButton icon={<FileAddOutlined />} type="primary" onClick={() => updateIngredient(item)}>
                          Update
                        </BaseButton>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>

        {ingredients.length === 0 && (
          <Col span={24} className="flex justify-center">
            <Empty />
          </Col>
        )}
      </Row>
    </Spin>
  );
};

export default IngredientManagement;
