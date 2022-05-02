function makeFriendsList(friends) {
  let list = document.createElement("ul");

  for (let friend of friends) { 
    let item = document.createElement('li');
		let name = `${friend.firstName} ${friend.lastName}`
    item.appendChild(document.createTextNode(name));
    list.appendChild(item);
  }

  return list
};
