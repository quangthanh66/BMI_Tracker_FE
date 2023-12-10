import { BlogColumns } from '@app/modules/admin/pages/blog/constant';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import BlogFilter from '@app/modules/admin/pages/blog/BlogFilter';
import { Card, Col, Row, Spin, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ViewDetailBlog from '@app/modules/admin/pages/blog/ViewDetailBlog';
import DescriptionModal from '@app/modules/admin/pages/blog/DescriptionModal';
import CreateBlogModal from '@app/modules/admin/pages/blog/CreateBlogModal';
import UpdateMenuModal from '@app/modules/admin/pages/inventory/menu/UpdateMenuModal';
import { useQuery } from '@tanstack/react-query';
import BLOG_API from '@app/api/blogs';
import { BlogItemTypes } from '@app/api/blogs/type';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<BlogItemTypes[]>([]);
  const {
    isLoading: isLoadingBlogList,
    refetch: refetchBlogsList,
    data: blogsListServer,
  } = useQuery(['blogs-list'], BLOG_API.GET_LIST, {
    enabled: false,
    onSuccess: (response: any) => {
      setBlogs(response);
    },
    onError: () => {},
  });

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

  const onSearchBlog = (keyValue: string) => {
    const result = blogsListServer.filter((blog: BlogItemTypes) =>
      blog.blogName.toLowerCase().includes(keyValue.toLowerCase()),
    );
    setBlogs(result);
  };

  const onFilterBlog = (blogStatus: string) => {
    if (blogStatus === 'All') {
      setBlogs(blogsListServer);
    } else {
      const result = blogsListServer.filter((blog: BlogItemTypes) => {
        return blog.status === blogStatus;
      });

      setBlogs(result);
    }
  };

  useEffect(() => {
    refetchBlogsList();
  }, []);

  return (
    <Spin spinning={isLoadingBlogList} tip="Loading blogs ....">
      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card>
            <Typography.Text className="text-xl font-bold">Blog management</Typography.Text>
          </Card>
        </Col>
        <CreateBlogModal ref={createBlogRef} onRefreshPage={() => refetchBlogsList()} />
        <UpdateMenuModal ref={updateBlogRef} />
        <DescriptionModal ref={descriptionRef} content={'...'} />
        <ViewDetailBlog ref={viewDetailRef} />

        <Col span={24}>
          <Card size="small">
            <BlogFilter
              onCreateNewBlog={openCreateBlogModal}
              onSearchBlog={onSearchBlog}
              onFilterBlogStatus={onFilterBlog}
            />
          </Card>
        </Col>

        <Col span={24}>
          <BaseTable
            columns={BlogColumns({
              updateBlogModal: openCreateBlogModal,
              descriptionModal: onOpenDescriptionModal,
              viewDetailModal: onViewDetailBlog,
            })}
            dataSource={blogs}
            scroll={{
              y: (1 - 425 / window.innerHeight) * window.innerHeight,
              x: 1200,
            }}
          />
        </Col>
      </Row>
    </Spin>
  );
};

export default BlogManagement;
