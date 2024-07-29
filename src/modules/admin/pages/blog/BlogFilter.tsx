import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BLOG_STATUS } from '@app/utils/constant';
import { Col, Row, Select } from 'antd';
import { debounce } from 'debounce';
import { ChangeEvent } from 'react';

type FilterBlogTypes = {
  onCreateNewBlog: () => void;
  onSearchBlog: (keyValue: string) => void;
  onFilterBlogStatus: (status: boolean) => void;
};

const BlogFilter = ({ onCreateNewBlog, onSearchBlog }: FilterBlogTypes) => {
  const onSearchDataValue = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value;
    onSearchBlog(keySearch);
  };

  return (
    <div className="flex justify-between items-center w-full py-2">
      <Row gutter={[20, 20]} className="w-[90%]">
        <Col span={6}>
          <BaseInput placeholder={'Search...'} onChange={debounce(onSearchDataValue, 1000)} />
        </Col>

        {/* <Col span={6}>
          <Select
            placeholder="Choose your blog type"
            onChange={onFilterBlogStatus}
            options={[
              { value: 'All', label: 'All' },
              { value: BLOG_STATUS.true, label: 'Available' },
              { value: BLOG_STATUS.false, label: 'Hidden' },
            ]}
            className="w-full"
          ></Select>
        </Col> */}
      </Row>

      {/* <BaseButton type="primary" className="flex items-center " icon={<PlusOutlined />} onClick={onCreateNewBlog}>
        Create a new blog
      </BaseButton> */}
    </div>
  );
};

export default BlogFilter;
