"use client";

import { logout } from "@/lib/actions";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <button className="btn" type="submit" onClick={handleLogout}>
      Logout
    </button>
  );
}
