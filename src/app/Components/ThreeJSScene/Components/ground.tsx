import React, { useRef } from "react";

export function GroundModel(props: { size?: number }) {
    const size = props.size || 100;

	return (
		<group dispose={null}>
			<group name="Scene">
				<mesh
					position={[0, 0, 0]}
					rotation={[-1.5707963, 0, 0]}
					scale={[1, 1, 1]}
				>
                    <planeGeometry args={[size, size]} />
                    <meshBasicMaterial color='rgb(120, 132, 89)' attach='material'/>
				</mesh>
			</group>
		</group>
	);
}
