import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
	const [bill, setBill] = useState("");
	const [paidByUser, setPaidByUser] = useState("");
	const [whoIsPaying, setWhoIsPaying] = useState("You");
	const paidByfriend = bill ? bill - paidByUser : "";

	function handleSubmit(e) {
		e.preventDefault();
		if (!bill || !paidByUser) return;
		onSplitBill(whoIsPaying === "You" ? paidByUser : -paidByfriend);
		setBill("");
		setPaidByUser("");
	}

	return (
		<form className="form-split-bill" onSubmit={handleSubmit}>
			<h2>Split a bill with {selectedFriend.name}</h2>
			<label htmlFor="bill">💰 Bill value</label>
			<input
				type="text"
				id="bill"
				value={bill}
				onChange={(e) => setBill(e.target.value)} />
			<label htmlFor="expense">🧍‍♀️ Your expense</label>
			<input
				type="text"
				id="expense"
				value={paidByUser}
				onChange={(e) => Number(e.target.value) > bill
					? paidByUser
					: setPaidByUser(e.target.value)} />
			<label>👫 {selectedFriend.name}&apos; expense</label>
			<input type="text" disabled value={paidByfriend} />
			<label htmlFor="pay">🤑 Who is paying the bill</label>
			<select
				name=""
				id="pay"
				value={whoIsPaying}
				onChange={(e) => setWhoIsPaying(e.target.value)}
			>
				<option value="you">You</option>
				<option value="friend">clark</option>
			</select>
			<Button>Split bill</Button>
		</form>
	);
}
