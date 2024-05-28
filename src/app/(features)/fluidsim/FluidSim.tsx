"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Fluid } from "@alienkitty/alien.js/three";
import { useMemo, useRef } from "react";

export function FluidSim() {
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const renderer = useThree((three) => three.gl);
  const fluid = useMemo(() => new Fluid(renderer), [renderer]);
  useFrame((state) => {
    // console.log(state.pointer);
    // fluid.splats.push({
    //   // Get mouse value in 0 to 1 range, with Y flipped
    //   x: 0,
    //   y: 0,
    //   dx: 1,
    //   dy: 1,
    // });
    fluid.update(state.clock.getDelta());
  });
  return null;
}
