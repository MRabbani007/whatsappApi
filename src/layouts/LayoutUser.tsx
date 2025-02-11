import Navbar from "@/features/navigation/Navbar";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function LayoutUser() {
  return (
    <div className="flex-1 flex items-stretch bg-zinc-800 p-4">
      <Navbar />
      <Suspense fallback={<div>Loading</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
