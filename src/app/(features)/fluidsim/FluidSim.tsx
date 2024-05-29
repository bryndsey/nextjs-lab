"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Fluid } from "@alienkitty/alien.js/three";
import { forwardRef, useMemo, useRef } from "react";
import { Effect } from "postprocessing";
import {
  GLSL3,
  NoBlending,
  Texture,
  Uniform,
  WebGLRenderTarget,
  WebGLRenderer,
} from "three";
import { EffectComposer, Vignette } from "@react-three/postprocessing";

export function FluidSim() {
  return (
    <EffectComposer>
      <FluidSimPPEffect />
    </EffectComposer>
  );
}

const fragmentShader = /* glsl */ `
                        precision highp float;

                        uniform sampler2D tScene;
                        uniform sampler2D tFluid;

                        void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
                            vec3 fluid = texture(tFluid, uv).rgb;
                            vec2 offsetUv = uv - fluid.rg * 0.0002;

                            outputColor = vec4(fluid * 0.1 + 0.5, 1);
                            // outputColor = mix( texture2D(tScene, offsetUv), vec4(fluid * 0.1 + 0.5, 1), step(0.5, vUv.x) ) ;
                        }
                        `;
//                            outputColor = vec4(fluid * 0.1 + 0.5, 1);

class FluidSimEffect extends Effect {
  fluid: Fluid;
  constructor() {
    super("FluidSimEffect", fragmentShader, {
      uniforms: new Map([
        ["tScene", new Uniform<Texture | null>(null)],
        ["tFluid", new Uniform<Texture | null>(null)],
      ]),
    });
  }

  initialize(renderer: WebGLRenderer, alpha: boolean, frameBufferType: number) {
    this.fluid = new Fluid(renderer, { radius: 0.25 });

    // For some reason, this causes a line at the given y value as opposed to a circle
    // this.fluid.splatMaterial.uniforms.uAspect = 1;
    this.uniforms.get("tFluid")!.value = this.fluid.uniform.value;
  }

  update(
    renderer: WebGLRenderer,
    inputBuffer: WebGLRenderTarget,
    deltaTime?: number
  ) {
    this.fluid.update();
    this.uniforms.get("tFluid")!.value = this.fluid.uniform.value;
    this.uniforms.get("tScene")!.value = inputBuffer.texture;
  }

  addSplat(x: number, y: number, dx: number, dy: number) {
    this.fluid.splats.push({ x, y, dx, dy });
  }
}

export const FluidSimPPEffect = forwardRef((props, ref) => {
  const effectRef = useRef<FluidSimEffect>(new FluidSimEffect());
  const lastMouseRef = useRef({ x: 0, y: 0 });
  useFrame((state) => {
    if (
      state.pointer.x !== lastMouseRef.current.x ||
      state.pointer.y !== lastMouseRef.current.y
    ) {
      effectRef.current.addSplat(
        (state.pointer.x + 1) / 2,
        (state.pointer.y + 1) / 2,
        (state.pointer.x - lastMouseRef.current.x) * 1000,
        (state.pointer.y - lastMouseRef.current.y) * 1000
      );
      lastMouseRef.current = { x: state.pointer.x, y: state.pointer.y };
    }
  });

  const effect = useMemo(() => effectRef.current, []);
  return <primitive ref={ref} object={effect} dispose={null} />;
});

FluidSimPPEffect.displayName = "FluidSimPPEffect";
