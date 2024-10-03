/* eslint-disable react/prop-types */
const OrderDetailModal = ({ order, onClose }) => {
  if (!order) return null; // Không hiển thị gì nếu không có order

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white italic p-8 rounded-lg shadow-lg w-[90%] max-h-[90%] overflow-y-auto">
        <h2 className="text-4xl font-bold mb-4">INFOMATION ORDER</h2>
        <div className="">
          <strong>ID User:</strong> {order.user.userId}
        </div>
        <div className="">
          <strong>Full name:</strong> {order.user.fullname}
        </div>
        <div className="">
          <strong>Phone:</strong> {order.user.phone}
        </div>
        <div className="">
          <strong>Address:</strong> {order.user.address}
        </div>
        <div className="mb-4">
          <strong>Total:</strong>{" "}
          {order.products
            .reduce((total, item) => total + item.product.price * item.quantity, 0)
            .toLocaleString("vi-VN")}
          VND
        </div>
        
        {/* Bổ sung chiều cao cố định và scroll cho danh sách sản phẩm */}
        <div className="flex text-center content-center">
          <p className="w-[20%]">ID PRODUCT</p>
          <p className="w-[20%]">IMAGE</p>
          <p className="w-[20%]">NAME</p>
          <p className="w-[20%]">PRICE</p>
          <p className="w-[20%]">COUNT</p>
        </div>
        
        <div className="overflow-y-auto max-h-60"> {/* Chiều cao tối đa 240px (60 * 4px) */}
          {order.products.map((item) => (
            <div key={item._id} className="flex text-center items-center">
              <p className="w-[20%]">{item._id}</p>
              <div className="w-[20%]">
                <img src={item.product.image} alt="" />
              </div>
              <p className="w-[20%]">{item.product.name}</p>
              <p className="w-[20%]">
                {item.product.price.toLocaleString("vi-VN")} VND
              </p>
              <p className="w-[20%]">{item.product.quantity}</p>
            </div>
          ))}
        </div>

        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={onClose} // Đóng modal khi nhấn nút Close
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetailModal;
