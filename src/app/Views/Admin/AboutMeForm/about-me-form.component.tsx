"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { addDoc, Firestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { aboutMeContent } from "@/app/Utils/types";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import Image from "next/image";
import Modal from "react-modal";
import {
	ref,
	uploadBytes,
	getDownloadURL,
	FirebaseStorage,
} from "firebase/storage";

interface AboutMeFormProps {
	firestoreDb: Firestore;
	firestoreStorage: FirebaseStorage;
}

export function AboutMeForm({
	firestoreDb,
	firestoreStorage,
}: AboutMeFormProps) {
	const [aboutMeContent, setAboutMeContent] = useState<aboutMeContent[]>([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalContent, setModalContent] = useState(<></>);
	const [contentCode, setContentCode] = useState("<p></p>");

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

	Modal.setAppElement("#root");

	function closeModal() {
		setModalIsOpen(false);
	}

	async function getAboutMeContent() {
		const querySnapshot = await getDocs(
			collection(firestoreDb, "aboutme-content")
		);
		const contentPromises = querySnapshot.docs.map(async (doc) => {
			const data = doc.data();
			const downloadUrl = await getDownloadURL(
				ref(
					firestoreStorage as FirebaseStorage,
					encodeURI(
						`https://firebasestorage.googleapis.com/b/bucket/o/${data.media}`
					)
				)
			);

			return {
				id: doc.id,
				title: data.title,
				content: data.content,
				media: downloadUrl,
			} as aboutMeContent;
		});
		const content = await Promise.all(contentPromises);
		console.log(content);
		setAboutMeContent(content);
	}

	async function addAboutMeContent(content: aboutMeContent) {
		const file = content.media as File;

		const storageRef = ref(firestoreStorage, `aboutme/${file.name}`);
		uploadBytes(storageRef, content.media as File).then((snapshot) => {
			console.log("Uploaded a blob or file!", snapshot);
		});

		const docRef = await addDoc(
			collection(firestoreDb, "aboutme-content"),
			{
				title: content.title,
				content: content.content,
				media: `aboutme/${file.name}`,
			}
		);
		console.log("Document written with ID: ", docRef.id);
	}

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		setModalContent(
			<div>
				<h2>Are you sure you want to add the following entry?</h2>
				<div>
					<p>
						<strong>Title:</strong>{" "}
						{
							(event.target as HTMLFormElement)["section-title"]
								.value
						}
					</p>
					<p>
						<strong>Content:</strong> {contentCode}
					</p>
					<p>
						<strong>Media:</strong>{" "}
						{
							(event.target as HTMLFormElement)["section-media"]
								.value
						}
					</p>
				</div>
				<div>
					<button
						onClick={closeModal}
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
					>
						No
					</button>
					<button
						onClick={() => {
							addAboutMeContent({
								title: (event.target as HTMLFormElement)[
									"section-title"
								].value,
								content: contentCode,
								media: (event.target as HTMLFormElement)[
									"section-media"
								].value,
							} as aboutMeContent);
							closeModal();
						}}
						className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					>
						Yes
					</button>
				</div>
			</div>
		);
		setModalIsOpen(true);
		getAboutMeContent();
	}

	function handleDelete(aboutMeContent: aboutMeContent) {
		setModalContent(
			<div>
				<h2>Are you sure you want to delete this entry?</h2>
				<div>
					<p>
						<strong>Id:</strong> {aboutMeContent.id}
					</p>
					<p>
						<strong>Title:</strong> {aboutMeContent.title}
					</p>
					<p>
						<strong>Content:</strong> {aboutMeContent.content}
					</p>
					<p>
						<strong>Media:</strong> {aboutMeContent.media}
					</p>
				</div>
				<div>
					<button
						onClick={closeModal}
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
					>
						No
					</button>
					<button
						onClick={() => {
							// deleteAboutMeContent();
							closeModal();
						}}
						className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					>
						Yes
					</button>
				</div>
			</div>
		);
		setModalIsOpen(true);
	}

	useEffect(() => {
		getAboutMeContent();
	}, []);

	return (
		<div className="container mx-auto mt-12 w-full" id="about-me-form">
			<div className="flex justify-center">
				<h2 className="text-2xl mb-8">About Me Content Form</h2>
			</div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
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
				<h2 className="text-2xl my-8">Current About Me Content</h2>
				<div className="border bg-slate-300">
					{aboutMeContent ? (
						aboutMeContent.map(
							(content: aboutMeContent, index: number) => (
								<div
									key={index}
									className="flex flex-col items-center justify-center px-4 py-2"
								>
									<h3 className="font-bold text-xl">
										{content.title}
									</h3>
									<p>{content.id}</p>
									<div className="grid grid-cols-12 w-full gap-4">
										<p className="col-span-8 self-start">
											{content.content}
										</p>
										<div className="col-span-4 self-end">
											{content.media ? (
												<Image
													src={
														content.media as string
													}
													alt={content.title}
													width={48}
													height={48}
												/>
											) : (
												<p>No media available</p>
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
				</div>
			</div>
		</div>
	);
}
