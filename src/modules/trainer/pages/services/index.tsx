import SERVICE_API from '@app/api/services';
import { TServiceItemState } from '@app/api/services/type';
import USERS_API from '@app/api/users';
import { UserItemTypes } from '@app/api/users/type';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import FilterServices from '@app/modules/admin/pages/services/FilterServices';
import ServiceActionModal from '@app/modules/admin/pages/services/ServiceActionModal';
import { ServicesColumns } from '@app/modules/admin/pages/services/helper';
import { SelectTypes } from '@app/utils/helper';
import { useMutation, useQuery } from '@tanstack/react-query';
import { message, Spin, Row, Col, Card, Typography } from 'antd';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const TrainerServices = () => {
  const userProfileState: UserItemTypes = useSelector((state: any) => state.app.userProfile.payload);
  const [serviceUpdate, setServiceUpdate] = useState<TServiceItemState>();
  const [messageApi, contextHolder] = message.useMessage();
  const [services, setServices] = useState<TServiceItemState[]>([]);
  const [users, setUsers] = useState<SelectTypes[]>([]);
  const serviceActionRef = useRef<any>();


  const {
    isLoading: isLoadingServices,
    refetch,
    data: originalServices,
  } = useQuery(['services-list'], SERVICE_API.GET_LIST, {
    enabled: false,
    onSuccess: (response: TServiceItemState[]) => {
      const servicesTrainer = response.filter((serviceItem) => serviceItem.userId === userProfileState.accountID);
      setServices(servicesTrainer);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant get services ! Please try again',
      });
    },
  });

  const { isLoading: isLoadingGetUsers, refetch: refetchUsers } = useQuery(['get-users'], USERS_API.GET_LIST, {
    onSuccess: (response: UserItemTypes[]) => {
      const usersRole = response.filter((user) => user.roleName === 'user');
      const usersOptions = usersRole.map((user) => {
        return {
          label: user.fullName,
          value: user.accountID,
        };
      });

      setUsers(usersOptions);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant get users ! Please try again',
      });
    },
  });

  const { isLoading: isLoadingDeleteUser, mutate: mutateDeleteUser } = useMutation(SERVICE_API.DELETE, {
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Delete service is successful ! Please try again',
      });

      refetch();
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Cant delete service ! Please try again',
      });
    },
  });

  useEffect(() => {
    refetch();
    refetchUsers();
  }, []);

  const searchServiceName = (event: ChangeEvent<HTMLInputElement>) => {
    if (originalServices) {
      const result = originalServices.filter((item) =>
        item.nameService.toLowerCase().includes(event.target.value.toLowerCase()),
      );
      setServices(result);
    }
  };
  const selectServiceStatus = (status: string) => {
    if (originalServices) {
      if (!status) {
        setServices(originalServices);
      } else {
        const result = originalServices.filter((item) => item.status === status);
        setServices(result);
      }
    }
  };

  const openAddNewServiceModal = () => {
    serviceActionRef.current.openModal();
  };

  const updateService = (service: TServiceItemState) => {
    setServiceUpdate(service);
    serviceActionRef.current.openModal();
  };

  const deleteService = (serviceId: string) => {
    mutateDeleteUser(serviceId);
  };

  return (
    <Spin spinning={isLoadingServices || isLoadingGetUsers || isLoadingDeleteUser}>
      {contextHolder}
      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card>
            <Typography.Text className="text-xl font-bold">Services management</Typography.Text>
          </Card>
        </Col>

        <ServiceActionModal
          ref={serviceActionRef}
          serviceUpdate={serviceUpdate as TServiceItemState}
          onActionAfterClose={() => refetch()}
          usersSelect={users}
        />

        <Col span={24}>
          <Card size="small">
            <FilterServices
              addNewService={openAddNewServiceModal}
              searchService={searchServiceName}
              selectServiceStatus={selectServiceStatus}
            />
          </Card>
        </Col>

        <Col span={24}>
          <BaseTable
            className="max-w-[82vw]"
            columns={ServicesColumns({ updateService, deleteService })}
            dataSource={services}
            scroll={{
              y: (1 - 465 / window.innerHeight) * window.innerHeight,
              x: 600,
            }}
          />
        </Col>
      </Row>
    </Spin>
  );
};

export default TrainerServices;
