import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../redux/thunk/auth";
import { onLogout } from "../redux/authAdminSlice";

const Narbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  //state to the store
  const { adminUser } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    dispatch(onLogout());
  };

  return (
    <div className="flex justify-between border rounded-md w-[90%] bg-white">
      <div
        onClick={() => navigate("/admin-app/")}
        className={`flex justify-center items-center mx-4 ${
          location.pathname === "/admin-app/" ? "text-yellow-500" : ""
        }`}
      >
        <h1 className="mr-2">Dashboard</h1>
        <img
          className="size-5"
          src="https://img.icons8.com/?size=100&id=aVHe2jHuORcA&format=png&color=000000"
          alt=""
        />
      </div>
      <div
        onClick={() => navigate("/admin-app/products")}
        className={`flex justify-center items-center mx-4 ${
          location.pathname === "/admin-app/products" ? "text-yellow-500" : ""
        }`}
      >
        <h1 className="mr-2">Product</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          />
        </svg>
      </div>
      <div
        onClick={() => {
          navigate("/admin-app/chat");
        }}
        className={`flex justify-center items-center mx-4 ${
          location.pathname === "/admin-app/chat" ? "text-yellow-500" : ""
        }`}
      >
        <h1 className="mr-2">Chats</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          />
        </svg>
      </div>
      {adminUser ? (
        <div
          onClick={() => {
            handleLogout();
          }}
          className="flex justify-center items-center mx-4"
        >
          <h1 className="mr-2">Logout</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </div>
      ) : (
        <div
          onClick={() => {
            navigate("/admin-app/login");
          }}
          className={`flex justify-center items-center mx-4 ${location.pathname === "/admin-app/login" ? "text-yellow-500" : ""}`}
        >
          <h1 className="mr-2">Login</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Narbar;
