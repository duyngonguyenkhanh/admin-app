import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProduct } from "../redux/thunk/product";
import { resetState } from "../redux/productSlice";
import EditModal from "./EditModal";

const Products = () => {
  const { adminUser } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product || []);
  const { statusDelete } = useSelector((state) => state.product);
  const { statusUpdate } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  

  // Trạng thái mở/đóng modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null); // Trạng thái cho sản phẩm đang chỉnh sửa

  // Trạng thái form cho sản phẩm mới
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
    category: "",
  });

  // Gọi tất cả sản phẩm khi component được mount
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  useEffect(() => {
    if (statusDelete === "successful") {
      // Chỉ gọi lại getAllProduct nếu có trạng thái thành công
      dispatch(getAllProduct());
      dispatch(resetState()); // Reset state sau khi chuyển hướng
    }
  }, [statusDelete, dispatch]); // chỉ theo dõi status

  useEffect(() => {
    if (statusUpdate === "successful") {
      // Chỉ gọi lại getAllProduct nếu có trạng thái thành công
      dispatch(getAllProduct());
      dispatch(resetState()); // Reset state sau khi chuyển hướng
    }
  }, [statusUpdate, dispatch]); // chỉ theo dõi status

  // Mở modal để thêm sản phẩm
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditProduct(null); // Reset sản phẩm đang chỉnh sửa khi đóng modal
  };

  // Xử lý thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  // Xử lý khi nhấn nút "Add Product"
  const handleAddProduct = () => {
    // Dispatch action thêm sản phẩm mới với 5 hình ảnh
    const productData = {
      ...newProduct,
      images: [
        newProduct.img1,
        newProduct.img2,
        newProduct.img3,
        newProduct.img4,
        newProduct.img5,
      ],
    };



    //dispatch(addNewProduct(productData));
    // Sau khi thêm sản phẩm, đóng modal và reset form
    closeModal();
    setNewProduct({
      name: "",
      price: "",
      img1: "",
      img2: "",
      img3: "",
      img4: "",
      img5: "",
      category: "",
    });
  };

  // Hàm xóa 1 items
  const handlDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  // Hàm mở modal chỉnh sửa
  const openEditModal = (product) => {
    setEditProduct(product); // Gán sản phẩm cần chỉnh sửa
    setIsModalOpen(true); // Mở modal
  };

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
        <div>
          <p className="mx-4 my-2 font-bold">Product</p>
          <input
            className="m-4 border"
            type="text"
            placeholder="Enter Search!"
          />
          {/* Nút mở modal */}
          <button
            className="bg-blue-500 text-white p-2 m-4"
            onClick={openModal}
          >
            Add Product
          </button>

          {/* Modal để thêm sản phẩm */}
          {isModalOpen && editProduct === null && ( // Kiểm tra nếu đang thêm sản phẩm
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg w-[90%]">
                <h2 className="text-2xl mb-4">Add New Product</h2>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  placeholder="Product Price"
                  className="border p-2 mb-2 w-full"
                />
                {/* Input cho nhiều hình ảnh */}
                <input
                  type="text"
                  name="images"
                  value={newProduct.images}
                  onChange={handleChange}
                  placeholder="Image URLs (cách nhau bằng dấu phẩy)"
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="border p-2 mb-2 w-full"
                />
                <div className="flex justify-end">
                  <button
                    className="bg-green-500 text-white p-2 mr-2"
                    onClick={handleAddProduct}
                  >
                    Add Product
                  </button>
                  <button
                    className="bg-red-500 text-white p-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal chỉnh sửa sản phẩm */}
          {isModalOpen && editProduct && ( // Kiểm tra nếu đang chỉnh sửa sản phẩm
            <EditModal
              isOpen={isModalOpen}
              onClose={closeModal}
              product={editProduct}
            />
          )}

          <div className="flex justify-center">
            <table className="min-w-[98%] m-3 border-collapse border border-gray-300">
              <thead className="border">
                <tr className="text-gray-400 text-sm ">
                  <th className="border-r pl-4 py-2">ID</th>
                  <th className="border-r pl-4 py-2">Name</th>
                  <th className="border-r pl-4 py-2">Price</th>
                  <th className="border-r pl-4 py-2">Image</th>
                  <th className="border-r pl-4 py-2">Category</th>
                  <th className="border-r pl-4 py-2">Edit</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item._id} className="odd:bg-white even:bg-gray-100">
                    <td className="border-r pl-4 py-2">{item._id}</td>
                    <td className="border-r pl-4 py-2">{item.name}</td>
                    <td className="border-r pl-4 py-2">
                      {Number(item.price).toLocaleString("vi-VN")} VND
                    </td>
                    <td className="border-r pl-4 py-2">
                      <img className="size-9" src={item.img1} alt="" />
                    </td>
                    <td className="border-r pl-4 py-2">{item.category}</td>
                    <td className="pl-4 py-2">
                      <button
                        onClick={() => openEditModal(item)} // Mở modal chỉnh sửa khi nhấn nút
                        className="bg-green-500 p-2 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handlDelete(item._id);
                        }}
                        className="bg-red-500 p-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Thêm các hàng khác tương tự */}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
