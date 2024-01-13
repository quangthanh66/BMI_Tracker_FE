import MENU_API from '@app/api/menu';
import { TMenuItem } from '@app/api/menu/type';
import FilterMenu from '@app/modules/admin/pages/menu/FilterMenu';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, Col, Empty, Image, Row, Spin, Typography, message } from 'antd';
import useModal from 'antd/lib/modal/useModal';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import errorImage from 'assets/error-image-alt.png';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { DeleteOutlined, ExclamationCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import AddNewMenuModal from '@app/modules/admin/pages/menu/modal/AddNewMenuModal';
import { SelectTypes } from '@app/utils/helper';
import FOOD_API from '@app/api/foods/type';
import { TFoodItem } from '@app/api/foods';
import CATEGORIES_API from '@app/api/categories';
import { TCategoryItem } from '@app/api/categories/type';
import UpdateMenuModal from '@app/modules/admin/pages/menu/modal/UpdateMenuModal';

const MenuTrainer = () => {
  const addNewMenuRef = useRef<any>();
  const updateMenuRef = useRef<any>();

  const [modal, modalContextHolder] = useModal();
  const [messageApi, contextHolder] = message.useMessage();
  const [menuUpdate, setMenuUpdate] = useState<TMenuItem>();
  const [menus, setMenu] = useState<TMenuItem[]>([]);
  const [categoriesSelect, setCategoriesSelect] = useState<SelectTypes[]>([]);
  const [foodSelect, setFoodSelect] = useState<SelectTypes[]>([]);

  const {
    isLoading,
    refetch,
    data: menuList,
  } = useQuery(['get-menus'], MENU_API.GET_MENU, {
    enabled: false,
    onSuccess: (response: TMenuItem[]) => {
      setMenu(response);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant get menu list. Please try again !',
      });
    },
  });

  const { isLoading: isLoadingFoods, refetch: refetchFoods } = useQuery(['get-foods'], FOOD_API.GET_FOODS, {
    enabled: false,
    onSuccess: (response: TFoodItem[]) => {
      const result = response.map((item) => {
        return {
          label: item.foodName,
          value: item.foodId,
        };
      });

      setFoodSelect(result);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant get food list. Please try again !',
      });
    },
  });

  const { isLoading: isLoadingCategory, refetch: refetchCategory } = useQuery(
    ['get-categories'],
    CATEGORIES_API.GET_CATEGORIES,
    {
      enabled: false,
      onSuccess: (response: TCategoryItem[]) => {
        const result = response.map((item) => {
          return {
            label: item.categoryName,
            value: item.categoryId,
          };
        });
        setCategoriesSelect(result);
      },
      onError: () => {
        messageApi.open({
          type: 'error',
          content: 'Cant get categories list. Please try again !',
        });
      },
    },
  );

  const { isLoading: isLoadingDeleteFood, mutate } = useMutation(MENU_API.DELETE_MENU, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Delete menu is successfully',
      });

      refetch();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant delete menu. Please try again !',
      });
    },
  });

  useEffect(() => {
    refetch();
    refetchFoods();
    refetchCategory();
  }, []);

  const addNewMenu = () => {
    addNewMenuRef.current.openModal();
  };

  const searchMenu = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value.toLowerCase();
    const result = menuList?.filter((menu) => menu.menuName.toLowerCase().includes(keySearch));
    setMenu(result as TMenuItem[]);
  };

  const confirmModal = (menuId: string) => {
    modal.confirm({
      title: 'Are you sure to delete menu ?',
      okText: 'Confirm to delete',
      cancelText: 'Close modal',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        mutate(menuId);
      },
    });
  };

  const updateMenu = (menu: TMenuItem) => {
    setMenuUpdate(menu);
    updateMenuRef.current.openModal();
  };

  return (
    <Spin spinning={isLoading || isLoadingFoods || isLoadingCategory || isLoadingDeleteFood}>
      {contextHolder}
      {modalContextHolder}

      <UpdateMenuModal
        categoriesOptions={categoriesSelect}
        foodsOptions={foodSelect}
        refetchPage={() => refetch()}
        menuUpdate={menuUpdate as TMenuItem}
        ref={updateMenuRef}
      />

      <AddNewMenuModal
        categoriesOptions={categoriesSelect}
        foodsOptions={foodSelect}
        refetchPage={() => refetch()}
        ref={addNewMenuRef}
      />

      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card size="small">
            <Typography.Text className="text-xl font-bold">Menu management</Typography.Text>
          </Card>
        </Col>

        <Col span={24}>
          <FilterMenu addNewMenu={addNewMenu} searchMenu={searchMenu} />
        </Col>
        <Col span={24}>
          <div className="grid grid-cols-4 gap-4 w-full">
            {menus.map((item) => {
              return (
                <div className="flex flex-col justify-between gap-4 w-full h-full p-4 bg-white shadow-lg rounded-md">
                  <div className="w-full flex flex-col gap-2 flex-grow">
                    <Image
                      alt="food-alt"
                      src={item.menuPhoto}
                      className="w-full h-[200px] object-cover rounded-md"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = errorImage;
                      }}
                    />
                    <Typography.Title level={5}>{item.menuName}</Typography.Title>
                    <Typography.Paragraph>{item.menuDescription.slice(0, 100)} ...</Typography.Paragraph>
                  </div>

                  <div className="flex items-center  gap-2 w-full">
                    <BaseButton
                      danger
                      icon={<DeleteOutlined />}
                      className="flex-1"
                      onClick={() => confirmModal(item.menuId)}
                    >
                      Delete menu
                    </BaseButton>
                    <BaseButton
                      icon={<FileAddOutlined />}
                      className="flex-1"
                      type="primary"
                      onClick={() => updateMenu(item)}
                    >
                      Update menu
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

export default MenuTrainer;
