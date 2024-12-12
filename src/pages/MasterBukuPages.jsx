import React, { useState, useEffect } from "react";
import DynamicForm from "../components/DynamicForm";
import DynamicTable from "../components/DynamicTable";
import axios from "axios";
import "./Pages.css";

const MasterBukuPages = () => {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(2);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    judul_buku: "",
    pengarang: "",
    penerbit: "",
    tahun_terbit: "",
    harga: "",
    stok: "",
    rak: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const formFields = [
    { name: "judul_buku", placeholder: "Judul Buku", type: "text" },
    { name: "pengarang", placeholder: "Pengarang", type: "text" },
    { name: "penerbit", placeholder: "Penerbit", type: "text" },
    { name: "tahun_terbit", placeholder: "Tahun Terbit", type: "text" },
    { name: "harga", placeholder: "Harga", type: "number" },
    { name: "stok", placeholder: "Stok", type: "number" },
    { name: "rak", placeholder: "Rak", type: "text" },
  ];

  const tableColumns = [
    { key: "judul_buku", header: "Judul" },
    { key: "pengarang", header: "Pengarang" },
    { key: "penerbit", header: "Penerbit" },
    { key: "tahun_terbit", header: "Tahun" },
    { key: "harga", header: "Harga" },
    { key: "stok", header: "Stok" },
    { key: "rak", header: "Rak" },
  ];

  const tableActions = [
    {
      type: "edit",
      label: "Edit",
      className: "bg-yellow-500 text-white rounded",
    },
    {
      type: "delete",
      label: "Delete",
      className: "bg-red-500 text-white rounded",
    },
  ];

  const handleTableAction = (type, id) => {
    if (type === "edit") {
      handleEdit(id);
    } else if (type === "delete") {
      handleDelete(id);
    }
  };

  // Fetch books
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/master/buku?page=${currentPage}&limit=${limit}`
      );
      if (response.data.status === 0) {
        setBooks(response.data.data);
        setTotalPages(response.data.metadata.totalPage);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const value =
      e.target.type === "number" ? parseInt(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  // Add new book or update existing book
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/master/buku/${editId}`,
          formData
        );
        if (response.data.status === 0) {
          alert(response.data.message);
        }
      } else {
        const response = await axios.post(
          "${import.meta.env.VITE_API_URL}/master/buku",
          formData
        );
        if (response.data.status === 0) {
          alert(response.data.message);
        }
      }
      setFormData({
        judul_buku: "",
        pengarang: "",
        penerbit: "",
        tahun_terbit: "",
        harga: "",
        stok: "",
        rak: "",
      });
      setIsEditing(false);
      setEditId(null);
      fetchBooks();
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Error saving book");
    }
  };

  // Edit book
  const handleEdit = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/master/buku/${id}`
      );
      if (response.data.status === 0) {
        setFormData({
          judul_buku: response.data.data.judul_buku,
          pengarang: response.data.data.pengarang,
          penerbit: response.data.data.penerbit,
          tahun_terbit: response.data.data.tahun_terbit,
          harga: response.data.data.harga,
          stok: response.data.data.stok,
          rak: response.data.data.rak,
        });
        setIsEditing(true);
        setEditId(id);
      }
    } catch (error) {
      console.error("Error fetching book details:", error);
      alert("Error fetching book details");
    } finally {
      setLoading(false);
    }
  };

  // Delete book
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/master/buku/${id}`
        );
        if (response.data.status === 0) {
          alert(response.data.message);
          fetchBooks();
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Error deleting book");
      }
    }
  };

  return (
    <div className="layout">
      <div className="mb-8"></div>
      <div className="text-3xl px-4 mb-2">Master Buku</div>

      <DynamicForm
        fields={formFields}
        values={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />

      <DynamicTable
        columns={tableColumns}
        data={books}
        actions={tableActions}
        onAction={handleTableAction}
        keyField="id_buku"
        loading={loading}
      />

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="mx-1 px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage >= totalPages}
          className="mx-1 px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MasterBukuPages;
