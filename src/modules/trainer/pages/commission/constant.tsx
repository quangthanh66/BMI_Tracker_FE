import { BaseTag } from '@app/components/common/BaseTag/BaseTag';
import { CommissionItemTypes } from './type';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import { UserItemTypes } from '@app/api/users/type';
import { Tag, Typography } from 'antd';
import dayjs from 'dayjs';

type CommissionColumnsTypes = {
  updateCommissionModal: (commission: CommissionItemTypes) => void;
  approveCommission: (commissionId: string) => void;
};

export enum CommissionStatus {
  active = 'true',
  deactive = 'false',
}

export const CommissionColumns: any = ({ updateCommissionModal, approveCommission }: CommissionColumnsTypes) => [
  {
    title: 'Created by',
    dataIndex: 'advisorName',
  },
  {
    title: 'Commission Amount',
    dataIndex: 'commissionAmount',
    sortDirections: ['descend'],
  },
  {
    title: 'Commission Rate',
    dataIndex: 'commissionRate',
    sortDirections: ['descend'],
  },
  {
    title: 'Paid Date',
    dataIndex: 'paidDate',
    sorter: (a: string, b: string) => dayjs(a).unix() - dayjs(b).unix(),
    render: (a: string) => (a ? dayjs(a).format('YYYY-MM-DD') : '....'),
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Expected PaymentDate',
    dataIndex: 'expectedPaymentDate',
    sorter: (a: string, b: string) => dayjs(a).unix() - dayjs(b).unix(),
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Paid Amount',
    dataIndex: 'paidAmount',
    sortDirections: ['descend'],
  },
  {
    title: 'Payment Status',
    dataIndex: 'paymentStatus',
    render: (type: string) => <BaseTag color={type === 'PAID' ? 'green' : 'red'}>{type}</BaseTag>,
  },
  {
    title: 'Description',
    dataIndex: 'commissionDescription',
    sortDirections: ['descend'],
  },

  {
    title: 'Actions',
    dataIndex: 'commissionID',
    render: (commissionID: string, commission: CommissionItemTypes) => (
      <div className="flex items-center gap-x-4">
        <BaseTooltip title="Edit commission information">
          <BaseButton
            onClick={() => updateCommissionModal(commission)}
            icon={<EditOutlined className="text-[24px]" />}
            type="text"
          ></BaseButton>
        </BaseTooltip>

        {/* {!commission.status && (
          <BaseTooltip title="Active">
            <BaseButton
              onClick={() => approveCommission(commissionID)}
              icon={<CheckCircleOutlined className="text-[24px]" />}
              type="text"
            ></BaseButton>
          </BaseTooltip>
        )} */}
      </div>
    ),
  },
];
