import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import {
  FileTextOutlined,
  HomeOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  App,
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Layout,
  Space,
  theme,
} from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { Link, usePage } from "@inertiajs/react";
import { Message, PageProps } from "@/types";
import { Administrator } from "@/types/models";
import SideMenu from "./components/SideMenu";

const { Header, Sider } = Layout;

type Props = PageProps<{ flash: { message: Message } }, Administrator>;

const AdminLayoutContainer: FC<PropsWithChildren> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showSider, setShowSider] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { message: AntMessage } = App.useApp();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const {
    flash: { message },
    auth: { user },
  } = usePage<Props>().props;

  const menuItems = [
    {
      key: "admin.dashboard",
      icon: <HomeOutlined />,
      label: <Link href={route("admin.dashboard")}>总览</Link>,
    },
    {
      key: "admin.articles.index",
      icon: <FileTextOutlined />,
      label: <Link href={route("admin.articles.index")}>文章</Link>,
    },
  ];

  const dropdownMenu = {
    items: [
      {
        key: "logout",
        label: (
          <Link href={route("admin.logout")} method="delete" as="button">
            登出
          </Link>
        ),
      },
    ],
  };

  useEffect(() => {
    if (message) {
      AntMessage.open({
        type: message.type,
        content: message.text,
      });
    }
  }, [message]);

  return (
    <App>
      <StyleProvider hashPriority="high">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            trigger={null}
            collapsed={collapsed}
            collapsible
            breakpoint="lg"
            width={300}
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
            <SideMenu
              collapsed={collapsed}
              showSider={showSider}
              menuItems={menuItems}
            />
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
            <SideMenu
              collapsed={collapsed}
              showSider={showSider}
              menuItems={menuItems}
              menuTheme="light"
            />
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

              <Dropdown menu={dropdownMenu}>
                <Space className="user-info" style={{ cursor: "pointer" }}>
                  <Avatar
                    size="large"
                    alt="user-avatar"
                    src={user.avatar}
                    icon={<UserOutlined />}
                  />
                  <div className="username">{user.name}</div>
                </Space>
              </Dropdown>
            </Header>

            {/** ************************** Content ************************* */}
            {children}
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
