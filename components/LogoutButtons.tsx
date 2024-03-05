"use client";

import { logout } from "@/lib/actions";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <Button className="btn" type="submit" onClick={handleLogout}>
      Logout
    </Button>
  );
}
