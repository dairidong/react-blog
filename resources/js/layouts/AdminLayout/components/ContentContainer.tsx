import React, { FC, PropsWithChildren } from "react";
import { Layout, theme } from "antd";

const { Content } = Layout;

const ContentContainer: FC<PropsWithChildren> = ({ children }) => {
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
      }}
    >
      {children}
    </Content>
  );
};

export default ContentContainer;
