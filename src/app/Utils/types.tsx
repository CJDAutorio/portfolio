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