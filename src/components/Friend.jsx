
export default function Friend({ friend, onSelectFriend, selectedFriend }) {
	const isSelected = selectedFriend?.id === friend.id;
	function handleClick(friend) {
		onSelectFriend(friend);
	}
	return (
		<li className={isSelected ? "selected" : ""}>
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
			<button className="button" onClick={() => handleClick(friend)}>
				{isSelected ? "close" : "select"}
			</button>
		</li>
	);
}
