import { Button } from "@/components/ui/button";
import { ThemePicker } from "./theme-picker";

export default function Navbar() {
	return (
		<>
			<div className="top-0 left-0 w-full shadow-md z-50">
				<div className="container mx-auto px-4 flex items-center justify-between h-16">
					<div>
						<ThemePicker />
					</div>
					<div className="flex gap-2">
						<Button variant="outline">Log In</Button>
						<Button>Sign Up</Button>
					</div>
				</div>
			</div>
		</>
	);
}
