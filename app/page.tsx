"use client";
import { useState, useEffect } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Item = {
	name: string;
	count: number;
};

export default function Home() {
	const [items, setItems] = useState<Item[]>([]);
	const [newItemName, setNewItemName] = useState("");
	const [newItemValue, setNewItemValue] = useState<number | "">("");

	// Load items from localStorage on mount
	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedItems = localStorage.getItem("tally-items");
			if (storedItems) {
				try {
					setItems(JSON.parse(storedItems));
				} catch (error) {
					console.error("Error parsing localStorage data:", error);
				}
			}
		}
	}, []);

	// Save items to localStorage whenever they update
	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("tally-items", JSON.stringify(items));
		}
	}, [items]);

	const handleAddItem = () => {
		if (newItemName.trim() !== "") {
			const newItem: Item = {
				name: newItemName.trim(),
				count: newItemValue === "" ? 0 : Number(newItemValue),
			};
			setItems((prevItems) => [...prevItems, newItem]);
			setNewItemName("");
			setNewItemValue("");
		}
	};

	const incrementCount = (index: number) => {
		const updatedItems = [...items];
		updatedItems[index].count += 1;
		setItems(updatedItems);
	};

	const decrementCount = (index: number) => {
		const updatedItems = [...items];
		updatedItems[index].count = Math.max(0, updatedItems[index].count - 1); // Prevent negative counts
		setItems(updatedItems);
	};

	return (
		<main className="container mx-auto px-2">
			<section className="flex min-h-[45dvh] justify-center items-center flex-col">
				<p className="text-7xl">Welcome</p>
				<h1 className="text-7xl">This is Tally</h1>
				<p>
					Log in or create an account to save everything, else it is saved on
					local storage.
				</p>
			</section>
			<section>
				<Dialog>
					<DialogTrigger asChild>
						<Button>Add Item</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add a New Item</DialogTitle>
							<DialogDescription>
								Enter the name and an initial value for the item you&apos;d like
								to add to your Tally list.
							</DialogDescription>
						</DialogHeader>
						<Input
							placeholder="Item name"
							value={newItemName}
							onChange={(e) => setNewItemName(e.target.value)}
							className="mb-2"
						/>
						<Input
							placeholder="Initial value"
							type="number"
							value={newItemValue}
							onChange={(e) =>
								setNewItemValue(
									e.target.value === "" ? "" : Number(e.target.value)
								)
							}
							className="mb-4"
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button
									onClick={handleAddItem}
									disabled={!newItemName.trim()}
									className="w-full"
								>
									Add Item
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</section>
			<section className="mt-6 w-full space-y-4 max-w-5xl flex justify-center flex-col mx-auto">
				{items.length === 0 ? (
					<div className="text-center mt-6">
						<p className="text-lg font-medium">
							No items yet. Add one to get started!
						</p>
					</div>
				) : (
					<ul className="mt-6 w-full space-y-4 max-w-5xl flex justify-center flex-col mx-auto">
						{items.map((item, index) => (
							<li
								key={index}
								className="flex items-center justify-between border-2 rounded-full py-2 px-6 w-full hover:scale-105 hover:border-foreground transition-transform duration-300"
							>
								<Button
									variant="outline"
									className="rounded-full"
									size="icon"
									onClick={() => decrementCount(index)}
								>
									-
								</Button>
								<div className="flex flex-col gap-2 items-center justify-center">
									<span className="text-xl font-semibold">{item.name}</span>
									<span className="text-lg mt-2">{item.count}</span>
								</div>
								<Button
									variant="outline"
									className="rounded-full"
									size="icon"
									onClick={() => incrementCount(index)}
								>
									+
								</Button>
							</li>
						))}
					</ul>
				)}
			</section>
		</main>
	);
}
