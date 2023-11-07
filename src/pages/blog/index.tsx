import { BLOG_TABLE_DATA, BlogColumns } from '@app/modules/admin/pages/blog/constant';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import CreateBlogModel from '@app/modules/admin/pages/blog/CreateBlogModal';
import BlogFilter from '@app/modules/admin/pages/blog/BlogFilter';
import UpdateBlogModel from '@app/modules/admin/pages/blog/UpdateBlogModal';
import { BlogItemTypes } from '@app/modules/admin/pages/blog/type';
import { Card, Col, Row, Typography } from 'antd';
import { useRef, useState } from 'react';
import ViewDetailBlog from '@app/modules/admin/pages/blog/ViewDetailBlog';
import DescriptionModal from '@app/modules/admin/pages/blog/DescriptionModal';
import CreateBlogModal from '@app/modules/admin/pages/blog/CreateBlogModal';
import UpdateMenuModal from '@app/modules/admin/pages/inventory/menu/UpdateMenuModal';


const BlogManagement = () => {
  const [blog, setBlog] = useState<BlogItemTypes[]>(BLOG_TABLE_DATA);
  const createBlogRef = useRef<any>();
  const updateBlogRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const viewDetailRef = useRef<any>();

  const openCreateBlogModal = () => {
    createBlogRef.current.openModal();
  };

  const openUpdateBlogModal = () => {
    updateBlogRef.current.openModal();
  };
  const onOpenDescriptionModal = () => {
    descriptionRef.current.openModal();
  };
  const onViewDetailBlog = () => {
    viewDetailRef.current.openModal();
  };


  const onSearchBlog = async (keyValue: string) => {
    const result = await BLOG_TABLE_DATA.filter((blog) =>
      blog.Name.toLowerCase().includes(keyValue.toLowerCase()),
    );

    setBlog(result);
  };

  return (
    <Row gutter={[14, 14]}>
      <Col span={24}>
        <Card>
          <Typography.Text className="text-xl font-bold">Blog management</Typography.Text>
        </Card>
      </Col>
      <CreateBlogModal ref={createBlogRef} />
      <UpdateMenuModal ref={updateBlogRef} />
      <DescriptionModal ref={descriptionRef} content={'...'} />
      <ViewDetailBlog ref={viewDetailRef} />

      <Col span={24}>
        <Card size="small">
          <BlogFilter onCreateNewBlog={openCreateBlogModal} onSearchBlog={onSearchBlog} />
        </Card>
      </Col>

      <Col span={24}>
        <BaseTable
           columns={BlogColumns({
            updateBlogModal: openCreateBlogModal,
            descriptionModal: onOpenDescriptionModal,
            viewDetailModal: onViewDetailBlog,
          })}
          dataSource={blog}
          scroll={{
            y: (1 - 425 / window.innerHeight) * window.innerHeight,
            x: 1200,
          }}
        />
      </Col>
    </Row>
  );
};

export default BlogManagement;
