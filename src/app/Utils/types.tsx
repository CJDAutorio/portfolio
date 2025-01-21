import React from "react";
import { ThreeElements } from '@react-three/fiber';
import { StorageReference } from "firebase/storage";

export interface Button {
	name: string;
	component: React.ReactNode;
}

declare module 'react' {
  type IntrinsicElements = ThreeElements
}

export interface aboutMeContent {
	id: string;
	content: string;
	media: StorageReference | File | string;
	title: string;
}

export interface WorkExperience {
	id: string;
	type: "work"
	company: string;
	role: string;
	startDate: string;
	endDate: string;
	description: string;
	media: StorageReference | File | string;
}

export interface ProjectExperience {
	id: string;
	type: "project";
	title: string;
	description: string;
	media: StorageReference | File | string;
}

export interface EducationExperience {
	id: string;
	type: "education";
	school: string;
	location: string;
	degree: string;
	startDate: string;
	endDate: string;
}