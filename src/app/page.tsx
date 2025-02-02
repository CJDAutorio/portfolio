import React from "react";
import { ThreeJSScene } from "./Components/ThreeJSScene";
import Base from "./Views/Base";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "motion/react";

export default function Home() {
	return (
		<div className="overflow-hidden relative h-screen w-screen">
			<div className="z-10 absolute top-4 md:top-12 md:right-40 flex flex-col justify-center items-start md:justify-end md:items-end gap-y-2 md:gap-y-4">
				<h1 className="font-serif font-semibold text-right text-4xl md:text-6xl tracking-wider leading-none">
					CJ D&apos;Autorio
				</h1>
				<h2 className="font-serif font-normal text-right text-2xl md:text-4xl tracking-wide leading-none">
					Developer
				</h2>
				<div className="flex justify-end items-end gap-4">
					<a href="https://github.com/CJDAutorio">
						<FaGithub fontSize={32} />
					</a>
					<a href="https://www.linkedin.com/in/cj-dautorio/">
						<FaLinkedin fontSize={32} />
					</a>
				</div>
			</div>
			<div className="z-10 relative">
				<div
					className="absolute"
				>
					<Base />
				</div>
			</div>
			<div className="z-0 pointer-events-none absolute overflow-hidden h-screen w-screen m-0 p-0">
				<ThreeJSScene />
			</div>
		</div>
	);
}
