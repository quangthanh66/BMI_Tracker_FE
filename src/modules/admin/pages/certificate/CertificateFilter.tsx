import { PlusOutlined } from '@ant-design/icons';
import { UserItemTypes } from '@app/api/users/type';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { CERTIFICATE_STATUS, USER_ROLES_ENUM } from '@app/utils/constant';
import { Col, Row, Select } from 'antd';
import { debounce } from 'debounce';
import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';

type FilterCertificateTypes = {
  onCreateNewCertificate: () => void;
  onSearchCertificate: (keyValue: string) => void;
};

const CertificateFilter = ({ onCreateNewCertificate, onSearchCertificate }: FilterCertificateTypes) => {
  const userProfileState: UserItemTypes = useSelector((state: any) => state.app.userProfile.payload);

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
      </Row>

      {userProfileState.roleNames === USER_ROLES_ENUM.ROLE_ADVISOR && (
        <BaseButton
          type="primary"
          className="flex items-center "
          icon={<PlusOutlined />}
          onClick={onCreateNewCertificate}
        >
          Create a new Certificate
        </BaseButton>
      )}
    </div>
  );
};

export default CertificateFilter;
