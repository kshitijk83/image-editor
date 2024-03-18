import LogoutButton from "@/components/LogoutButtons";
import { FabricProvider } from "@/hooks/useFabricRef";
import React from "react";

const Layout = ({ children }) => {
  return (
    <FabricProvider>
      <div className="flex justify-between w-full p-3 items-center ">
        <div className="text-2xl font-bold text-primary-gradient">
          Photo Editor
        </div>
        <LogoutButton />
      </div>
      {children}
    </FabricProvider>
  );
};

export default Layout;
