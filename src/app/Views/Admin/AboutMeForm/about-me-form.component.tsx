"use client";

import { useEffect, useState } from "react";


export function AboutMeForm() {
	const [aboutMeContent, setAboutMeContent] = useState<unknown>(null);

	async function getAboutMeContent() {
	}

	useEffect(() => {
		getAboutMeContent()
	}, []);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
	};

	return (
		<div className="container mx-auto mt-12 w-full">
			<div className="flex justify-center">
				<h2 className="text-2xl mb-8">About Me Content Form</h2>
			</div>
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-2 gap-4 items-center justify-center"
			>
				<label htmlFor="section-title">Section Title</label>
				<input
					type="text"
					name="section-title"
					id="section-title"
					className="border px-2 py-2"
				/>
				<label htmlFor="section-content">Section Content</label>
				<textarea
					name="section-content"
					id="section-content"
					className="border px-2 py-2"
				/>
				<label htmlFor="section-media">Section Media</label>
				<input
					type="file"
					name="section-media"
					id="section-media"
					className="border px-2 py-2"
				/>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-24 rounded col-span-2 mx-auto"
				>
					Submit
				</button>
			</form>
			<div className="flex justify-center">
				<h2 className="text-2xl my-8">Current About Me Content</h2>
			</div>
		</div>
	);
}
