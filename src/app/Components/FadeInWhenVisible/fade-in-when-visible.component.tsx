import { motion } from "motion/react";

interface FadeInWhenVisibleProps {
	children: React.ReactNode;
}

export function FadeInWhenVisible({ children }: FadeInWhenVisibleProps) {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: false }}
			transition={{ duration: 0.5 }}
			variants={{
				visible: { opacity: 1, scale: 1, transform: "translateY(0)" },
				hidden: { opacity: 0, scale: 1, transform: "translateY(50px)" },
			}}
		>
			{children}
		</motion.div>
	);
}
