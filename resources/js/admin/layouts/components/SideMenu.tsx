import { Menu, MenuTheme, Row, theme, Typography } from "antd";
import React, { FC } from "react";
import { MenuItemType } from "antd/es/menu/hooks/useItems";

interface Props {
  collapsed: boolean;
  showSider: boolean;
  menuItems: MenuItemType[];
  menuTheme?: MenuTheme;
}

const { Title } = Typography;

const SideMenu: FC<Props> = ({
  collapsed,
  showSider,
  menuItems,
  menuTheme = "dark",
}) => {
  const {
    token: { colorText },
  } = theme.useToken();

  return (
    <>
      <Row justify="center" align="middle">
        <Title
          level={1}
          style={{
            marginBlock: "1rem",
            whiteSpace: "nowrap",
            fontFamily: "PressStart2P-Regular",
            color: menuTheme === "dark" ? "#fff" : colorText,
          }}
        >
          D{(collapsed && showSider) || "RD"}
        </Title>
      </Row>
      <Menu
        theme={menuTheme}
        mode="inline"
        defaultSelectedKeys={[route().current() ?? ""]}
        items={menuItems}
        style={{
          border: "none",
        }}
      />
    </>
  );
};

export default SideMenu;
