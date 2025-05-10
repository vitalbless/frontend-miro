import { AppHeader } from "@/features/header";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  );
}
