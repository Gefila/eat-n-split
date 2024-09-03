import { useState } from "react";

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

	function handleAddFriend(friend){
		setFriends((friends)=> [...friends, friend])
	}

	function handleSelecteFriend(friend){
		setSelectedFriend(friend)
		console.log(friend)
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList friends={friends} onSelectFriend={handleSelecteFriend}/>
				{showAddFriendForm && <FormAddFriend onAddFriend={handleAddFriend}/>}
				<Button onClick={()=> setShowAddFriendForm(!showAddFriendForm)}>{showAddFriendForm? "Close" : "Add Friend"}</Button>
			</div>
			<FormSplitBill selectedFriend={selectedFriend}/>
		</div>
	);
}

function FriendsList({ friends, onSelectFriend }) {
	return (
		<ul>
			{friends.map((friend) => (
				<Friend key={friend.id} friend={friend} onSelectFriend={onSelectFriend}/>
			))}
		</ul>
	);
}

function Friend({ friend, onSelectFriend }) {
	function handleClick(friend){
		onSelectFriend(friend)
	}
	return (
		<li>
			<img src={friend.image} alt={friend.name} />
			<h3>{friend.name}</h3>
			{friend.balance < 0 && (
				<p className="red">
					you owe {friend.name} {friend.balance}$
				</p>
			)}

			{friend.balance > 0 && (
				<p className="green">
					{friend.name} owe you {friend.balance}$
				</p>
			)}
			{friend.balance === 0 && <p>you and {friend.name} are even</p>}
			<button className="button" onClick={()=> handleClick(friend)}>select</button>
		</li>
	);
}

function Button({ children, onClick }) {
	return <button className="button" onClick={onClick}>{children}</button>;
}

function FormAddFriend({onAddFriend}) {
	const [name, setName] = useState("")
	const [image, setImage] = useState("https://i.pravatar.cc/48")

	function handleSubmit(e){
		e.preventDefault()
		const id = crypto.randomUUID()
		const friend = {
			id: id,
			name,
			image: `${image}?u=${id}`,
			balance: 0
		}
		onAddFriend(friend)
	}
	return (
		<form className="form-add-friend" onSubmit={handleSubmit}>
			<label htmlFor="friend-name">👫 Friend name</label>
			<input type="text" id="friend-name" value={name} onChange={(e)=> setName(e.target.value)}/>
			<label htmlFor="friend-image">🌄 Image URL</label>
			<input type="text" id="friend-image" value={image} onChange={(e)=> setImage(e.target.value)}/>
			<Button>Add Friend</Button>
		</form>
	);
}

function FormSplitBill({}) {
	return (
		<form className="form-split-bill">
			<h2>Split a bill with {}</h2>
			<label htmlFor="bill">💰 Bill value</label>
			<input type="text" id="bill" />
			<label htmlFor="pay">🤑 Who is paying the bill</label>
			<select name="" id="pay">
				<option value="">You</option>
				<option value="friend">clark</option>
			</select>
			<Button>Split bill</Button>
		</form>
	);
}

export default App;
