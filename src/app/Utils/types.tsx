import React from "react";
import { ThreeElements } from '@react-three/fiber';

export interface Button {
	name: string;
	component: React.ReactNode;
}

declare module 'react' {
  type IntrinsicElements = ThreeElements
}