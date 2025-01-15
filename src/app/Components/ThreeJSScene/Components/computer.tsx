
import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Computer: THREE.Mesh
  }
  materials: {
    Computer: THREE.MeshStandardMaterial
  }
}

export function ComputerModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('Assets/Models/computer.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Computer"
        castShadow
        receiveShadow
        geometry={nodes.Computer.geometry}
        material={materials.Computer}
        position={[0, 0.82, 0]}
        userData={{ name: 'Computer' }}
      />
    </group>
  )
}

useGLTF.preload('/computer.glb')