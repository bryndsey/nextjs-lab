"use client";

import { ThreeLayout } from "@/components/ThreeLayout";
import { OrthographicCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
const Hamburger = dynamic(
  () => import("./Hamburger").then((mod) => mod.Hamburger),
  { ssr: false }
);
const View = dynamic(
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ThreeLayout>
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-3xl font-bold text-center">Hamburger menu</h1>
        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <View className="h-44 w-44 border">
            <Suspense fallback={null}>
              <Hamburger open={isHovered} />
              <ambientLight intensity={1.25} />
              <pointLight intensity={2} position={[0.2, 1, 1]} />
              <OrthographicCamera makeDefault position={[0, 0, 1]} zoom={900} />
            </Suspense>
          </View>
        </motion.div>
      </main>
    </ThreeLayout>
  );
}
