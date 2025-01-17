interface AdminFormProps {
	children: React.ReactNode;
	
}

export function AdminForm({ children }: AdminFormProps) {
	return (
		<>
			<h1>AdminForm</h1>
			{children}

		</>
	);
}
