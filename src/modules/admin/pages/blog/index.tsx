import { Card, Col, Row, Spin, Typography } from 'antd';
import { useEffect, useRef } from 'react';
import BlogFilter from './BlogFilter';
import UpdateBlogModal from './UpdateBlogModal';
import DescriptionModal from './DescriptionModal';
import { useQuery } from '@tanstack/react-query';
import BLOG_API from '@app/api/blogs';

const Blog = () => {
  const { isLoading: isLoadingBlogList, refetch: refetchBlogsList } = useQuery(['blogs-list'], BLOG_API.GET_LIST, {
    enabled: false,
    onSuccess: (response) => {
      console.log(response);
    },
    onError: () => {},
  });

  const createBlogRef = useRef<any>();
  const updateBlogRef = useRef<any>();
  const descriptionRef = useRef<any>();

  const onCreateNewBlog = () => {
    createBlogRef.current.openModal();
  };

  const onSearchBlogName = (value: string) => {
    console.log(value);
  };

  const filterBlogStatus = (statusParams: boolean) => {};

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
