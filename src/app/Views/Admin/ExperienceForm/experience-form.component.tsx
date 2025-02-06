"use client";

import { useEffect, useState } from "react";
import {
	EducationExperience,
	ProjectExperience,
	WorkExperience,
} from "@/app/Utils/types";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import Image from "next/image";
import Modal from "react-modal";
import {
	getAllExperienceDocs,
	uploadExperienceDoc,
} from "@/app/Utils/FirestoreDB";
import { useForm, useFieldArray } from "react-hook-form";

export function ExperienceForm() {
	const [experienceContent, setExperienceContent] = useState<
		(WorkExperience | ProjectExperience | EducationExperience)[]
	>([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalContent, setModalContent] = useState(<></>);
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

	function FieldArray() {
		const { control, register } = useForm();
		const { fields, append, remove } = useFieldArray({
			control,
			name: "bulletPoints",
		});

		return (
			<div>
				{fields.map((field, index) => (
					<div key={field.id} className="flex items-center mb-2">
						<input
							{...register(`bulletPoints.${index}.value`)}
							className="border px-2 py-1 grow"
						/>
						<button
							type="button"
							onClick={() => remove(index)}
							className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-sm"
						>
							Delete
						</button>
					</div>
				))}
				<button
					type="button"
					onClick={() => append({ value: "" })}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-sm"
				>
					Add Bullet Point
				</button>
			</div>
		);
	}

	async function getAllExperienceContent() {
		setIsLoaded(false);
		setExperienceContent([]);
		const content = await getAllExperienceDocs();
		setExperienceContent(content);
		console.log("experience content:", content);
		setIsLoaded(true);
	}

	async function uploadExperienceContent(
		content: WorkExperience | ProjectExperience | EducationExperience
	) {
		await uploadExperienceDoc(content);
		setModalIsOpen(false);
		getAllExperienceContent();
	}

	const handleDelete = async (
		content: WorkExperience | ProjectExperience | EducationExperience
	) => {
		console.log("deleting content", content);
	};

	Modal.setAppElement("#root");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setModalContent(
			<div>
				<h1>Are you sure you want to submit the following content?</h1>
				<div className="grid grid-cols-2 gap-4 border px-2 py-1 items-center">
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
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-sm"
						onClick={() => {
							setModalIsOpen(false);
						}}
					>
						Cancel
					</button>
					<button
						className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-sm"
						onClick={() => {
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
		getAllExperienceContent();
	}, []);

	return (
		<div
			className="container mx-auto mt-12 w-full font-sans"
			id="work-experience-form"
		>
			<div className="flex relative justify-center items-center w-full mb-8">
				<h2 className="text-2xl">Experience Content Form</h2>
				<button
					onClick={getAllExperienceContent}
					className="absolute top-0 right-12 bg-slate-300 px-2 py-1 rounded-sm"
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
				<AccordionItem header="Add New Work Experience">
					<div className="mb-4"></div>
					<form
						onSubmit={handleSubmit}
						className="grid grid-cols-2 gap-4 items-center justify-center border bg-slate-100 px-4 py-4"
					>
						<label htmlFor="section-company">Company</label>
						<input
							type="text"
							name="section-company"
							id="section-company"
							className="border px-2 py-2"
						/>
						<label htmlFor="section-role">Role</label>
						<input
							type="text"
							name="section-role"
							id="section-role"
							className="border px-2 py-2"
						/>
						<label htmlFor="section-start-date">Start Date</label>
						<input
							type="date"
							name="section-start-date"
							id="section-start-date"
							className="border px-2 py-2"
						/>
						<label htmlFor="section-end-date">End Date</label>
						<input
							type="date"
							name="section-end-date"
							id="section-end-date"
							className="border px-2 py-2"
						/>
						<label htmlFor="section-bullets">
							Section Bullet Points
						</label>
						<FieldArray />
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
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-24 rounded-sm col-span-2 mx-auto"
						>
							Submit
						</button>
					</form>
				</AccordionItem>
				<AccordionItem header="Add New Project Experience">
					<div className="mb-4"></div>
					<form
						onSubmit={handleSubmit}
						className="grid grid-cols-2 gap-4 items-center justify-center border bg-slate-100 px-4 py-4"
					>
						<label htmlFor="project-title">Project Title</label>
						<input
							type="text"
							name="project-title"
							id="project-title"
							className="border px-2 py-2"
						/>
						<label htmlFor="project-description">Project Description</label>
						<textarea
							name="project-description"
							id="project-description"
							className="border px-2 py-2"
						/>
						<label htmlFor="project-start-date">Start Date</label>
						<input
							type="date"
							name="project-start-date"
							id="project-start-date"
							className="border px-2 py-2"
						/>
						<label htmlFor="project-end-date">End Date</label>
						<input
							type="date"
							name="project-end-date"
							id="project-end-date"
							className="border px-2 py-2"
						/>
						<label htmlFor="project-bullets">Project Bullet Points</label>
						<FieldArray />
						<label htmlFor="project-media">Project Media</label>
						<input
							type="file"
							name="project-media"
							id="project-media"
							className="border px-2 py-2"
							onChange={(e) => {
								setMedia(e.target.files?.[0] || null);
							}}
						/>
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-24 rounded-sm col-span-2 mx-auto"
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
							{experienceContent.length > 0 ? (
								experienceContent.map(
									(
										content:
											| WorkExperience
											| ProjectExperience
											| EducationExperience,
										index: number
									) => (
										<div
											key={index}
											className="flex flex-col items-center justify-center px-4 py-2"
										>
											<h3 className="font-bold text-xl">
												{"title" in content
													? content.title
													: ""}
												{"company" in content
													? content.company
													: ""}
											</h3>
											<p>{content.id}</p>
											<div className="grid grid-cols-12 w-full gap-4 justify-center">
												<div className="col-span-8 self-start"></div>
												<div className="col-span-4 self-center justify-self-end">
													{content.media &&
													typeof content.media ===
														"string" &&
													content.media.startsWith(
														"http"
													) ? (
														<Image
															src={content.media}
															alt={`${
																"title" in
																content
																	? content.title
																	: ""
															}${
																"company" in
																content
																	? content.company
																	: ""
															}`}
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
												className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-sm mt-4"
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
