"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./style.css";
import { ComputerModel } from "./Components/computer";
import { DeskModel } from "./Components/desk";
import { GrassInstances } from "./Components/grass";
import { GroundModel } from "./Components/ground";
import { BoxInstances } from "./Components/cubes";
import {
	Bloom,
	EffectComposer,
	ChromaticAberration,
	BrightnessContrast,
	Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function ThreeJSScene() {
	return (
		<div className="w-screen h-screen absolute top-0 left-0 z-0 overflow-hidden ">
			<Canvas
				camera={{
					fov: 10,
					near: 0.1,
					far: 500,
					position: [0, 1, 18],
					rotation: [0, 0, 0],
				}}
				dpr={0.35}
			>
				<ambientLight intensity={1} color={"#c4ccda"} />
				<directionalLight
					position={[5, 10, 5]}
					intensity={1}
					castShadow
					shadow-mapSize-width={1024}
					shadow-mapSize-height={1024}
					shadow-camera-far={50}
					shadow-camera-left={-10}
					shadow-camera-right={10}
					shadow-camera-top={10}
					shadow-camera-bottom={-10}
					color={"#ece3c4"}
				/>
				<fog attach="fog" args={["rgb(88, 92, 96)", 5, 70]} />
				<CameraController />
				<Suspense fallback={null}>
					<ComputerModel />
					<DeskModel />
					<GrassInstances />
					<GroundModel />
					<BoxInstances />
				</Suspense>
				<EffectComposer>
					<Bloom
						opacity={1}
						luminanceThreshold={0.5}
						luminanceSmoothing={0.9}
						color={"#f0f0f0"}
					/>
					<ChromaticAberration
						blendFunction={BlendFunction.NORMAL} // blend mode
						offset={[0.001, 0.001]} // color offset
						opacity={0.2}
					/>
					<BrightnessContrast
						contrast={0.1} // contrast: min -1, max: 1
					/>
					<Noise
						premultiply // enables or disables noise premultiplication
						blendFunction={BlendFunction.SCREEN} // blend mode
						opacity={0.15} // opacity of the
					/>
				</EffectComposer>
			</Canvas>
		</div>
	);
}

function CameraController() {
	const [targetX, setTargetX] = useState(0.5);
	const [targetY, setTargetY] = useState(0.5);

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			const { clientX, clientY } = event;
			const { innerWidth, innerHeight } = window;
			const x = (clientX / innerWidth) * 2 - 1;
			const y = -(clientY / innerHeight) * 2 + 1;
			setTargetX(Math.min(Math.max(x * 0.1, -0.5), 0.5));
			setTargetY(0.5 + Math.min(Math.max(y * 0.1 + 0.5, 0), 1.5));
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	useFrame((state) => {
		state.camera.position.x += (targetX - state.camera.position.x) * 0.01;
		state.camera.position.y += (targetY - state.camera.position.y) * 0.01;
	});

	return null;
}
