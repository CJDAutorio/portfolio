import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
	nodes: {
		Desk: THREE.Mesh;
	};
	materials: {
		Desk: THREE.MeshStandardMaterial;
	};
};

export function DeskModel(props: JSX.IntrinsicElements["group"]) {
	const { nodes, materials } = useGLTF(
		"Assets/Models/desk.glb"
	) as GLTFResult;
	return (
		<group {...props} dispose={null}>
			<group name="Scene">
				<mesh
					name="Desk"
					castShadow
					receiveShadow
					geometry={nodes.Desk.geometry}
					material={materials.Desk}
					userData={{ name: "Desk" }}
					position={[1.6, 0, 0]}
					rotation={[0, -0.4, 0]}
				>
					<meshStandardMaterial
						attach="material"
						color="rgb(141, 128, 121)"
					/>
				</mesh>
			</group>
		</group>
	);
}

useGLTF.preload("Assets/Models/desk.glb");
