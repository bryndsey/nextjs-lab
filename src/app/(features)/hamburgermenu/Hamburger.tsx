"use client";
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { Center, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { motion } from "framer-motion-3d";

type GLTFResult = GLTF & {
  nodes: {
    Patty: THREE.Mesh;
    Lettuce: THREE.Mesh;
    BunTop_1: THREE.Mesh;
    BunTop_2: THREE.Mesh;
    BunBottom_1: THREE.Mesh;
    BunBottom_2: THREE.Mesh;
    Tomato_1: THREE.Mesh;
    Tomato_2: THREE.Mesh;
  };
  materials: {
    Patty: THREE.MeshStandardMaterial;
    Lettuce: THREE.MeshStandardMaterial;
    Bun: THREE.MeshStandardMaterial;
    BunInside: THREE.MeshStandardMaterial;
    Tomato: THREE.MeshStandardMaterial;
    TomatoInside: THREE.MeshStandardMaterial;
  };
};

type HamburgerProps = JSX.IntrinsicElements["group"] & {
  open?: boolean;
};

const offset = 0.025;

export function Hamburger({ open = false, ...rest }: HamburgerProps) {
  const { nodes, materials } = useGLTF(
    "/assets/models/hamburger.glb"
  ) as GLTFResult;

  return (
    <Center {...rest} dispose={null}>
      <motion.group
        variants={{ open: { y: offset } }}
        animate={open ? "open" : "closed"}
      >
        <mesh geometry={nodes.BunTop_1.geometry} material={materials.Bun} />
        <mesh
          geometry={nodes.BunTop_2.geometry}
          material={materials.BunInside}
        />
      </motion.group>

      <group>
        <mesh geometry={nodes.Tomato_1.geometry} material={materials.Tomato} />
        <mesh
          geometry={nodes.Tomato_2.geometry}
          material={materials.TomatoInside}
        />
        <mesh geometry={nodes.Patty.geometry} material={materials.Patty} />
      </group>

      <motion.group
        variants={{ open: { y: -offset } }}
        animate={open ? "open" : "closed"}
      >
        <mesh geometry={nodes.Lettuce.geometry} material={materials.Lettuce} />
        <mesh geometry={nodes.BunBottom_1.geometry} material={materials.Bun} />
        <mesh
          geometry={nodes.BunBottom_2.geometry}
          material={materials.BunInside}
        />
      </motion.group>
    </Center>
  );
}

useGLTF.preload("/assets/models/hamburger.glb");
