import {
  CloseCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { RecipeItem, TAddNewFood, TFoodItem } from "@app/api/foods";
import FOOD_API from "@app/api/foods/type";
import { TIngredientItem } from "@app/api/ingredients/type";
import { TagsRequest } from "@app/api/tags/type";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { BaseModal } from "@app/components/common/BaseModal/BaseModal";
import { BaseTag } from "@app/components/common/BaseTag/BaseTag";
import { BaseTypography } from "@app/components/common/BaseTypography/BaseTypography";
import { BaseInput } from "@app/components/common/inputs/BaseInput/BaseInput";
import { imageDb } from "@app/services/firebase/config";
import { SelectTypes, fieldValidate } from "@app/utils/helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Typography,
  message,
} from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import _ from "lodash";
import {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { v4 } from "uuid";
import RecipeDialog from "./RecipeDialog";

const { Option } = Select;

type TAddNewFoodModal = {
  ingredients: TIngredientItem[];
  foodUpdateProps: TFoodItem;
  refetchFoodPage: () => void;
};

const AddNewFoodModal = (
  { ingredients, refetchFoodPage, foodUpdateProps }: TAddNewFoodModal,
  refPage: any
) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [tagsOptions, setTagsOptions] = useState<SelectTypes[]>([]);
  const [ingredientOptions, setIngredientOptions] = useState<SelectTypes[]>([]);
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);

  const recipeRefDialog = useRef<any>();

  const { isLoading: isLoadingHandleFood, mutate: handleFoodMutate } =
    useMutation(FOOD_API.ADD_NEW_FOOD, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Add a new food is successfully",
        });
        setRecipes([]);
        refetchFoodPage();
        onCloseModal();
      },
      onError: (error: { response?: { data?: { message?: string } } }) => {
        const message =
          error.response?.data?.message || "Unknown error occurred";
        messageApi.open({
          type: "error",
          content:
            message === "Food name already exists"
              ? "Food name already exists"
              : "Recipe already exists"
              ? "Recipe already exists"
              : "Can't add new food. Please try again!",
        });
      },
    });

  const { isLoading: isLoadingUpdateFood, mutate: updateFoodMutate } =
    useMutation(FOOD_API.UPDATE_FOOD, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Update food is successfully",
        });

        refetchFoodPage();
        onCloseModal();
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Cant update food . Please try again !",
        });
      },
    });

  const { isLoading: isLoadingTags } = useQuery({
    queryKey: ["tags-key"],
    queryFn: FOOD_API.GET_TAGS_FOOD,
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

  useImperativeHandle(refPage, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  useEffect(() => {
    if (ingredients.length > 0) {
      const availableIngredients = ingredients.filter((item) => item.isActive);
      const convertIngredients = availableIngredients
        .map((item) => ({
          label: item.ingredientName,
          value: item.ingredientID,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically by ingredientName

      setIngredientOptions(convertIngredients);
    }
  }, [ingredients]);

  useEffect(() => {
    if (foodUpdateProps) {
      const convertFoodTags =
        foodUpdateProps.foodTags.length > 0
          ? foodUpdateProps.foodTags.map((item) => item.tagID)
          : [];

      form.setFieldsValue({
        ...foodUpdateProps,
        tagIDs: convertFoodTags,
      });

      setImageUpload(foodUpdateProps.foodPhoto);
    }
  }, [foodUpdateProps]);

  const onCloseModal = () => {
    setImageUrls([]);
    setImageUpload("");
    setIsOpenModal(false);
    form.resetFields();
  };

  const submitForm = (values: TAddNewFood) => {
    const imageResult = _.last(imageUrls) || foodUpdateProps.foodPhoto;
    const convertValues = _.omit(values, ["recipeRequests"]);

    if (foodUpdateProps) {
      updateFoodMutate({
        ...convertValues,
        foodCalories: Number(values.foodCalories),
        foodTimeProcess: Number(values.foodTimeProcess),
        foodID: foodUpdateProps.foodID,
        foodPhoto: imageResult,
        serving: Number(values.serving),
        fat: Number(values.fat),
        protein: Number(values.protein),
        carbs: Number(values.carbs),
      });
    } else {
      handleFoodMutate({
        ...values,
        foodCalories: Number(values.foodCalories),
        foodTimeProcess: Number(values.foodTimeProcess),
        recipeRequests: recipes,
        serving: Number(values.serving),
        foodPhoto: imageResult,
        fat: Number(values.fat),
        protein: Number(values.protein),
        carbs: Number(values.carbs),
      });
    }
  };

  const onOpenRecipeDialog = () => {
    recipeRefDialog.current.openModal();
  };

  const afterClosedRecipeDialog = (value: RecipeItem) => {
    if (value) {
      const result = [...recipes, value];
      setRecipes(result);
    }
  };

  const onRemoveRecipe = (value: RecipeItem) => {
    if (recipes.length > 0) {
      const result = _.without(recipes, value);
      setRecipes(result);
    }
  };

  const getRecipeInfo = (recipeId: number): string => {
    return ingredientOptions.length === 0
      ? ""
      : ingredientOptions.find((item) => item.value === recipeId)?.label || "";
  };

  const [imageUpload, setImageUpload] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<any[]>([]);

  const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || !files[0]) return;

    setImageUpload(URL.createObjectURL(files[0]));
    const imageRef = ref(imageDb, `images/${files[0].name + v4()}`);
    uploadBytes(imageRef, files[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  return (
    <BaseModal
      footer={null}
      open={isOpenModal}
      onCancel={onCloseModal}
      title={
        <BaseTypography className="text-xl">
          {foodUpdateProps ? "Update food" : "Add new food"}
        </BaseTypography>
      }
      width={800}
      style={{ height: "500px", top: "20px", bottom: "20px" }}
    >
      {contextHolder}

      <RecipeDialog
        ingredientSelect={ingredientOptions}
        ref={recipeRefDialog}
        afterClosed={afterClosedRecipeDialog}
        ingredients={ingredients}
      />
      <Spin spinning={isLoadingTags}>
        <Form
          layout="vertical"
          onFinish={submitForm}
          requiredMark={false}
          form={form}
        >
          <Row gutter={[10, 10]}>
            <Col span={8}>
              <Form.Item
                label="Name"
                name="foodName"
                rules={[fieldValidate.required]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Serving (person)"
                name="serving"
                rules={[fieldValidate.required]}
              >
                <Select
                  placeholder="Select number person"
                  dropdownStyle={{ maxHeight: 200, overflow: "auto" }}
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                  <Option value="6">6</Option>
                  <Option value="7">7</Option>
                  <Option value="8">8</Option>
                  <Option value="9">9</Option>
                  <Option value="10">10</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Calories (kcal)"
                name="foodCalories"
                rules={[fieldValidate.required]}
              >
                <Input type="number" min={0} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Carbs (g)"
                name="carbs"
                rules={[fieldValidate.required]}
              >
                <Input type="number" min={0} step="0.1" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Protein (g)"
                name="protein"
                rules={[fieldValidate.required]}
              >
                <Input type="number" min={0} step="0.1" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Fat (g)"
                name="fat"
                rules={[fieldValidate.required]}
              >
                <Input type="number" min={0} step="0.1" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Video Link" name="foodVideo">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Time process (min)"
                name="foodTimeProcess"
                rules={[fieldValidate.required]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Tags"
                name="tagIDs"
                rules={[fieldValidate.required]}
              >
                <Select
                  placeholder="Select a tags"
                  options={tagsOptions}
                  mode="multiple"
                  allowClear
                  value={
                    foodUpdateProps &&
                    foodUpdateProps.foodTags.map((tag) => tag.tagID)
                  }
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Photo" name="foodPhoto">
                <div className="flex items-center justify-between gap-x-2 h-10">
                  <label
                    htmlFor="food-photo"
                    className="border border-blue-400 flex justify-center items-center h-full rounded-md flex-1 cursor-pointer gap-x-2"
                  >
                    <UploadOutlined /> Upload
                  </label>
                </div>
                <input
                  id="food-photo"
                  type="file"
                  onChange={uploadFile}
                  style={{ visibility: "hidden" }}
                />
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item label="Description" name="description">
                <BaseInput.TextArea rows={5} />
              </Form.Item>
            </Col>

            <Col span={12}>
              {imageUpload && (
                <img
                  className=" w-full "
                  style={{ maxWidth: "150px", height: "150px" }}
                  src={imageUpload}
                />
              )}
            </Col>

            {!foodUpdateProps && (
              <>
                <Col span={24}>
                  <div className="flex flex-col gap-y-2">
                    <Typography>Ingredients selected</Typography>

                    <div className="flex items-center gap-2 flex-wrap">
                      {recipes.length > 0 &&
                        recipes.map((value: RecipeItem, index: number) => {
                          return (
                            <BaseTag
                              className="p-2"
                              closeIcon={
                                <CloseCircleOutlined
                                  color="white"
                                  className="ml-2 text-lg text-white"
                                />
                              }
                              closable
                              onClose={() => onRemoveRecipe(value)}
                              key={index}
                            >
                              {getRecipeInfo(value.ingredientID)} :{" "}
                              {value.quantity} {value.unit}
                            </BaseTag>
                          );
                        })}
                    </div>
                  </div>
                </Col>

                <Col span={24}>
                  <BaseButton
                    type="primary"
                    icon={<PlusOutlined />}
                    block
                    onClick={onOpenRecipeDialog}
                  >
                    Add ingredient
                  </BaseButton>
                </Col>
              </>
            )}

            <Col span={24} className="flex justify-end">
              <Space>
                <BaseButton onClick={onCloseModal}>Close</BaseButton>
                <BaseButton
                  className="flex items-center"
                  htmlType="submit"
                  loading={isLoadingHandleFood || isLoadingUpdateFood}
                  disabled={isLoadingHandleFood || isLoadingUpdateFood}
                  type="primary"
                >
                  Confirm
                </BaseButton>
              </Space>
            </Col>
          </Row>
        </Form>
      </Spin>
    </BaseModal>
  );
};

export default forwardRef(AddNewFoodModal);
