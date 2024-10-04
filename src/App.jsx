import { Route, Routes } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Products from "./component/Products";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Narbar from "./layout/Narbar";
import ChatRoom from "./component/chatTest";
function App() {
  const routesConfig = [
    { path: "/admin-app", element: <Dashboard /> },
    { path: "/admin-app/products", element: <Products /> },
    { path: "/admin-app/signup", element: <Signup /> },
    { path: "/admin-app/login", element: <Login /> },
    { path: "/admin-app/chat", element: <ChatRoom /> },
    // Thêm các route khác vào đây...
  ];

  return (
    <>
        <Routes basename="/admin-app/">
          {routesConfig.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      <div className="flex justify-center fixed bottom-0 w-full h-10 z-10">
        <Narbar />
      </div>
    </>
  );
}

export default App;
