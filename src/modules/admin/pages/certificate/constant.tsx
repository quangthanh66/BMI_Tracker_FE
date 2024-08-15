import { BaseTag } from "@app/components/common/BaseTag/BaseTag";
import { BaseTooltip } from "@app/components/common/BaseTooltip/BaseTooltip";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { BasePopconfirm } from "@app/components/common/BasePopconfirm/BasePopconfirm";
import { Image, Tag } from "antd";
import errorImage from "assets/error-image-alt.png";
import { CERTIFICATE_STATUS } from "@app/utils/constant";
import { CertificateItemTypes } from "@app/api/certificate/type";

type CertificateColumnsTypes = {
  updateCertificateModal: (certificate: CertificateItemTypes) => void;
  viewDetailModal: (certificateProps: CertificateItemTypes) => void;
  deleteCertificate: (certificateID: string) => void;
};

export const CertificateColumns: any = ({
  updateCertificateModal,
  viewDetailModal,
  deleteCertificate,
}: CertificateColumnsTypes) => [
  {
    title: "Name",
    dataIndex: "certificateName",
    sorter: (a: CertificateItemTypes, b: CertificateItemTypes) =>
      a.certificateName.length - b.certificateName.length,
    sortDirections: ["descend"],
  },
  {
    title: "Created by",
    dataIndex: "fullName",
    sorter: (a: CertificateItemTypes, b: CertificateItemTypes) =>
      a.fullName.length - b.fullName.length,
    sortDirections: ["descend"],
  },
  // {
  //   title: "Photo",
  //   dataIndex: "certificateLink",
  //   render: (certificatePhoto: string) => (
  //     <Image
  //       alt="certificate-photo-alt"
  //       src={certificatePhoto}
  //       className="h-[80px] w-full object-cover"
  //       onError={({ currentTarget }) => {
  //         currentTarget.onerror = null; // prevents looping
  //         currentTarget.src = errorImage;
  //       }}
  //     />
  //   ),
  // },
  {
    title: "Link",
    dataIndex: "certificateLink",
  },
  {
    title: "Status",
    dataIndex: "isActive",
    render: (isActive: boolean) => (
      <Tag
        color={
          isActive === true
            ? "green"
            : isActive === false
            ? "volcano"
            : "geekblue"
        }
      >
        {isActive ? "Available" : "Waitting"}
      </Tag>
    ),
    sortDirections: ["descend"],
  },
  {
    title: "Actions",
    dataIndex: "certificateID",
    render: (certificateID: string, certificate: CertificateItemTypes) => (
      <div className="flex items-center gap-x-4">
        <BaseTooltip title="View detail">
          <BaseButton
            onClick={() => viewDetailModal(certificate)}
            icon={<EyeOutlined className="text-[24px]" />}
            type="text"
          ></BaseButton>
        </BaseTooltip>

        <BaseTooltip title="Edit certificate content">
          <BaseButton
            onClick={() => updateCertificateModal(certificate)}
            icon={<EditOutlined className="text-[24px]" />}
            type="text"
          ></BaseButton>
        </BaseTooltip>

        <BaseTooltip title="Delete certificate">
          <BasePopconfirm
            placement="rightTop"
            title="Delete the certificate"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteCertificate(certificateID)}
          >
            <BaseButton
              icon={<DeleteOutlined className="text-[24px]" />}
              danger
              type="text"
            ></BaseButton>
          </BasePopconfirm>
        </BaseTooltip>
      </div>
    ),
  },
];
