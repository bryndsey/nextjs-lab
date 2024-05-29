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
  //   const lastPointerRef = useRef({ x: 0, y: 0 });
  //   const renderer = useThree((three) => three.gl);
  //   const fluid = useMemo(() => new Fluid(renderer), [renderer]);
  //   useFrame((state) => {
  //     // console.log(state.pointer);
  //     // fluid.splats.push({
  //     //   // Get mouse value in 0 to 1 range, with Y flipped
  //     //   x: 0,
  //     //   y: 0,
  //     //   dx: 1,
  //     //   dy: 1,
  //     // });
  //     fluid.update(state.clock.getDelta());
  //   });
  //   return null;

  return (
    // <EffectComposer enabled={false}>
    //   <Vignette />
    //   {/* <FluidSimPPEffect /> */}
    // </EffectComposer>
    null
  );
}

const fragmentShader = /* glsl */ `
                        precision highp float;

                        uniform sampler2D tScene;
                        uniform sampler2D tFluid;

                        void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
                            vec3 fluid = texture(tFluid, uv).rgb;
                            vec2 offsetUv = uv - fluid.rg * 0.0002;

                            // outputColor = vec4(fluid * 0.1 + 0.5, 1);
                            outputColor = mix( texture2D(tScene, offsetUv), vec4(fluid * 0.1 + 0.5, 1), step(0.5, vUv.x) ) ;
                        }
                        `;
//                            outputColor = vec4(fluid * 0.1 + 0.5, 1);
let _uSceneParam: number;
let _uFluidParam: number;

class FluidSimEffect extends Effect {
  fluid: Fluid;
  constructor() {
    super("FluidSimEffect", fragmentShader, {
      uniforms: new Map([
        ["tScene", new Uniform<Texture | null>(null)],
        ["tFluid", new Uniform<Texture | null>(null)],
      ]),
      //   blendFunction: NoBlending,

      //   vertexShader: /* glsl */ `
      //                     in vec3 position;
      //                     in vec2 uv;

      //                     out vec2 vUv;

      //                     void main() {
      //                         vUv = uv;

      //                         gl_Position = vec4(position, 1.0);
      //                     }
      //                 `,
    });

    // _uSceneParam = sceneParam;
    // _uFluidParam = fluidParam;
  }

  initialize(renderer: WebGLRenderer, alpha: boolean, frameBufferType: number) {
    // super.initialize(renderer, alpha, frameBufferType);

    this.fluid = new Fluid(renderer);
    // this.uniforms.get("tFluid")!.value = this.fluid.uniform;
    this.fluid.splatMaterial.uniforms.uAspect = 1;
    this.uniforms.get("tFluid")!.value = this.fluid.uniform.value;
    console.log(this.fluid);
  }

  update(
    renderer: WebGLRenderer,
    inputBuffer: WebGLRenderTarget,
    deltaTime?: number
  ) {
    this.fluid.splats.push({
      // Get mouse value in 0 to 1 range, with Y flipped
      x: 0.25,
      y: 0.5,
      dx: 10,
      dy: 10,
    });
    // console.log(this.fluid.splats);
    this.fluid.update();
    this.uniforms.get("tFluid")!.value = this.fluid.uniform.value;
    // console.log(this.uniforms.get("tFluid").value);
    // console.log(this.fluid.uniform);
    this.uniforms.get("tScene")!.value = inputBuffer.texture;
  }
}

export const FluidSimPPEffect = forwardRef((props, ref) => {
  const effect = useMemo(() => new FluidSimEffect(), []);
  return <primitive ref={ref} object={effect} dispose={null} />;
});

FluidSimPPEffect.displayName = "FluidSimPPEffect";
