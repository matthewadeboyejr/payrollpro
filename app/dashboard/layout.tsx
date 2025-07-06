"use client";

import SiderBar from "@/components/sidebar/SiderBar";
import TopBar from "@/components/sidebar/TopBar";
import { useAppSelector } from "@/redux/hooks";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen, isMobile } = useAppSelector((state) => state.sidebar);

  return (
    <div className="flex w-screen h-screen bg-gray-100">
      <SiderBar />

      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40"
          onClick={() => {
            // This will be handled by the sidebar toggle
          }}
        />
      )}

      <div className="flex-1 w-full flex flex-col gap-5 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white rounded-b-md py-2 px-5">
          <TopBar />
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
