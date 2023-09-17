import React, { FC, ReactNode } from "react";
import { Col, Layout, Row, theme } from "antd";
import { BasicProps } from "antd/es/layout/layout";
import ContentHeader from "./ContentHeader";

const { Content } = Layout;

type Props = BasicProps &
  React.RefAttributes<HTMLElement> & {
    pageTitle?: boolean | ReactNode;
    actions?: ReactNode;
  };

const ContentContainer: FC<Props> = ({
  pageTitle,
  actions,
  children,
  style,
  ...props
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Content
      style={{
        margin: "24px 16px",
        height: "max-content",
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        flex: "none",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        ...style,
      }}
      {...props}
    >
      {(pageTitle || actions) && (
        <ContentHeader title={pageTitle} actions={actions} />
      )}

      <Row>
        <Col span={24}>{children}</Col>
      </Row>
    </Content>
  );
};

export default ContentContainer;
