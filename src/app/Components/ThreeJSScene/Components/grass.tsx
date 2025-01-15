import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { BufferAttribute, ShaderMaterial } from "three";
import { GLTF } from "three-stdlib";
import { extend, useFrame } from "@react-three/fiber";

extend({ ShaderMaterial });

type GLTFResult = GLTF & {
	nodes: {
		Grass: THREE.Mesh;
	};
	materials: {
		Grass: THREE.MeshStandardMaterial;
	};
};

export function GrassInstances(
	props: JSX.IntrinsicElements["group"] & {
		size?: number;
		density?: number;
		offsetX?: number;
		offsetZ?: number;
	}
) {
	const instancedMeshRef = useRef<THREE.InstancedMesh | null>(null);
	const size = (props.size || 100) * 5;
	const density = props.density || 0.1;
	const offsetX = props.offsetX || density * size * -0.5;
	// const offsetZ = props.offsetZ || density * size * -0.5;
	const offsetZ = props.offsetZ || -35;
	const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

	const { nodes } = useGLTF("Assets/Models/grass.glb") as GLTFResult;

	useEffect(() => {
		if (!instancedMeshRef.current) return;

		const temp = new THREE.Object3D();
		let currentIndex = 0;
		let currentX = offsetX;
		let currentZ = offsetZ;

		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				temp.position.set(
					currentX + (Math.random() - 0.5) * 0.2,
					0 - Math.random() * 0.3,
					currentZ + (Math.random() - 0.5) * 0.2
				);
				temp.rotation.set(1.5707963, 0, 0);
				temp.updateMatrix();
				instancedMeshRef.current.setMatrixAt(currentIndex, temp.matrix);
				currentIndex++;
				currentX += density;
			}
			currentZ += density;
			currentX = offsetX;
		}
		instancedMeshRef.current.instanceMatrix.needsUpdate = true;
	}, [size, density, offsetX, offsetZ]);

	useFrame(({ clock }) => {
		if (shaderMaterialRef.current) {
			shaderMaterialRef.current.uniforms.time.value =
				clock.getElapsedTime();
		}
	});

	return (
		<group {...props} dispose={null}>
			<group name="Scene">
				<instancedMesh
					ref={instancedMeshRef}
					args={[nodes.Grass.geometry, undefined, size * size]}
				>
					<meshBasicMaterial color='rgb(120, 132, 89)' attach='material'/>
				</instancedMesh>
			</group>
		</group>
	);
}

useGLTF.preload("Assets/Models/grass.glb");
