import Form from "next/form";

interface AboutMeContentFormProps {
	children: React.ReactNode;
}

export function AboutMeContentForm({ children }: AboutMeContentFormProps) {
	return (
		<>
			<h1>AboutMeContentForm</h1>
			{children}
			<Form action="/search">
				{/* On submission, the input value will be appended to 
          the URL, e.g. /search?query=abc */}
				<input name="query" />
				<button type="submit">Submit</button>
			</Form>
		</>
	);
}
