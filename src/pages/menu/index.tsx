import { ExclamationCircleOutlined } from "@ant-design/icons";
import { TFoodItem } from "@app/api/foods";
import FOOD_API from "@app/api/foods/type";
import MENU_API from "@app/api/menu";
import { TMenuItem } from "@app/api/menu/type";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import FilterMenu from "@app/modules/admin/pages/menu/FilterMenu";
import AddNewMenuModal from "@app/modules/admin/pages/menu/modal/AddNewMenuModal";
import UpdateMenuModal from "@app/modules/admin/pages/menu/modal/UpdateMenuModal";
import { SelectTypes } from "@app/utils/helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, Col, Empty, Row, Spin, Tag, Typography, message } from "antd";
import useModal from "antd/lib/modal/useModal";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import DetailMenuDialog from "./DetailMenuDialog";

const MenuManagement = () => {
  const addNewMenuRef = useRef<any>();
  const updateMenuRef = useRef<any>();
  const detailMenuRef = useRef<any>();
  const [modal, modalContextHolder] = useModal();
  const [messageApi, contextHolder] = message.useMessage();
  const [menuUpdate, setMenuUpdate] = useState<TMenuItem>();
  const [menus, setMenu] = useState<TMenuItem[]>([]);
  const [foodSelect, setFoodSelect] = useState<SelectTypes[]>([]);

  const {
    isLoading,
    refetch,
    data: menuList,
  } = useQuery(["get-menus"], MENU_API.GET_MENU, {
    enabled: false,
    onSuccess: (response: TMenuItem[]) => {
      setMenu(response);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Cant get menu list. Please try again !",
      });
    },
  });

  const { isLoading: isLoadingFoods, refetch: refetchFoods } = useQuery(
    ["get-foods"],
    FOOD_API.GET_FOODS,
    {
      enabled: false,
      onSuccess: (response: TFoodItem[]) => {
        const result = response.map((item) => {
          return {
            label: item.foodName,
            value: item.foodID,
          };
        });

        setFoodSelect(result);
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Cant get food list. Please try again !",
        });
      },
    }
  );

  const { isLoading: isLoadingDeleteFood, mutate: mutateDeleteMenu } =
    useMutation(MENU_API.DELETE_MENU, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Deactivate menu is successfully",
        });

        refetch();
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Cant Deactivate menu. Please try again !",
        });
      },
    });

  useEffect(() => {
    refetch();
    refetchFoods();
  }, []);

  const addNewMenu = () => {
    addNewMenuRef.current.openModal();
  };

  const onOpenDetailMenuDialog = (menuId: number) =>
    detailMenuRef.current.openDialog(menuId);

  const searchMenu = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value.toLowerCase();
    const result = menuList?.filter((menu) =>
      menu.menuName.toLowerCase().includes(keySearch)
    );
    setMenu(result as TMenuItem[]);
  };

  const confirmModal = (menuID: number) => {
    modal.confirm({
      title: "Are you sure to deactivate menu ?",
      okText: "Deactivate",
      cancelText: "Close",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        mutateDeleteMenu(menuID);
      },
    });
  };

  const updateMenu = (menu: TMenuItem) => {
    setMenuUpdate(menu);
    updateMenuRef.current.openModal();
  };

  return (
    <Spin spinning={isLoading || isLoadingFoods || isLoadingDeleteFood}>
      {contextHolder}
      {modalContextHolder}

      <DetailMenuDialog ref={detailMenuRef} />

      <UpdateMenuModal
        foodsOptions={foodSelect}
        refetchPage={() => refetch()}
        menuUpdate={menuUpdate as TMenuItem}
        ref={updateMenuRef}
      />

      <AddNewMenuModal
        foodsOptions={foodSelect}
        refetchPage={() => refetch()}
        ref={addNewMenuRef}
      />

      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card size="small">
            <Typography.Text className="text-xl font-bold !text-black">
              Menu management
            </Typography.Text>
          </Card>
        </Col>

        <Col span={24}>
          <FilterMenu addNewMenu={addNewMenu} searchMenu={searchMenu} />
        </Col>
        <Col span={24}>
          <div className="grid grid-cols-4 gap-4 w-full">
            {menus.length > 0 &&
              menus.map((item, index) => {
                return (
                  <div
                    className="flex flex-col justify-between gap-4 w-full h-full p-4 bg-white shadow-lg rounded-md"
                    key={index}
                  >
                    <div className="w-full flex flex-col gap-1 flex-grow">
                      <Typography.Title level={5}>
                        {item.menuName}
                      </Typography.Title>
                      <Typography.Paragraph className="!text-black">
                        <span style={{ fontWeight: "bold" }}>
                          Description :
                        </span>{" "}
                        <span style={{ textTransform: "lowercase" }}>
                          {item.menuDescription}
                        </span>
                      </Typography.Paragraph>
                      <Typography.Paragraph className="!text-black">
                        <span style={{ fontWeight: "bold" }}>Total Calories :</span>{" "}
                        <span style={{ textTransform: "lowercase" }}>
                          {item.totalCalories} (kcal)
                        </span>
                      </Typography.Paragraph>
                      <Typography.Paragraph className="!text-black">
                        <span style={{ fontWeight: "bold" }}>Created by :</span>{" "}
                        <span style={{ textTransform: "lowercase" }}>
                          {item.advisorName}
                        </span>
                      </Typography.Paragraph>
                     

                      <Typography.Paragraph className="!text-black">
                        <span style={{ fontWeight: "bold" }}>Using by :</span>
                        {Array.isArray(item.membersUsing) ? (
                          <div style={{ textTransform: "uppercase" }}>
                            {item.membersUsing.map((member, index) => (
                              <div key={index}>{member}</div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ textTransform: "lowercase" }}>
                            {item.membersUsing}
                          </div>
                        )}
                      </Typography.Paragraph>

                      <Typography.Paragraph className="!text-black">
                        <span style={{ fontWeight: "bold" }}>Status :</span>{" "}
                        <span>
                          {item.isActive ? (
                            <Tag color="green">Activate</Tag>
                          ) : (
                            <Tag color="red">Deactivate</Tag>
                          )}
                        </span>
                      </Typography.Paragraph>
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-2 w-full">
                        {/* <BaseButton
                          danger
                          className="flex-1"
                          size="small"
                          onClick={() => confirmModal(item.menuID)}
                        >
                          Deactivate
                        </BaseButton> */}
                      </div>

                      <BaseButton
                        type="primary"
                        size="small"
                        onClick={() => onOpenDetailMenuDialog(item.menuID)}
                      >
                        Detail
                      </BaseButton>
                    </div>
                  </div>
                );
              })}
          </div>
        </Col>
      </Row>

      {menus.length === 0 && (
        <Col span={24} className="flex justify-center">
          <Empty />
        </Col>
      )}
    </Spin>
  );
};

export default MenuManagement;
