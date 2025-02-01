"use client";

import React from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { Button } from "../../Utils/types";
import "./style.css";
import classNames from "classnames";

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
		<div
			className={classNames(
				className ? className : "",
				`grid grid-cols-1 grid-rows-${buttons.length} gap-y-16`,
			)}
		>
			{buttons.map((button, index) => (
				<button
					key={index}
					className={classNames(
						"w-full px-8 py-1 hover:bg-slate-100/50 border-b border-slate-100/50 hover:drop-shadow-md",
						"text-lg grid grid-cols-2 grid-rows-1 items-center transition-colors"
					)}
					onMouseEnter={handleMouseIn}
					onMouseLeave={handleMouseOut}
					onClick={() => handleMouseClick(index)}
				>
					<p className="justify-self-start">{button.name}</p>
					<div className="justify-self-end">
						{buttonActivated === index ? (
							<HiOutlineChevronUp fontSize={24} />
						) : (
							<HiOutlineChevronDown fontSize={24} />
						)}
					</div>
				</button>
			))}
		</div>
	);
};

export default Nav;
