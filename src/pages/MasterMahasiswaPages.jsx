import React, { useState, useEffect } from "react";
import DynamicForm from "../components/DynamicForm";
import DynamicTable from "../components/DynamicTable";
import axios from "axios";
import "./Pages.css";

const MasterMahasiswaPages = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(2);
  const [formData, setFormData] = useState({
    nama_mahasiswa: "",
    nim: "",
    angkatan: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const formFields = [
    { name: "nama_mahasiswa", placeholder: "Nama Mahasiswa", type: "text" },
    { name: "nim", placeholder: "NIM", type: "text" },
    { name: "angkatan", placeholder: "Angkatan", type: "text" },
  ];

  const tableColumns = [
    { key: "nama_mahasiswa", header: "Nama Mahasiswa" },
    { key: "nim", header: "NIM" },
    { key: "angkatan", header: "Angkatan" },
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

  // Fetch mahasiswa
  const fetchMahasiswa = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3001/master/mahasiswa?page=${currentPage}&limit=${limit}`
      );
      if (response.data.status === 0) {
        setMahasiswa(response.data.data);
        setTotalPages(response.data.metadata.totalPage);
      }
    } catch (error) {
      console.error("Error fetching mahasiswa:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMahasiswa();
  }, [currentPage]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add new mahasiswa or update existing mahasiswa
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await axios.put(
          `http://localhost:3001/master/mahasiswa/${editId}`,
          formData
        );
        if (response.data.status === 0) {
          alert(response.data.message);
        }
      } else {
        const response = await axios.post(
          "http://localhost:3001/master/mahasiswa",
          formData
        );
        if (response.data.status === 0) {
          alert(response.data.message);
        }
      }
      setFormData({
        nama_mahasiswa: "",
        nim: "",
        angkatan: "",
      });
      setIsEditing(false);
      setEditId(null);
      fetchMahasiswa();
    } catch (error) {
      console.error("Error saving mahasiswa:", error);
      alert("Error saving mahasiswa");
    }
  };

  // Edit mahasiswa
  const handleEdit = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/master/mahasiswa/${id}`
      );
      if (response.data.status === 0) {
        setFormData({
          nama_mahasiswa: response.data.data.nama_mahasiswa,
          nim: response.data.data.nim,
          angkatan: response.data.data.angkatan,
        });
        setIsEditing(true);
        setEditId(id);
      }
    } catch (error) {
      console.error("Error fetching mahasiswa details:", error);
      alert("Error fetching mahasiswa details");
    }
  };

  // Delete mahasiswa
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this mahasiswa?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/master/mahasiswa/${id}`
        );
        if (response.data.status === 0) {
          alert(response.data.message);
          fetchMahasiswa();
        }
      } catch (error) {
        console.error("Error deleting mahasiswa:", error);
        alert("Error deleting mahasiswa");
      }
    }
  };

  return (
    <div className="layout">
      <div className="mb-8"></div>
      <div className="text-3xl px-4 mb-2">Master Mahasiswa</div>

      <DynamicForm
        fields={formFields}
        values={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />

      <DynamicTable
        columns={tableColumns}
        data={mahasiswa}
        actions={tableActions}
        onAction={handleTableAction}
        keyField="id_mahasiswa"
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

export default MasterMahasiswaPages;