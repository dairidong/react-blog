import { Menu, MenuTheme, Row, theme, Typography, MenuProps } from "antd";
import React, { FC, useMemo } from "react";
import { useRoute } from "ziggy-js";

interface Props {
  collapsed: boolean;
  showSider: boolean;
  menuItems: MenuProps["items"];
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

  const route = useRoute();

  const defaultSelectKeys = useMemo(() => route().current() || "", []);

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
        defaultSelectedKeys={[defaultSelectKeys]}
        items={menuItems}
        style={{ border: "none" }}
      />
    </>
  );
};

export default SideMenu;
