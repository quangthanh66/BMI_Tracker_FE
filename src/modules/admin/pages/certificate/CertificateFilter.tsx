import { PlusOutlined } from "@ant-design/icons";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";

type FilterCertificateTypes = {
  onCreateNewCertificate: () => void;
};

const CertificateFilter = ({
  onCreateNewCertificate,
}: FilterCertificateTypes) => {
  return (
    <div className="flex justify-end items-center w-full py-2">
      <BaseButton
        type="primary"
        className="flex items-center "
        icon={<PlusOutlined />}
        onClick={onCreateNewCertificate}
      >
        Add certificate
      </BaseButton>
    </div>
  );
};

export default CertificateFilter;
