"use client";

import { useAnimate } from "framer-motion";
import { useEffect } from "react";

interface AboutMeComponentProps {
	className?: string | undefined;
}

const AboutMe: React.FC<AboutMeComponentProps> = ({ className }) => {
	const [scope, animate] = useAnimate();

	useEffect(() => {
		animate(scope.current, { scale: 1 });
	}, []);

	return (
		<div
			className={`${
				className ? className : ""
			} relative w-full h-full max-h-96 mb-12 flex justify-start items-end overflow-y-scroll`}
			ref={scope}
		>
			<div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
				<div>
					<p>This is the about me page</p>
				</div>
			</div>
		</div>
	);
};

export default AboutMe;
