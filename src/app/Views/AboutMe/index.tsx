"use client";

import { useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { aboutMeContent } from "../../Utils/types";
import { getAllAboutMeDocs } from "@/app/Utils/FirestoreDB";
import Image from "next/image";
import parse from "html-react-parser";

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
			} relative mx-auto mb-12 flex justify-start items-start overflow-y-scroll`}
			ref={scope}
		>
			{isLoaded ? (
				<div className="w-full flex flex-col justify-center items-center mx-8">
					<h1 className="font-serif self-start text-4xl font-medium my-2">
						About Me
					</h1>
					<div className="w-full h-full flex flex-col justify-center items-center mx-12 gap-2 tracking-normal">
						{aboutMeContent.map((content) => (
							<div key={content.id}>
								<h2 className="font-serif self-start text-2xl font-medium my-2">
									{content.title}
								</h2>
								<div className="flex flex-col gap-4 justify-center items-center md:grid md:grid-cols-12 md:items-center md:gap-x-2 md:gap-y-8">
									<div className="font-sans text-lg self-start justify-self-start md:col-span-9">
										{parse(content.content)}
									</div>
									{content.media !== '' && (
										<Image
											src={
												typeof content.media === "string"
													? content.media
													: "/Assets/Images/noise.png"
											}
											alt="alt"
											width={256}
											height={256}
											layout="relative"
											className="justify-self-end md:col-span-3 h-full w-auto"
										/>
									)}
								</div>
							</div>
						))}
						<div className="flex flex-col gap-4 justify-center items-center md:grid md:grid-cols-12 md:items-center md:gap-x-2 md:gap-y-8 self-start">
							<p className="font-sans text-lg justify-self-start md:col-span-9">
								If you&rsquo;re in a rush, no worries! You can
								check out my resume{" "}
								<a
									href="/Assets/Documents/dautorio-christopher-resume.pdf"
									className=" bg-blue-200 px-2 hover:bg-blue-300 rounded transition-colors"
								>
									here!
								</a>
							</p>
							<p className="font-sans text-lg justify-self-start md:col-span-9">
								Otherwise, feel free to browse around and check
								out some of my projects, experience, and other
								things that make me, me!
							</p>
						</div>
					</div>
				</div>
			) : (
				<div className="w-full h-full flex flex-col justify-center items-center gap-y-4">
					<h2>Loading</h2>
					<div className="w-12 h-12 rounded-xl bg-stone-400 animate-spin"></div>
				</div>
			)}
		</div>
	);
};

export default AboutMe;
