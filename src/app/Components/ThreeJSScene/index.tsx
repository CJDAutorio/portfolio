"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./style.css";
import { ComputerModel } from "./Components/computer";
import { DeskModel } from "./Components/desk";
import { GrassInstances } from "./Components/grass";
import { Environment } from "@react-three/drei";

export function ThreeJSScene() {
	return (
		<div className="w-screen h-screen absolute top-0 left-0 z-0 overflow-hidden">
			<h1>ThreeJSScene</h1>
			<Canvas>
				<ambientLight intensity={0.1} />
				<Suspense fallback={null}>
                    <Environment preset="sunset" background />
					<ComputerModel />
					<DeskModel />
					<GrassInstances />
				</Suspense>
			</Canvas>
		</div>
	);
}
