"use client";

import { useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { aboutMeContent } from "../../Utils/types";
import { getAllAboutMeDocs } from "@/app/Utils/FirestoreDB";

interface AboutMeComponentProps {
	className?: string | undefined;
}

const AboutMe: React.FC<AboutMeComponentProps> = ({ className }) => {
	const [scope, animate] = useAnimate();
	const [aboutMeContent, setAboutMeContent] = useState<aboutMeContent[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	async function getAllAboutMeContent() {
		setIsLoaded(false);
		setAboutMeContent([]);
		const content = await getAllAboutMeDocs();
		setAboutMeContent(content);
		console.log("about me content:", content);
		setIsLoaded(true);
	}

	useEffect(() => {
		getAllAboutMeContent();
	}, []);

	useEffect(() => {
		animate(scope.current, { scale: 1 });
	}, []);

	return (
		<div
			className={`${
				className ? className : ""
			} relative mx-auto w-full h-full max-h-96 mb-12 flex justify-start items-end overflow-y-scroll`}
			ref={scope}
		>
			{isLoaded ? (
				<div className="w-full flex flex-col justify-center items-center mx-8">
					<h1 className="font-serif self-start text-4xl font-bold">About Me</h1>
					<div className="w-full h-full flex justify-center items-center">
						{aboutMeContent.map((content) => (
							<div
								key={content.id}
								className="w-full h-full flex justify-center items-center"
							>
								<h2>{content.title}</h2>
								<p>{content.content}</p>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="w-full h-full flex justify-center items-center">
					<div className="w-12 h-12 border-blue-500 animate-spin"></div>
				</div>
			)}
		</div>
	);
};

export default AboutMe;
