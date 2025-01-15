import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { BufferAttribute, ShaderMaterial } from "three";
import { GLTF } from "three-stdlib";
import { extend, useFrame } from "@react-three/fiber";

export function BoxInstances(
	props: JSX.IntrinsicElements["group"] & {
		count?: number;
	}
) {
	const instancedMeshRef = useRef<THREE.InstancedMesh | null>(null);
	const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
	const count = props.count || 3;

	useEffect(() => {
		if (!instancedMeshRef.current) return;

		const temp = new THREE.Object3D();

		for (let i = 0; i < count; i++) {
			temp.position.set(
				Math.random() * 10 - 5,
				Math.random() * 1 - 1,
				Math.random() * 40 - 55
			);
			temp.rotation.set(
				(Math.random() * Math.PI) / 2,
				(Math.random() * Math.PI) / 2,
				(Math.random() * Math.PI) / 2
			);
            const randomScale = Math.random() * 3 + 1
            temp.scale.set(
                randomScale,
                randomScale,
                randomScale
            );
			temp.updateMatrix();
			instancedMeshRef.current.setMatrixAt(i, temp.matrix);
		}
		instancedMeshRef.current.instanceMatrix.needsUpdate = true;
	}, []);

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
					args={[null, null, count]}
				>
					<boxGeometry />
					<meshStandardMaterial
						color="rgb(219, 219, 219)"
						attach="material"
					/>
				</instancedMesh>
			</group>
		</group>
	);
}

useGLTF.preload("Assets/Models/grass.glb");
