import React from "react";
import { ThreeJSScene } from "./Components/ThreeJSScene";
import Base from "./Views/Base";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Home() {

	return (
		<div>
			<div className="z-10 absolute top-12 right-40 flex flex-col justify-end items-end gap-y-4">
				<h1 className="font-serif font-semibold text-right text-6xl tracking-wider leading-none">
					CJ D&apos;Autorio
				</h1>
				<h2 className="font-serif font-normal text-right text-4xl tracking-wide leading-none">
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
			<div className="absolute w-screen h-screen flex justify-start items-end">
				<div
					className="
							z-20
							relative
							container
							w-full
							md:w-2/3
							py-6
							mx-8
							my-12
							backdrop-blur-sm
							drop-shadow-md
							bg-slate-200/30
							flex
							justify-start
							items-end
							hover:backdrop-blur-md
							transition-all
						"
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
