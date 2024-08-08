import { BlogColumns } from "@app/modules/admin/pages/blog/constant";
import { BaseTable } from "@app/components/common/BaseTable/BaseTable";
import BlogFilter from "@app/modules/admin/pages/blog/BlogFilter";
import { Card, Col, Empty, Row, Spin, Typography, message } from "antd";
import { useEffect, useRef, useState } from "react";
import ViewDetailBlog from "@app/modules/admin/pages/blog/ViewDetailBlog";
import DescriptionModal from "@app/modules/admin/pages/blog/DescriptionModal";
import CreateBlogModal from "@app/modules/admin/pages/blog/CreateBlogModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import BLOG_API from "@app/api/blogs";
import { BlogItemTypes } from "@app/api/blogs/type";
import UpdateMenuModal from "@app/modules/admin/pages/blog/UpdateMenuModal";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<BlogItemTypes[]>([]);
  const [blogUpdate, setBlogUpdate] = useState<BlogItemTypes>();
  const [messageApi, contextHolder] = message.useMessage();

  const { isLoading: isLoadingDeleteBlog, mutate: mutateDeleteBlog } =
    useMutation(BLOG_API.DELETE_BLOG, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Delete blog is successful",
        });

        refetchBlogsList();
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Delete blog is failed",
        });
      },
    });

  const {
    isLoading: isLoadingBlogList,
    refetch: refetchBlogsList,
    data: blogsListServer,
  } = useQuery(["blogs-list"], BLOG_API.GET_LIST, {
    enabled: false,
    onSuccess: (response: any) => {
      setBlogs(response);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Get blogs list is failed",
      });
    },
  });

  const createBlogRef = useRef<any>();
  const updateBlogRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const viewDetailRef = useRef<any>();

  const openCreateBlogModal = () => {
    createBlogRef.current.openModal();
  };

  const openUpdateBlogModal = (blogProps: BlogItemTypes) => {
    setBlogUpdate(blogProps);
    updateBlogRef.current.openModal();
  };
  const onOpenDescriptionModal = () => {
    descriptionRef.current.openModal();
  };
  const onViewDetailBlog = (blogProps: BlogItemTypes) => {
    setBlogUpdate(blogProps);
    viewDetailRef.current.openModal();
  };

  const onSearchBlog = (keyValue: string) => {
    const result = blogsListServer.filter((blog: BlogItemTypes) =>
      blog.blogName.toLowerCase().includes(keyValue.toLowerCase())
    );
    setBlogs(result);
  };

  const onFilterBlog = (active: boolean) => {
    if (active === true) {
      setBlogs(blogsListServer);
    } else {
      const result = blogsListServer.filter((blog: BlogItemTypes) => {
        return blog.active === active;
      });

      setBlogs(result);
    }
  };

  const onDeleteBlog = (blogID: string) => {
    mutateDeleteBlog(blogID);
  };

  useEffect(() => {
    refetchBlogsList();
  }, []);

  return (
    <Spin
      spinning={isLoadingBlogList || isLoadingDeleteBlog}
      tip="Loading blogs ...."
    >
      {contextHolder}
      <Row gutter={[14, 14]}>
        <Col span={24}>
          <Card>
            <Typography.Text className="text-xl font-bold">
              Blog management
            </Typography.Text>
          </Card>
        </Col>
        <CreateBlogModal
          ref={createBlogRef}
          onRefreshPage={() => refetchBlogsList()}
        />
        <UpdateMenuModal
          ref={updateBlogRef}
          blogUpdateProps={blogUpdate as BlogItemTypes}
          onRefreshPage={() => refetchBlogsList()}
        />
        <ViewDetailBlog
          ref={viewDetailRef}
          blogProps={blogUpdate as BlogItemTypes}
        />

        <Col span={24}>
          <Card size="small">
            <BlogFilter
              onCreateNewBlog={openCreateBlogModal}
              onSearchBlog={onSearchBlog}
              onFilterBlogStatus={onFilterBlog}
            />
          </Card>
        </Col>

        {blogs.length > 0 ? (
          <Col span={24}>
            <BaseTable
              columns={BlogColumns({
                // updateBlogModal: openUpdateBlogModal,
                descriptionModal: onOpenDescriptionModal,
                viewDetailModal: onViewDetailBlog,
                deleteBlog: onDeleteBlog,
              })}
              dataSource={blogs}
              scroll={{
                y: (1 - 425 / window.innerHeight) * window.innerHeight,
                x: 1200,
              }}
            />
          </Col>
        ) : (
          <Col span={24} className="flex justify-center">
            <Empty />
          </Col>
        )}
      </Row>
    </Spin>
  );
};

export default BlogManagement;
