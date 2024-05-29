"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, Sphere, View } from "@react-three/drei";
import * as THREE from "three";
import { r3f } from "./r3f";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { FluidSimPPEffect } from "@/app/(features)/fluidsim/FluidSim";

export default function Scene({ ...props }) {
  return (
    <Canvas
      {...props}
      // onCreated={(state) => (state.gl.toneMapping = THREE.AgXToneMapping)}
    >
      <View.Port />
      <r3f.Out />
      <Preload all />
    </Canvas>
  );
}
