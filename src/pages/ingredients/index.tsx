import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import INGREDIENT_API from "@app/api/ingredients";
import { TagsRequest } from "@app/api/tags/type";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import FilterIngredients from "@app/modules/admin/pages/ingredients/FilterIngredients";
import AddNewIngredientModal from "@app/modules/admin/pages/ingredients/modal/AddNewIngredientModal";
import UpdateIngredientModal from "@app/modules/admin/pages/ingredients/modal/UpdateIngredientModal";
import { IngredientTypes } from "@app/modules/admin/pages/ingredients/type";
import { SelectTypes } from "@app/utils/helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Card,
  Col,
  Empty,
  Image,
  Row,
  Spin,
  Tag,
  Typography,
  message,
} from "antd";
import useModal from "antd/lib/modal/useModal";
import errorImage from "assets/error-image-alt.png";
import { ChangeEvent, useEffect, useRef, useState } from "react";

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
  } = useQuery(["get-ingredients"], INGREDIENT_API.GET_INGREDIENTS, {
    enabled: false,
    // onSuccess: (response: IngredientTypes[]) => {
    //   const availableIngredients = response.filter((item) => item.isActive !== false);
    //   setIngredients(availableIngredients);
    // },
    onSuccess: (response: IngredientTypes[]) => {
      setIngredients(response);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Cant get ingredient list. Please try again !",
      });
    },
  });

  const { isLoading: isLoadingDelete, mutate } = useMutation(
    INGREDIENT_API.DELETE_INGREDIENT,
    {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Delete ingredient is successfully",
        });

        refetch();
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Cant delete ingredient. Please try again !",
        });
      },
    }
  );

  const { isLoading: isLoadingTags } = useQuery({
    queryKey: ["tags-key"],
    queryFn: INGREDIENT_API.GET_INGREDIENT_TAGS,
    onError: () => message.error("Load tags is failed"),
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
      title: "Are you sure to delete this ingredient ?",
      okText: "Confirm to delete",
      cancelText: "Close",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        mutate(id);
      },
    });
  };

  const searchIngredients = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value.toLowerCase();
    const result = ingredientsList?.filter(
      (ingredient) =>
        ingredient.ingredientName.toLowerCase().includes(keySearch) &&
        ingredient.isActive !== false
    );
    setIngredients(result as IngredientTypes[]);
  };

  const updateIngredient = (item: IngredientTypes) => {
    setIngredientUpdate(item);
    updateIngredientRef.current.openModal();
  };

  return (
    <Spin
      tip="Loading ingredients ..."
      spinning={isLoadingIngredient || isLoadingDelete || isLoadingTags}
    >
      {contextHolder}
      {modalContextHolder}
      <Row gutter={[14, 14]}>
        <AddNewIngredientModal
          refetchPage={() => refetch()}
          ref={addNewIngredientRef}
          tagsSelect={tagsOptions}
        />

        <UpdateIngredientModal
          refetchFoodPage={() => refetch()}
          ingredientProps={ingredientUpdate as IngredientTypes}
          ref={updateIngredientRef}
          tagsSelect={tagsOptions}
        />

        <Col span={24}>
          <Card size="small">
            <Typography.Text className="text-xl font-bold !text-black ">
              Ingredients management
            </Typography.Text>
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
            {ingredients.length > 0 &&
              [...ingredients].reverse().map((item) => {
                return (
                  <Col span={6} key={item.ingredientID}>
                    <Card size="small">
                      <div className="flex flex-col justify-between gap-4 w-full">
                        <div className="w-full flex flex-col gap-2">
                          <Image
                            alt="food-alt"
                            src={item.ingredientPhoto}
                            className="w-full h-[200px] object-cover rounded-md"
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src = errorImage;
                            }}
                          />
                          <Typography.Title level={5}>
                            {item.ingredientName}
                          </Typography.Title>

                          <Typography.Text className="!text-black">
                            <span style={{ fontWeight: "bold" }}>Unit :</span>{" "}
                            <span style={{ textTransform: "lowercase" }}>
                              {item.unit}
                            </span>
                          </Typography.Text>

                          <Typography.Text className="!text-black">
                            <span style={{ fontWeight: "bold" }}>Tags :</span>{" "}
                            <span
                              style={{
                                textTransform: "lowercase",
                                padding: "2px 4px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                backgroundColor: "#f0f0f0",
                              }}
                            >
                              {item.tag.tagName}
                            </span>
                          </Typography.Text>

                        
                            <Typography.Text className="!text-black">
                              <span style={{ fontWeight: "bold" }}>Status :</span>{" "}
                              <span>
                                {item.isActive ? (
                                  <Tag color="green">Activate</Tag>
                                ) : (
                                  <Tag color="red">Deactivate</Tag>
                                )}
                              </span>
                            </Typography.Text>
                        
                          <div className="flex items-center gap-x-2 text-black"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 w-full">
                          {item.isActive === true && (
                            <BaseButton
                              icon={<FileAddOutlined />}
                              type="primary"
                              onClick={() => updateIngredient(item)}
                            >
                              Update
                            </BaseButton>
                          )}
                          {item.isActive === true && (
                            <BaseButton
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => confirmModal(item.ingredientID)}
                            >
                              Delete
                            </BaseButton>
                          )}
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
