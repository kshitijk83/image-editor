import LogoutButton from "@/components/LogoutButtons";
import { FabricProvider } from "@/hooks/useFabricRef";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className=" w-full h-screen">
      <div className="flex justify-between w-full">
        <div>Photo Editor</div>
        <LogoutButton />
      </div>
      <FabricProvider>{children}</FabricProvider>
    </div>
  );
};

export default Layout;
