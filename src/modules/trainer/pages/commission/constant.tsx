import { BaseTag } from '@app/components/common/BaseTag/BaseTag';
import { CommissionItemTypes } from './type';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import { UserItemTypes } from '@app/api/users/type';
import { Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import { PAYMENT_STATUS } from '@app/utils/constant';

type CommissionColumnsTypes = {
  updateCommissionModal: (commission: CommissionItemTypes) => void;
  approveCommission: (commissionId: string) => void;
};
function convertDateFormat(inputDate: string): string {
  // Split the input date into year, month, and day
  const parts = inputDate.split('-');
  if (parts.length === 3) {
    // Reorder the parts and join them with "-"
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  } else {
    // If the input date is not in the expected format, return an error message
    return 'Invalid date format';
  }
}
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
    render: (a: string) => (a ? dayjs(a).format('DD-MM-YYYY') : '....'),
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Expected PaymentDate',
    dataIndex: 'expectedPaymentDate',
    render: (text: string) => convertDateFormat(text),
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
    //render: (type: string) => <BaseTag color={type === 'PAID' ? 'green' : 'red'}>{type}</BaseTag>,
    render: (type: string) => {
      let color = '';
      switch (type) {
        case 'PAID':
          color = 'green';
          break;
        case 'UNPAID':
          color = 'red';
          break;
        default:
          color = 'geekblue';
      }
      return (
        <BaseTag color={color}>
          {type}
        </BaseTag>
      );
    },
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

