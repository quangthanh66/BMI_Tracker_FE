import { BaseTag } from '@app/components/common/BaseTag/BaseTag';
import { MdOutlineDescription } from 'react-icons/md';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import { Image } from 'antd';
import errorImage from 'assets/error-image-alt.png';
import { BLOG_STATUS } from '@app/utils/constant';
import { BlogItemTypes } from '@app/api/blogs/type';

type BlogColumnsTypes = {
  updateBlogModal: () => void;
  descriptionModal: () => void;
  viewDetailModal: () => void;
};

export const BlogColumns: any = ({ updateBlogModal, descriptionModal, viewDetailModal }: BlogColumnsTypes) => [
  {
    title: 'Name',
    dataIndex: 'blogName',
    sorter: (a: BlogItemTypes, b: BlogItemTypes) => a.blogName.length - b.blogName.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Photo',
    dataIndex: 'blogPhoto',
    render: (blogPhoto: string) => (
      <Image
        alt="blog-photo-alt"
        src={blogPhoto}
        className="h-[80px] w-full object-cover"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = errorImage;
        }}
      />
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: string) => (
      <BaseTag color={status === BLOG_STATUS.available_blog ? 'green' : 'volcano'}>{status}</BaseTag>
    ),
  },
  {
    title: 'Tag',
    dataIndex: 'tag',
    render: (tag: string) => <BaseTag color="green">{tag}</BaseTag>,
  },
  {
    title: 'Content',
    dataIndex: 'blogContent',
    render: (desc: string) => (
      <BaseTooltip title="Read all description">
        <MdOutlineDescription size={'32px'} className="cursor-pointer" onClick={descriptionModal} />
      </BaseTooltip>
    ),
  },
  {
    title: 'Actions',
    dataIndex: 'Id',
    render: () => (
      <div className="flex items-center gap-x-4">
        <BaseTooltip title="View detail">
          <BaseButton onClick={viewDetailModal} icon={<EyeOutlined className="text-[24px]" />} type="text"></BaseButton>
        </BaseTooltip>

        <BaseTooltip title="Edit blog content">
          <BaseButton
            onClick={updateBlogModal}
            icon={<EditOutlined className="text-[24px]" />}
            type="text"
          ></BaseButton>
        </BaseTooltip>

        <BaseTooltip title="Delete blog">
          <BasePopconfirm placement="rightTop" title="Delete the blog" okText="Yes" cancelText="No">
            <BaseButton icon={<DeleteOutlined className="text-[24px]" />} danger type="text"></BaseButton>
          </BasePopconfirm>
        </BaseTooltip>
      </div>
    ),
  },
];
