import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TServiceColumnsState, TServiceItemState } from '@app/api/services/type';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { Button, Tag } from 'antd';

export const ServicesColumns: any = ({ updateService, deleteService }: TServiceColumnsState) => [
  {
    title: 'Name',
    dataIndex: 'nameService',
  },
  {
    title: 'Description',
    dataIndex: 'descriptionService',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: string) => <Tag color={status === 'hidden' ? 'volcano' : 'green'}>{status}</Tag>,
  },
  {
    title: 'Action',
    dataIndex: 'serviceId',
    render: (id: string, service: TServiceItemState) => {
      return (
        <div className="flex items-center gap-x-4">
          <BaseTooltip title="Edit service">
            <Button
              onClick={() => updateService(service)}
              icon={<EditOutlined className="text-[24px]" />}
              type="text"
            ></Button>
          </BaseTooltip>

          {service.status !== 'hidden' && (
            <BaseTooltip title="Delete service">
              <BasePopconfirm
                placement="rightTop"
                title="Delete service"
                okText="Yes"
                cancelText="No"
                onConfirm={() => deleteService(id)}
              >
                <Button icon={<DeleteOutlined className="text-[24px]" />} danger type="text"></Button>
              </BasePopconfirm>
            </BaseTooltip>
          )}
        </div>
      );
    },
  },
];
