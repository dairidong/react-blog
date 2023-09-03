import React, { FC } from "react";
import { Layout, theme } from "antd";
import { BasicProps } from "antd/es/layout/layout";

const { Content } = Layout;

const ContentContainer: FC<BasicProps & React.RefAttributes<HTMLElement>> = ({
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
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        ...style,
      }}
      {...props}
    >
      {children}
    </Content>
  );
};

export default ContentContainer;
