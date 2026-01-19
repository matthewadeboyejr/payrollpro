"use client";

import { ShiftProvider } from "@/context/ShiftContext";

export default function RotaSchedulingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ShiftProvider>{children}</ShiftProvider>;
}
