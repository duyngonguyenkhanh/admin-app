import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import các hook từ React-Redux
import { SignupAdmin } from "../redux/thunk/auth";
import { useNavigate } from "react-router-dom";
import { resetState } from "../redux/authAdminSlice";


const Signup = () => {
  //funtion dispatch action
  const dispatch = useDispatch()
  //Hàm chuyển hướng
  const navigate = useNavigate()
  //state to the store
  const {status, err} = useSelector(state => state.auth)

  const prevStatus = useRef(status);


  useEffect(() => {
    if (prevStatus.current !== "successful" && status === "successful") {
      // Chỉ chuyển hướng khi trạng thái thay đổi từ "loading" sang "successful"
      navigate("/login");
      dispatch(resetState()); // Reset state sau khi chuyển hướng
    }
    prevStatus.current = status; // Cập nhật trạng thái trước đó
  }, [dispatch, status, navigate]);

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tạo đối tượng dữ liệu để gửi đi
    const adminData = {
      email: email,
      password: password,
      phone: phone,
    };

    dispatch(SignupAdmin(adminData))

    // Gửi dữ liệu tới server
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-[30%] h-[30%] border border-stone-400 rounded-lg">
        <h2 className="text-center">Create Admin Account</h2>
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
          <div>
            <label>Phone</label>
            <div>
              <input
                className="border rounded-lg w-full"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          {err && (<p className="italic text-rose-500">{err.message}</p>)}
          <div className="flex justify-center mt-5">
            <button className="w-full h-10 bg-stone-400 text-white hover:bg-stone-600 rounded-lg" type="submit">
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
