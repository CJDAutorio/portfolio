"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./style.css";
import { ComputerModel } from "./Components/computer";
import { DeskModel } from "./Components/desk";
import { GrassInstances } from "./Components/grass";
import { GroundModel } from "./Components/ground";
import { BoxInstances } from "./Components/cubes";
import { Environment, OrbitControls } from "@react-three/drei";
import Loader from "../Loader";

export function ThreeJSScene() {
	return (
		<div className="w-screen h-screen absolute top-0 left-0 z-0 overflow-hidden bg-slate-300">
			<h1>ThreeJSScene</h1>
			<Canvas
				camera={{ fov: 10, near: 0.1, far: 1000, position: [0.5, 1, 18], rotation: [0, 0, 0] }}
			>
				<ambientLight intensity={0.1} />
				<Suspense fallback={<Loader />}>
					<Environment preset="sunset" background={false} />
					<ComputerModel />
					<DeskModel />
					<GrassInstances />
                    <GroundModel />
                    <BoxInstances />
				</Suspense>
                {/* <OrbitControls /> */}
			</Canvas>
		</div>
	);
}
