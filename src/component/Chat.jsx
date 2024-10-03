import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoom } from "../redux/thunk/chat";
const Chat = () => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.order);
  console.log(rooms);

  useEffect(() => {
    dispatch(getAllRoom());
  }, [dispatch]);
  return (
    <div className="bg-blue-50">
      <p className="mx-[5%]">chat</p>
      <div className="bg-white w-[90%] flex mx-[5%] border rounded-sm">
        <div className="w-[20%] h-screen border-r">
          <div className="flex justify-center items-center my-2 py-2 border-b">
            <input
              className="border rounded-lg"
              type="text"
              placeholder="Search contact"
            />
          </div>
          <div>
            {rooms.map((user) => (
              <div className="flex" key={user._id}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <p>{user.users[0]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[80%]">ok</div>
      </div>
    </div>
  );
};

export default Chat;
