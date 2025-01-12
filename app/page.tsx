import { ThemePicker } from "@/components/theme-picker";

export default function Home() {
	return (
		<main>
			<ThemePicker />
			<div className="flex min-h-screen justify-center items-center flex-col">
				<h1 className="text-7xl">Welcome</h1>
				<h2 className="text-7xl">This is Tally</h2>
				<p>Your personal counter</p>
			</div>
		</main>
	);
}
