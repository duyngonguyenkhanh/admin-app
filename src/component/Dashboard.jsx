import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../redux/thunk/order";
import OrderDetailModal from "./OrderDetailModal ";

const Dashboard = () => {
  const { order } = useSelector((state) => state.order);
  const { adminUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  const orders = order.order || [];
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const uniqueUsers = new Set(orders.map(order => order.user.userId));
  const totalUsers = uniqueUsers.size;

  const totalRevenue = orders.reduce((total, order) => {
    return total + order.products.reduce((subTotal, item) => subTotal + item.product.price * item.quantity, 0);
  }, 0);

   // Kiểm tra xem adminUser có tồn tại hay không
   if (!adminUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl">Bạn cần đăng nhập để truy cập trang này.</h1>
      </div>
    );
  }

  return (
    <div className="mb-10">
      {adminUser && (
        <div className="w-full flex justify-center">
          <div className="w-[1050px] flex border rounded-md shadow-lg mb-10">
            {/* Thống kê người dùng và doanh thu */}
            <div className="w-[350px] h-full flex justify-between border-r p-4">
              <div>
                <p className="text-2xl font-bold">{totalUsers}</p>
                <p className="font-medium text-sm text-gray-400">Clients</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
              </svg>
            </div>
            <div>
              <div className="w-[350px] h-full flex justify-between border-r p-4">
                <div>
                  <div className="flex">
                    <p className="text-2xl font-bold">{totalRevenue.toLocaleString("vi-VN")}</p>
                    <p className="font-bold">VND</p>
                  </div>
                  <p className="font-medium text-sm text-gray-400">Earnings of Month</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
            </div>
            <div>
              <div className="w-[350px] h-full flex justify-between p-4">
                <div>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                  <p className="font-medium text-sm text-gray-400">New order</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-yellow-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center my-6 ">
        <div className="w-[1050px] border rounded-md shadow-lg">
          <p className="m-3">History</p>
          <div className="flex justify-center">
            <table className="min-w-[98%] m-3 border-collapse border border-gray-300">
              <thead className="border">
                <tr>
                  <th className="border-r pl-4 py-2">ID User</th>
                  <th className="border-r pl-4 py-2">Name</th>
                  <th className="border-r pl-4 py-2">Phone</th>
                  <th className="border-r pl-4 py-2">Address</th>
                  <th className="border-r pl-4 py-2">Total</th>
                  <th className="border-r pl-4 py-2">Delivery</th>
                  <th className="border-r pl-4 py-2">Status</th>
                  <th className="border-r pl-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className="border-b">
                    <td className="border-r pl-4 py-2">{order.user.userId}</td>
                    <td className="border-r pl-4 py-2">{order.user.fullname}</td>
                    <td className="border-r pl-4 py-2">{order.user.phone}</td>
                    <td className="border-r pl-4 py-2">{order.user.address}</td>
                    <td className="border-r pl-4 py-2">
                      {order.products.reduce((total, item) => total + item.product.price * item.quantity, 0).toLocaleString("vi-VN")} VND
                    </td>
                    <td className="border-r pl-4 py-2">Chưa vận chuyển</td>
                    <td className="border-r pl-4 py-2">Chưa thanh toán</td>
                    <td className="border-r pl-4 py-2">
                      <button onClick={() => handleViewOrder(order)} className="bg-green-500 text-center text-white rounded-md px-2 py-1">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
