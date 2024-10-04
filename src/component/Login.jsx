import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetState } from "../redux/authAdminSlice";
import { LoginAdmin } from "../redux/thunk/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  //funtion dispatch action
  const dispatch = useDispatch();

  //Hàm chuyển hướng
  const navigate = useNavigate();

  //state to the store
  const { status, err } = useSelector((state) => state.auth);

  const prevStatus = useRef(status);

  useEffect(() => {
    if (prevStatus.current !== "successful" && status === "successful") {
      // Chỉ chuyển hướng khi trạng thái thay đổi từ "loading" sang "successful"
      navigate("/admin-app/");
      dispatch(resetState()); // Reset state sau khi chuyển hướng
    }
    prevStatus.current = status; // Cập nhật trạng thái trước đó
  }, [dispatch, status, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tạo đối tượng dữ liệu để gửi đi
    const payload = {
      email: email,
      password: password,
    };

    dispatch(LoginAdmin(payload));
    // Gửi dữ liệu tới server
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-[30%] h-[30%] border border-stone-400 rounded-lg">
        <h2 className="text-center">Login with Admin Account</h2>
        <form className="px-[10%]" onSubmit={handleSubmit}>
          <div>
            <label className="">Email</label>
            <div>
              <input
                className="border rounded-lg w-full "
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label>Password</label>
            <div>
              <input
                className="border rounded-lg w-full"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {err && (<p className="italic text-rose-500">{err.message}</p>)}
          <div className="flex justify-center mt-5">
            <button
              className="w-full h-10 bg-stone-400 text-white hover:bg-stone-600 rounded-lg"
              type="submit"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
