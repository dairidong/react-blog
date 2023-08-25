import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import {
  MenuOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuTheme } from "antd";
import {
  App,
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { Link, usePage } from "@inertiajs/react";
import { Message, PageProps } from "@/types";
import { Administrator } from "@/types/models";

const { Header, Content, Sider } = Layout;

type Props = PageProps<{ flash: { message: Message } }, Administrator>;

const AdminLayoutContainer: FC<PropsWithChildren> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showSider, setShowSider] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { message: AntMessage } = App.useApp();
  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken();

  const {
    flash: { message },
    auth: { user },
  } = usePage<Props>().props;

  useEffect(() => {
    if (message) {
      AntMessage.open({
        type: message.type,
        content: message.text,
      });
    }
  }, [message]);

  const menuContent = (menuTheme: MenuTheme = "dark") => (
    <>
      <div
        className="tw-font-digit tw-text-3xl"
        style={{
          margin: "1rem 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "nowrap",
          color: menuTheme === "dark" ? "#fff" : colorText,
        }}
      >
        D{(collapsed && showSider) || "RD"}
      </div>
      <Menu
        theme={menuTheme}
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "nav 1",
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "nav 2",
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: "nav 3",
          },
        ]}
        style={{
          border: "none",
        }}
      />
    </>
  );

  return (
    <App>
      <StyleProvider hashPriority="high">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            trigger={null}
            collapsed={collapsed}
            collapsible
            breakpoint="lg"
            style={{
              display: !showSider ? "none" : "block",
            }}
            onBreakpoint={(broken) => {
              setShowSider(!broken);
              if (!broken) {
                setDrawerOpen(false);
              }
            }}
          >
            {menuContent()}
          </Sider>

          <Drawer
            open={drawerOpen}
            closeIcon={false}
            placement="left"
            onClose={() => setDrawerOpen(false)}
            contentWrapperStyle={{
              maxWidth: "50vw",
            }}
            bodyStyle={{
              padding: 0,
            }}
          >
            {menuContent("light")}
          </Drawer>

          <Layout>
            <Header
              style={{
                padding: 0,
                paddingRight: 32,
                background: colorBgContainer,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => {
                  if (showSider) {
                    setCollapsed(!collapsed);
                  } else {
                    setDrawerOpen(!drawerOpen);
                  }
                }}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />

              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      label: (
                        <Link
                          href={route("admin.logout")}
                          method="delete"
                          as="button"
                        >
                          登出
                        </Link>
                      ),
                    },
                  ],
                }}
              >
                <Space className="user-info tw-cursor-pointer">
                  <Avatar
                    size="large"
                    alt="user-avatar"
                    style={{
                      // 样式兼容
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    src={user.avatar}
                    icon={<UserOutlined />}
                  />
                  <div className="username">{user.name}</div>
                </Space>
              </Dropdown>
            </Header>
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
          </Layout>
        </Layout>
      </StyleProvider>
    </App>
  );
};

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <App>
      <AdminLayoutContainer children={children} />
    </App>
  );
};

export default AdminLayout;
