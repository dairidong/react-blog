import { Menu, MenuTheme, theme } from "antd";
import React, { FC } from "react";
import { MenuItemType } from "antd/es/menu/hooks/useItems";

interface Props {
  collapsed: boolean;
  showSider: boolean;
  menuItems: MenuItemType[];
  menuTheme?: MenuTheme;
}

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
