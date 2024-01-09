import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { Button, Tag } from 'antd';

export type TServiceItemState = {
  serviceId: string;
  nameService: string;
  descriptionService: string;
  status: 'available-service' | 'hidden';
  userId: string;
};

export type TAddNewService = {
  nameService: string;
  descriptionService: string;
  userId: string;
};

export type TUpdateService = {
  serviceId: string;
  nameService: string;
  descriptionService: string;
};

export type TServiceColumnsState = {
  updateService: (service: TServiceItemState) => void;
  deleteService: (serviceId: string) => void;
};
