import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import {
  FileTextOutlined,
  HistoryOutlined,
  HomeOutlined,
  MenuOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  App,
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Layout,
  MenuProps,
  Space,
  theme,
} from "antd";
import { Link, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy-js";
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

  const route = useRoute();

  const {
    flash: { message },
    auth: { user },
  } = usePage<Props>().props;

  useEffect(() => {
    if (message) {
      AntMessage.open({ type: message.type, content: message.text });
    }
  }, [message]);

  const menuItems: MenuProps["items"] = [
    {
      key: "admin.dashboard",
      icon: <HomeOutlined />,
      label: <Link href={route("admin.dashboard")}>总览</Link>,
    },
    {
      key: "admin.articles.index",
      icon: <FileTextOutlined />,
      label: <Link href={route("admin.articles.index")}>文章管理</Link>,
    },
    {
      key: "admin.tags.index",
      icon: <TagOutlined />,
      label: <Link href={route("admin.tags.index")}>标签管理</Link>,
    },
    {
      key: "admin.access_logs.index",
      icon: <HistoryOutlined />,
      label: <Link href={route("admin.access_logs.index")}>访问日志</Link>,
    },
  ];

  const dropdownMenu: MenuProps = {
    items: [
      {
        key: "me.edit",
        label: (
          <Link href={route("admin.me.edit")} as="div">
            个人信息
          </Link>
        ),
      },
      {
        key: "logout",
        label: (
          <Link href={route("admin.logout")} method="delete" as="div">
            登出
          </Link>
        ),
      },
    ],
  };

  return (
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
        styles={{
          body: {
            padding: 0,
          },
          wrapper: {
            maxWidth: "50vw",
          },
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
