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
      <color attach="background" args={["blue"]} />
      <EffectComposer>
        {/* <Vignette offset={0.1} darkness={1.1} /> */}
        <FluidSimPPEffect />
      </EffectComposer>
      {/* <View.Port /> */}
      <r3f.Out />
      <Sphere args={[2, 32, 32]} position={[-1, 1, 0]}>
        <meshBasicMaterial color={"green"} />
      </Sphere>
      <Preload all />
    </Canvas>
  );
}
