import { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

const ChatRoom = () => {
  const [rooms, setRooms] = useState([]); // Danh sách các phòng
  const [currentRoom, setCurrentRoom] = useState(null); // Phòng hiện tại admin đang chat
  const [messages, setMessages] = useState([]); // Tin nhắn trong phòng
  const [input, setInput] = useState(""); // Tin nhắn hiện tại
  const [allMessages, setAllMessages] = useState({}); // Lưu trữ tin nhắn theo từng phòng

  // Kết nối với server và nhận danh sách phòng
  useEffect(() => {
    // Kết nối tới server
    socket = io("https://backend-ecommerce-cp5v.onrender.com");

    // Lắng nghe danh sách phòng từ server
    socket.on("rooms", (roomsList) => {
      console.log("Danh sách phòng:", roomsList);
      setRooms(roomsList);
    });

    // Lắng nghe tin nhắn trong phòng hiện tại
    socket.on("message", (data) => {
      // Chỉ cập nhật tin nhắn nếu nó không phải do admin gửi
      if (data.userId !== "admin") {
        setMessages((prevMessages) => [...prevMessages, data]);
        setAllMessages((prevAllMessages) => ({
          ...prevAllMessages,
          [data.roomId]: [...(prevAllMessages[data.roomId] || []), data],
        }));
      }
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  // Admin tham gia vào một phòng
  const joinRoom = (roomId) => {
    setCurrentRoom(roomId); // Cập nhật phòng hiện tại
    socket.emit("joinRoom", { roomId, userId: "admin" });
    setMessages(allMessages[roomId] || []); // Cập nhật tin nhắn từ phòng cũ (nếu có)
    // Không cần phải xóa tin nhắn cũ ở đây nữa
  };

  // Admin gửi tin nhắn trong phòng hiện tại
  const sendMessage = () => {
    if (input.trim() && currentRoom) {
      const messageData = {
        roomId: currentRoom,
        message: input,
        userId: "admin", // Admin gửi tin
      };
      socket.emit("message", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]); // Cập nhật tin nhắn phía client
      setAllMessages((prevAllMessages) => ({
        ...prevAllMessages,
        [currentRoom]: [...(prevAllMessages[currentRoom] || []), messageData],
      }));
      setInput(""); // Xóa input sau khi gửi
    }
  };

  return (
    <div className="">
      <p className="mx-[5%] text-xl font-bold">Chat</p>
      <p className="mx-[5%] my-[1%] text-gray-400">Apps / Chat</p>
      <div className="flex mx-[5%] border rounded-lg shadow-lg bg-white">
        <div className="h-screen border-r w-[30%]">
          <div className="flex justify-center items-center my-2 py-2 border-b">
            <input
              className="w-[80%] border rounded-lg"
              type="text"
              placeholder="Search contact"
            />
          </div>
          <ul>
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <li className="flex border" key={room} onClick={() => joinRoom(room)}>
                  <p className="font-bold mr-2">Client</p> {room}
                </li>
              ))
            ) : (
              <li>Không có phòng nào</li>
            )}
          </ul>
        </div>
        <div className="w-[70%]">
        {currentRoom && (
            <div className="h-full">
              <div className="h-[90%] overflow-y-auto p-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`mb-2 ${msg.userId === "admin" ? "text-right" : "text-left"}`}>
                    <div
                      className={`inline-block p-2 rounded-lg ${
                        msg.userId === "admin" ? "bg-blue-200" : "bg-gray-200"
                      }`}
                    >
                      <strong>{msg.userId === "admin" ? "You" : "Client"}: </strong>
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex border-t py-2 items-center">
                <input
                  className="w-[90%] "
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                />
                <img className="size-10" src="https://img.icons8.com/?size=100&id=oWiuH0jFiU0R&format=png&color=000000" onClick={sendMessage} alt="" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
