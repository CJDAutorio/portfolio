"use client";

import React from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { Button } from "../../Utils/types";
import "./style.css";
import { motion } from "motion/react";

interface NavComponentProps {
	className?: string | undefined;
	buttons: Button[];
	onViewChange: (viewIndex: number) => void;
}

const Nav: React.FC<NavComponentProps> = ({
	className,
	buttons,
	onViewChange,
}) => {
	const [, setButtonHovered] = React.useState("");
	const [buttonActivated, setButtonActivated] = React.useState(-1);

	const buttonClasses =
		"transition-all w-full px-12 py-1 hover:bg-slate-200/50 hover:drop-shadow-md hover:px-8 text-lg grid grid-cols-2 grid-rows-1 items-center";

	const handleMouseIn = (e: React.MouseEvent<HTMLButtonElement>) => {
		setButtonHovered(e.currentTarget.textContent || "");
	};

	const handleMouseOut = () => {
		setButtonHovered("");
	};

	const handleMouseClick = (index: number) => {
		if (buttonActivated === index) {
			setButtonActivated(-1);
			onViewChange(-1);
		} else {
			setButtonActivated(index);
			onViewChange(index);
		}

		console.log("clicked", index);
	};

	return (
		<motion.div
			className={`${
				className ? className : ""
			} relative w-full h-full gap-4`}
			animate={{
				x: 0,
				opacity: 1,
				transition: {
					default: { type: "spring" },
					opacity: { ease: "linear" },
				},
			}}
		>
			{buttons.map((button, index) => {
				return (
					<button
						key={index}
						className={buttonClasses ? buttonClasses : ""}
						onMouseEnter={handleMouseIn}
						onMouseLeave={handleMouseOut}
						onClick={() => handleMouseClick(index)}
					>
						<p className="justify-self-start">{button.name}</p>
						{buttonActivated === index ? (
                            <div className="justify-self-end"><HiOutlineChevronUp /></div>
						) : (
							<div className="justify-self-end"><HiOutlineChevronDown /></div>
						)}
					</button>
				);
			})}
		</motion.div>
	);
};

export default Nav;
