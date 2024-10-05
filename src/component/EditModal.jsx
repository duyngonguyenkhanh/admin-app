// src/components/EditModal.js
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../redux/thunk/product";

/* eslint-disable react/prop-types */
const EditModal = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    setEditProduct(product);
  }, [product]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (editProduct) {
        console.log(editProduct._id, editProduct);
        
      dispatch(updateProduct({id: editProduct._id, payload: editProduct})); // Gọi hàm cập nhật sản phẩm
      
      onClose(); // Đóng modal sau khi lưu
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[80%]">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={editProduct?.name || ""}
            onChange={handleEditChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </label>
        <label className="block mb-2">
          Price:
          <input
            type="text"
            name="price"
            value={editProduct?.price || ""}
            onChange={handleEditChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </label>
        <label className="block mb-2">
          Category:
          <input
            type="text"
            name="category"
            value={editProduct?.category || ""}
            onChange={handleEditChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </label>
        <label className="block mb-2">
          Quantity:
          <input
            type="number"
            name="quantity"
            value={editProduct?.quantity || ""}
            onChange={handleEditChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </label>
        <label className="block mb-2">
          Long Decription:
          <textarea
            type="text"
            name="long_desc"
            value={editProduct?.long_desc || ""}
            onChange={handleEditChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </label>
        <label className="block mb-2">
          Short Decription:
          <textarea
            type="text"
            name="short_desc"
            value={editProduct?.short_desc || ""}
            onChange={handleEditChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </label>
        {/* Bỏ qua các trường img, không cho phép chỉnh sửa */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white rounded px-4 py-2 mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 rounded px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
