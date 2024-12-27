const joinNs = (element, nsData) => {
  const nsEndpoint = element.getAttribute("ns");
  console.log(nsEndpoint);

  const clickedNs = nsData.find((row) => row.endpoint === nsEndpoint);
  //global so we can submit the new message to the right place
  selectedNsId = clickedNs.id;
  const rooms = clickedNs.rooms;

  //get the room-list div
  let roomList = document.querySelector(".room-list");
  //clear it out
  roomList.innerHTML = "";

  //init firstRoom var
  let firstRoom;

  //loop through each room, and add it to the DOM
  rooms.forEach((room, i) => {
    if (i === 0) {
      firstRoom = room.roomTitle;
    }
    console.log(room);
    roomList.innerHTML += `<li class="room" namespaceId=${room.namespaceId}>
            <span class="fa-solid fa-${
              room.privateRoom ? "lock" : "globe"
            }"></span>${room.roomTitle}
        </li>`;
  });
};
