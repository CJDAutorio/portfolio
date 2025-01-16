"use client";

import { Suspense, useEffect, useState } from "react";
import { Camera, Canvas, useFrame } from "@react-three/fiber";
import "./style.css";
import { ComputerModel } from "./Components/computer";
import { DeskModel } from "./Components/desk";
import { GrassInstances } from "./Components/grass";
import { GroundModel } from "./Components/ground";
import { BoxInstances } from "./Components/cubes";
import { Environment } from "@react-three/drei";
import Loader from "../Loader";

export function ThreeJSScene() {

	return (
		<div className="w-screen h-screen absolute top-0 left-0 z-0 overflow-hidden bg-slate-300">
			<Canvas
				camera={{
					fov: 10,
					near: 0.1,
					far: 1000,
					position: [0, 1, 18],
					rotation: [0, 0, 0],
				}}
			>
				<ambientLight intensity={0.1} />
				<Suspense fallback={<Loader />}>
					<Environment preset="sunset" background={false} />
					<CameraController />
					<ComputerModel />
					<DeskModel />
					<GrassInstances />
					<GroundModel />
					<BoxInstances />
				</Suspense>
			</Canvas>
		</div>
	);
}

function CameraController() {
	const [targetX, setTargetX] = useState(0);
	const [targetY, setTargetY] = useState(0);

	useFrame((state) => {
		const { x, y } = state.pointer;
		setTargetX(Math.min(Math.max(x * 0.1, -0.5), 0.5));
		setTargetY(0.5 + Math.min(Math.max(y * 0.1 + 0.5, 0), 1.5));

		state.camera.position.x += (targetX - state.camera.position.x) * 0.01;
		state.camera.position.y += (targetY - state.camera.position.y) * 0.01;
	});

	return null;
}
