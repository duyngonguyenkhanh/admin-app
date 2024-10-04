import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct, getAllProduct } from "../redux/thunk/product";
import { resetState } from "../redux/productSlice";
import EditModal from "./EditModal";

const Products = () => {
  const { adminUser } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product || []);
  const { statusDelete, statusUpdate, statusAddProduct, errAddProduct } = useSelector((state) => state.product);

  console.log(errAddProduct);
  

  const dispatch = useDispatch();

  // Trạng thái mở/đóng modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null); // Trạng thái cho sản phẩm đang chỉnh sửa

  // Trạng thái form cho sản phẩm mới
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "", // Thêm input cho giá
    category: "",
    short_desc: "",
    long_desc: "",
    images: "",
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

  useEffect(() => {
    if (statusAddProduct === "successful") {
      // Chỉ gọi lại getAllProduct nếu có trạng thái thành công
      dispatch(getAllProduct());
      dispatch(resetState()); // Reset state sau khi chuyển hướng
    }
  }, [statusAddProduct, dispatch]); // chỉ theo dõi status

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
    // Tách chuỗi ảnh bằng dấu phẩy
    const imageArray = newProduct.images.split(",").map((img) => img.trim());

    // Đảm bảo mảng ảnh có đủ phần tử để gán vào các trường img1, img2, img3,...
    const [img1, img2, img3, img4] = imageArray;

    // Chuẩn bị dữ liệu sản phẩm giống như JSON
    const productData = {
      name: newProduct.name,
      price: newProduct.price,
      category: newProduct.category,
      short_desc: newProduct.short_desc,
      long_desc: newProduct.long_desc,
      img1: img1 || "undefine", // Đảm bảo có ít nhất 1 ảnh
      img2: img2 || "undefine", // Nếu không có ảnh nào khác, giữ trống
      img3: img3 || "undefine",
      img4: img4 || "undefine",
    };
    
   // console.log(productData);
    dispatch(addProduct(productData));
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
          {isModalOpen &&
            editProduct === null && ( // Kiểm tra nếu đang thêm sản phẩm
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
                    placeholder="Price"
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
                  {/* Input cho nhiều hình ảnh */}
                  <textarea
                    type="text"
                    name="short_desc"
                    value={newProduct.short_desc}
                    onChange={handleChange}
                    placeholder="Enter Short Description"
                    className="border p-2 mb-2 w-full  h-[100px]"
                  />
                  <textarea
                    type="text"
                    name="long_desc"
                    value={newProduct.long_desc}
                    onChange={handleChange}
                    placeholder="Enter Long Description"
                    className="border p-2 mb-2 w-full  h-[150px]"
                  />
                  <textarea
                    type="text"
                    name="images"
                    value={newProduct.images}
                    onChange={handleChange}
                    placeholder="Image URLs (cách nhau bằng dấu phẩy)"
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
          {isModalOpen &&
            editProduct && ( // Kiểm tra nếu đang chỉnh sửa sản phẩm
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
