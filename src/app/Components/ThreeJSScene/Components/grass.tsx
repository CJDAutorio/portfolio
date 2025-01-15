import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Grass: THREE.Mesh
  }
  materials: {
    Grass: THREE.MeshStandardMaterial
  }
}

export function GrassInstances(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('Assets/Models/grass.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Grass"
          castShadow
          receiveShadow
          geometry={nodes.Grass.geometry}
          material={materials.Grass}
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: 'Grass' }}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/grass.glb')
