import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { CERTIFICATE_STATUS } from '@app/utils/constant';
import { Col, Row, Select } from 'antd';
import { debounce } from 'debounce';
import { ChangeEvent } from 'react';

type FilterCertificateTypes = {
  onCreateNewCertificate: () => void;
  onSearchCertificate: (keyValue: string) => void;
 // onFilterCertificateStatus: (status: string) => void;
};

const CertificateFilter = ({ onCreateNewCertificate, onSearchCertificate, }: FilterCertificateTypes) => {
  const onSearchDataValue = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value;
    onSearchCertificate(keySearch);
  };

  return (
    <div className="flex justify-between items-center w-full py-2">
      <Row gutter={[20, 20]} className="w-[90%]">
        <Col span={6}>
          <BaseInput placeholder={'Enter your certificate name'} onChange={debounce(onSearchDataValue, 1000)} />
        </Col>

        {/* <Col span={6}>
          <Select
            placeholder="Choose your certificate type"
            onChange={onFilterCertificateStatus}
            options={[
              { value: 'All', label: 'All' },
              { value: CERTIFICATE_STATUS.available_certificate, label: 'Available' },
              { value: CERTIFICATE_STATUS.hidden, label: 'Hidden' },
            ]}
            className="w-full"
          ></Select>
        </Col> */}
      </Row>

      <BaseButton type="primary" className="flex items-center " icon={<PlusOutlined />} onClick={onCreateNewCertificate}>
        Create a new Certificate
      </BaseButton>
    </div>
  );
};

export default CertificateFilter;
