"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { aboutMeContent } from "@/app/Utils/types";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import Image from "next/image";
import Modal from "react-modal";
import { getAllAboutMeDocs, uploadAboutMeDoc } from "@/app/Utils/FirestoreDB";

export function ExperienceForm() {
	const [aboutMeContent, setAboutMeContent] = useState<aboutMeContent[]>([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalContent, setModalContent] = useState(<></>);
	const [contentCode, setContentCode] = useState("<p></p>");
	const [media, setMedia] = useState<File | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	const modalStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
	};

	async function getAllAboutMeContent() {
		setIsLoaded(false);
		setAboutMeContent([]);
		const content = await getAllAboutMeDocs();
		setAboutMeContent(content);
		console.log("about me content:", content);
		setIsLoaded(true);
	}

	async function uploadAboutMeContent(content: aboutMeContent) {
		await uploadAboutMeDoc(content).then(() => {
			console.log("uploaded content", content);
		});
		setModalIsOpen(false);
		getAllAboutMeContent();
	}

	const handleDelete = async (content: aboutMeContent) => {
		console.log("deleting content", content);
	};

	Modal.setAppElement("#root");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setModalContent(
			<div>
				<h1>Are you sure you want to submit the following content?</h1>
				<div className="grid grid-cols-2 gap-4 border px-2 py-1 items-center">
					<h2 className="font-bold">Section Title</h2>
					<p>
						{(e.target as HTMLFormElement)["section-title"].value}
					</p>
					<h2 className="font-bold">Section Content</h2>
					<p className="text-sm sm:text-base bg-gray-800 text-white rounded-lg p-4 pl-6">
						{contentCode}
					</p>
					<h2 className="font-bold">Section Media</h2>
					{media ? (
						<Image
							src={URL.createObjectURL(media)}
							alt="alt"
							width={128}
							height={128}
						/>
					) : (
						<p>No media available</p>
					)}
				</div>
				<div className="flex justify-center gap-4 mt-2">
					<button
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => {
							setModalIsOpen(false);
						}}
					>
						Cancel
					</button>
					<button
						className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => {
							uploadAboutMeContent({
								id: "",
								title: (e.target as HTMLFormElement)[
									"section-title"
								].value,
								content: contentCode,
								media: media ? media : "",
							});
						}}
					>
						Submit
					</button>
				</div>
			</div>
		);
		setModalIsOpen(true);
		console.log("submitting form");
	};

	useEffect(() => {
		getAllAboutMeContent();
	}, []);

	return (
		<div className="container mx-auto mt-12 w-full" id="about-me-form">
			<div className="flex relative justify-center items-center w-full mb-8">
				<h2 className="text-2xl">Experience Content Form</h2>
				<button
					onClick={getAllAboutMeContent}
					className="absolute top-0 right-12 bg-slate-300 px-2 py-1 rounded"
				>
					Refresh
				</button>
			</div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => {
					setModalIsOpen(false);
				}}
				style={modalStyles}
			>
				{modalContent}
			</Modal>
			<Accordion className="w-full bg-slate-200 px-4 py-2">
				<AccordionItem header="Add New Section">
					<form
						onSubmit={handleSubmit}
						className="grid grid-cols-2 gap-4 items-center justify-center border bg-slate-100 px-4 py-4"
					>
						<label htmlFor="section-title">Section Title</label>
						<input
							type="text"
							name="section-title"
							id="section-title"
							className="border px-2 py-2"
						/>
						<label htmlFor="section-content">Section Content</label>
						<Editor
							height="400px"
							language="html"
							theme="vs-dark"
							options={{
								fontSize: 16,
								formatOnType: true,
								autoClosingBrackets: "always",
								autoClosingQuotes: "always",
								autoIndent: "full",
								automaticLayout: true,
							}}
							value={contentCode}
							onChange={(value = "<p></p>") =>
								setContentCode(value)
							}
						/>
						<label htmlFor="section-media">Section Media</label>
						<input
							type="file"
							name="section-media"
							id="section-media"
							className="border px-2 py-2"
							onChange={(e) => {
								setMedia(e.target.files?.[0] || null);
							}}
						/>
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-24 rounded col-span-2 mx-auto"
						>
							Submit
						</button>
					</form>
				</AccordionItem>
			</Accordion>

			<div className="flex flex-col justify-center">
				<h2 className="text-2xl my-8">Current Experience Content</h2>
				<div className="border bg-slate-300">
					{isLoaded ? (
						<>
							{aboutMeContent ? (
								aboutMeContent.map(
									(
										content: aboutMeContent,
										index: number
									) => (
										<div
											key={index}
											className="flex flex-col items-center justify-center px-4 py-2"
										>
											<h3 className="font-bold text-xl">
												{content.title}
											</h3>
											<p>{content.id}</p>
											<div className="grid grid-cols-12 w-full gap-4 justify-center">
												<div className="col-span-8 self-start">
													<Editor
														height="400px"
														language="html"
														theme="vs-dark"
														options={{
															fontSize: 16,
															formatOnType: true,
															autoClosingBrackets:
																"always",
															autoClosingQuotes:
																"always",
															autoIndent: "full",
															automaticLayout:
																true,
															readOnly: true,
														}}
														value={content.content}
													/>
												</div>
												<div className="col-span-4 self-center justify-self-end">
													{content.media &&
													typeof content.media ===
														"string" &&
													content.media.startsWith(
														"http"
													) ? (
														<Image
															src={content.media}
															alt={content.title}
															width={256}
															height={256}
															onError={(e) => {
																console.log(
																	"error:",
																	e
																);
																e.currentTarget.src =
																	"Assets/Images/noise.png";
															}}
														/>
													) : (
														<p>
															No media available
														</p>
													)}
												</div>
											</div>
											<button
												onClick={() => {
													handleDelete(content);
												}}
												className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
											>
												Delete
											</button>
										</div>
									)
								)
							) : (
								<p>No content available</p>
							)}
						</>
					) : (
						<>
							<p>Loading...</p>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
