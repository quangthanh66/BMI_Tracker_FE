import { Card, Col, Row, Typography } from 'antd';
import { useRef } from 'react';
import BlogFilter from './BlogFilter';
import CreateBlogModal from './CreateBlogModal';
import UpdateBlogModal from './UpdateBlogModal';
import { BLOG_TABLE_DATA, BlogColumns } from './constant';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import DescriptionModal from './DescriptionModal';
import ViewDetailBlog from './ViewDetailBlog';

const Blog = () => {
  const createBlogRef = useRef<any>();
  const updateBlogRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const viewDetailRef = useRef<any>();

  const onCreateNewBlog = () => {
    createBlogRef.current.openModal();
  };

  const onUpdateBlog = () => {
    updateBlogRef.current.openModal();
  };

  const onOpenDescriptionModal = () => {
    descriptionRef.current.openModal();
  };

  const onSearchBlogName = (value: string) => {
    console.log(value);
  };

  const onViewDetailBlog = () => {
    viewDetailRef.current.openModal();
  };
  

  return (
    <Row gutter={[14, 14]}>
      <CreateBlogModal ref={createBlogRef} />
      <UpdateBlogModal ref={updateBlogRef} />
      <DescriptionModal ref={descriptionRef} content="This is a content of the blog" />
      <ViewDetailBlog ref={viewDetailRef} />

      <Col span={24}>
        <Card>
          <Typography.Text className="text-xl font-bold">Blog management</Typography.Text>
        </Card>
      </Col>

      <Col span={24}>
        <Card size="small">
          <BlogFilter onCreateNewBlog={onCreateNewBlog} onSearchBlog={onSearchBlogName} />
        </Card>
      </Col>

      <Col span={24}>
        <BaseTable
          columns={BlogColumns({
            updateBlogModal: onUpdateBlog,
            descriptionModal: onOpenDescriptionModal,
            viewDetailModal: onViewDetailBlog,
          })}
          dataSource={BLOG_TABLE_DATA}
          scroll={{
            y: (1 - 485 / window.innerHeight) * window.innerHeight,
            x: 1200,
          }}
        />
      </Col>
    </Row>
  );
};

export default Blog;
