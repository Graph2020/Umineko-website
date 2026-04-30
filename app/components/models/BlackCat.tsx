import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function BlackCat(props) {
  const { nodes, materials } = useGLTF("/models/black_cat_head_plush.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_0.geometry}
          material={materials.Root}
          position={[-0.142, 0.159, 0.185]}
          scale={2.658}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/black_cat_head_plush.glb");
