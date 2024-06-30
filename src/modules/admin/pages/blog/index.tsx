import { Card, Col, Row, Spin, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import BlogFilter from './BlogFilter';
import CreateBlogModal from './CreateBlogModal';
import UpdateBlogModal from './UpdateBlogModal';
import { BlogColumns } from './constant';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import DescriptionModal from './DescriptionModal';
import ViewDetailBlog from './ViewDetailBlog';
import { useQuery } from '@tanstack/react-query';
import BLOG_API from '@app/api/blogs';

const Blog = () => {
  const {
    isLoading: isLoadingBlogList,
    refetch: refetchBlogsList,
    data: blogsListServer,
  } = useQuery(['blogs-list'], BLOG_API.GET_LIST, {
    enabled: false,
    onSuccess: (response) => {
      console.log(response);
    },
    onError: () => {},
  });

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

  const filterBlogStatus = (statusParams: boolean) => {};

  const onViewDetailBlog = () => {
    viewDetailRef.current.openModal();
  };

  useEffect(() => {
    refetchBlogsList();
  }, []);

  return (
    <Spin spinning={isLoadingBlogList} tip="Loading blogs...">
      <Row gutter={[14, 14]}>
        <UpdateBlogModal ref={updateBlogRef} />
        <DescriptionModal ref={descriptionRef} content="This is a content of the blog" />

        <Col span={24}>
          <Card>
            <Typography.Text className="text-xl font-bold">Blog management</Typography.Text>
          </Card>
        </Col>

        <Col span={24}>
          <Card size="small">
            <BlogFilter
              onCreateNewBlog={onCreateNewBlog}
              onSearchBlog={onSearchBlogName}
              onFilterBlogStatus={filterBlogStatus}
            />
          </Card>
        </Col>
      </Row>
    </Spin>
  );
};

export default Blog;
