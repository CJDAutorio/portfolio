import * as THREE from "three";
import React from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
	nodes: {
		Computer: THREE.Mesh;
	};
	materials: {
		Computer: THREE.MeshStandardMaterial;
	};
};

export function ComputerModel(props: JSX.IntrinsicElements["group"]) {
	const { nodes, materials } = useGLTF(
		"Assets/Models/computer.glb"
	) as GLTFResult;
	const [diffuse, emmission] = useTexture([
		"Assets/Models/Textures/computer_d.webp",
		"Assets/Models/Textures/computer_e.webp",
	]);

	diffuse.flipY = false;
	emmission.flipY = false;

	return (
		<group {...props} dispose={null}>
			<mesh
				name="Computer"
				castShadow
				receiveShadow
				geometry={nodes.Computer.geometry}
				material={materials.Computer}
				position={[1.6, 0.82, 0]}
				rotation={[0, -0.4, 0]}
				userData={{ name: "Computer" }}
			>
				<meshStandardMaterial
					attach="material"
					map={diffuse}
					emissiveMap={emmission}
					emissive="white"
					emissiveIntensity={1}
				/>
			</mesh>
		</group>
	);
}

useGLTF.preload("Assets/Models/computer.glb");
