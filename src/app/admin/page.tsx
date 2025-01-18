"use client";

import React, { FormEvent } from "react";
import { AboutMeForm } from "../Views/Admin/AboutMeForm/about-me-form.component";

export default function Admin() {
	const [view, setView] = React.useState<React.ReactNode>(null);

	const buttonClasses='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';

	function handleViewChange(component: React.ReactNode) {
		setView(component);
		console.log("set view to", component);
	}

	return (
		<div className="container mx-auto mt-12 w-full">
			<h1 className="text-4xl mb-16">Admin Page</h1>
			<div className="flex flex-row w-full justify-around gap-x-2">
				<button className={buttonClasses} onClick={() => handleViewChange(<AboutMeForm />)}>About Me Content</button>
				<button className={buttonClasses} >Experience Content</button>
				<button className={buttonClasses} >Hobbies Content</button>
				<button className={buttonClasses} >Contact Me Content</button>
			</div>
			<div className="mt-12">{view}</div>
		</div>
	);
}
