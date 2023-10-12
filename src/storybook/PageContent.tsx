import { Affix, Card, CardProps, Typography } from 'antd';
import { CSSProp } from 'styled-components';

type PropsType = CardProps & {
  wrapperCss?: CSSProp;
  title?: string | React.ReactNode;
  fixedOffset?: number;
  hiddenTab?: string;
  bodyHeader?: React.CSSProperties;
};

const PageContent: React.FC<PropsType> = ({
  wrapperCss,
  bodyStyle,
  children,
  title,
  bodyHeader = {
    display: 'flex',
    alignItems: 'center',
    padding: '.9375rem',
    paddingBottom: 0,
  },
  fixedOffset,
  ...props
}) => {
  const titleComponent =
    typeof title === 'string' ? <Typography className="font-bold flex">{title}</Typography> : title;

  return (
    <>
      {fixedOffset !== undefined ? (
        <Affix offsetTop={fixedOffset} target={() => document.getElementById('main-component-layout')}>
          <Card style={{ borderRadius: 0 }} bodyStyle={bodyHeader}>
            {titleComponent}
          </Card>
        </Affix>
      ) : (
        <Card style={{ borderRadius: 0 }} bodyStyle={bodyHeader}>
          {titleComponent}
        </Card>
      )}
      <div className="p-2">{children}</div>
    </>
  );
};
export default PageContent;
