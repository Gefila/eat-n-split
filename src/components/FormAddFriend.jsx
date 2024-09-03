import { useState } from "react";
import Button from "./Button";

export default function FormAddFriend({ onAddFriend }) {
	const [name, setName] = useState("");
	const [image, setImage] = useState("https://i.pravatar.cc/48");

	function handleSubmit(e) {
		e.preventDefault();
		if (!name) return;
		const id = crypto.randomUUID();
		const friend = {
			id,
			name,
			image: `${image}?u=${id}`,
			balance: 0,
		};
		onAddFriend(friend);
		setName("");
		setImage("https://i.pravatar.cc/48");
	}

	return (
		<form className="form-add-friend" onSubmit={handleSubmit}>
			<label htmlFor="friend-name">👫 Friend name</label>
			<input
				type="text"
				id="friend-name"
				value={name}
				onChange={(e) => setName(e.target.value)} />
			<label htmlFor="friend-image">🌄 Image URL</label>
			<input
				type="text"
				id="friend-image"
				value={image}
				onChange={(e) => setImage(e.target.value)} />
			<Button>Add Friend</Button>
		</form>
	);
}
