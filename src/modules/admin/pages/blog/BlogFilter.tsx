import { BaseInput } from "@app/components/common/inputs/BaseInput/BaseInput";
import { Col, Row } from "antd";
import { debounce } from "debounce";
import { ChangeEvent } from "react";

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
          <BaseInput
            placeholder={"Search..."}
            onChange={debounce(onSearchDataValue, 1000)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default BlogFilter;
