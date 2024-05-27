"use client";
import { PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense, useState } from "react";
import { Hamburger, View } from "./page";

interface HamburgerButtonProps {
  className?: string;
  style?: React.CSSProperties;
}
export function HamburgerButton(props: HamburgerButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsTapped(true)}
      onTap={() => setIsTapped(false)}
      onTapCancel={() => setIsTapped(false)}
      {...props}
    >
      <View className="scale-150 w-full h-full">
        <Suspense fallback={null}>
          <Hamburger open={isHovered} tapped={isTapped} />
          <ambientLight intensity={1.25} />
          <pointLight intensity={2} position={[0.2, 1, 1]} />
        </Suspense>
        <PerspectiveCamera fov={10} makeDefault position={[0, 0, 1.5]} />
      </View>
    </motion.div>
  );
}
