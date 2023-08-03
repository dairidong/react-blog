import React, { createContext, FC, ProviderProps } from "react";

export interface MenuControlState {
  menuOpen: boolean;
  triggerMenu: (withAnimation: boolean) => void;
}

const MobileNavControlContext = createContext<MenuControlState>({
  menuOpen: false,
  triggerMenu: () => {},
});

export const MobileNavControlProvider: FC<ProviderProps<MenuControlState>> = (
  { value, children },
  context,
) => (
  <MobileNavControlContext.Provider value={value}>
    {children}
  </MobileNavControlContext.Provider>
);

export default MobileNavControlContext;
