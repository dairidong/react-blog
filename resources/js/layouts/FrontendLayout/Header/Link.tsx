import { FC, useContext } from "react";
import { InertiaLinkProps, Link as InertiaLink } from "@inertiajs/react";
import MobileNavControlContext from "./Navigations/MobileNavigation/MobileNavControlContext";

type Props = InertiaLinkProps & {
  closeMenu?: boolean;
};

const Link: FC<Props> = ({ closeMenu = false, ...props }) => {
  const { menuOpen, triggerMenu } = useContext(MobileNavControlContext);
  const onFinish = () => {
    if (closeMenu && menuOpen) {
      triggerMenu(false);
    }
  };
  return <InertiaLink onFinish={onFinish} {...props} />;
};

export default Link;
