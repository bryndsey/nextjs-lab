"use client";

import { ThreeLayout } from "@/components/ThreeLayout";
import dynamic from "next/dynamic";
import { HamburgerButton } from "./HamburgerButton";
export const Hamburger = dynamic(
  () => import("./Hamburger").then((mod) => mod.Hamburger),
  { ssr: false }
);
export const View = dynamic(
  () => import("@react-three/drei").then((mod) => mod.View),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-96 w-full flex-col items-center justify-center">
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-black"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    ),
  }
);

export default function Home() {
  return (
    <ThreeLayout>
      <main className="flex flex-col items-center p-24">
        <h1 className="text-3xl font-bold text-center">Hamburger menu</h1>
        <HamburgerButton className="h-44 w-44" />
      </main>
    </ThreeLayout>
  );
}
