import { useState } from "react";
import  FriendsList from "./components/FriendsList";
import  Button from "./components/Button";
import  FormAddFriend from "./components/FormAddFriend";
import  FormSplitBill from "./components/FormSplitBill";

const initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];

function App() {
	const [friends, setFriends] = useState(initialFriends);
	const [showAddFriendForm, setShowAddFriendForm] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState(null);

	function handleAddFriend(friend) {
		setFriends((friends) => [...friends, friend]);
		setShowAddFriendForm(false);
	}

	function handleSelectedFriend(friend) {
		setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
		setShowAddFriendForm(false);
	}

	function handleSplitBill(value) {
		setFriends((friends) =>
			friends.map((friend) =>
				friend.id === selectedFriend.id
					? { ...friend, balance: friend.balance + Number(value) }
					: friend
			)
		);
		setSelectedFriend(null);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList
					friends={friends}
					onSelectFriend={handleSelectedFriend}
					selectedFriend={selectedFriend}
				/>
				{showAddFriendForm && (
					<FormAddFriend onAddFriend={handleAddFriend} />
				)}
				<Button
					onClick={() => setShowAddFriendForm(!showAddFriendForm)}
				>
					{showAddFriendForm ? "Close" : "Add Friend"}
				</Button>
			</div>
			{selectedFriend && (
				<FormSplitBill
					selectedFriend={selectedFriend}
					onSplitBill={handleSplitBill}
					key={selectedFriend.id}
				/>
			)}
		</div>
	);
}

export default App;
