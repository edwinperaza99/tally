"use client";
import { Button } from "@/components/ui/button";
import { ThemePicker } from "./theme-picker";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
	const { data: session } = useSession();

	if (session) {
		return <Button onClick={() => signOut()}>Sign out</Button>;
	}

	return <Button onClick={() => signIn()}>Sign in</Button>;
}

export default function Navbar() {
	return (
		<>
			<div className="top-0 left-0 w-full shadow-md z-50">
				<div className="container mx-auto px-4 flex items-center justify-between h-16">
					<div>
						<ThemePicker />
					</div>
					<div className="flex gap-2">
						<AuthButton />
					</div>
				</div>
			</div>
		</>
	);
}
