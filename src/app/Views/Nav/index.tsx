"use client";

import React from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { Button } from "../../Utils/types";
import "./style.css";

interface NavComponentProps {
	className?: string | undefined;
	buttons: Button[];
	onViewChange: (viewIndex: number) => void;
}

const Nav: React.FC<NavComponentProps> = ({ className, buttons, onViewChange }) => {
	const [buttonHovered, setButtonHovered] = React.useState("");
    const [buttonActivated, setButtonActivated] = React.useState(-1);

	const buttonClasses =
		"transition-all px-12 py-1 hover:bg-slate-200/50 hover:px-8 text-lg flex items-center justify-around w-full";

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

        console.log('clicked', index);
    }

	return (
		<div
			className={`${className} relative w-full h-full grid grid-rows-1 grid-cols-${buttons.length} gap-4`}
		>
			{buttons.map((button, index) => {
				return (
					<button
						key={index}
						className={buttonClasses}
						onMouseEnter={handleMouseIn}
						onMouseLeave={handleMouseOut}
                        onClick={() => handleMouseClick(index)}
					>
						{button.name}
						{buttonActivated === index ? (
							<HiOutlineChevronUp />
						) : (
							<HiOutlineChevronDown />
						)}
					</button>
				);
			})}
		</div>
	);
};

export default Nav;
