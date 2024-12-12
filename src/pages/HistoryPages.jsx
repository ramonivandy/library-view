import React, { useState, useEffect } from "react";
import DynamicTable from "../components/DynamicTable";
import axios from "axios";
import "./Pages.css";

const HistoryPages = () => {
  const [history, setHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    nim: "",
    nama_mahasiswa: "",
    id_buku: "",
    judul_buku: "",
    tanggal_peminjaman: "",
    tanggal_kembali: "",
  });

  const tableColumns = [
    { key: "nama_mahasiswa", header: "Nama Mahasiswa" },
    { key: "nim", header: "NIM" },
    {
      key: "tanggal_peminjaman",
      header: "Tanggal Pinjam",
      render: (date) => {
        const d = new Date(date);
        return `${String(d.getDate()).padStart(2, "0")}-${String(
          d.getMonth() + 1
        ).padStart(2, "0")}-${d.getFullYear()}`;
      },
    },
    {
      key: "tanggal_kembali",
      header: "Tanggal Kembali",
      render: (date) => {
        if (!date) return "-";
        const d = new Date(date);
        return `${String(d.getDate()).padStart(2, "0")}-${String(
          d.getMonth() + 1
        ).padStart(2, "0")}-${d.getFullYear()}`;
      },
    },
    {
      key: "books",
      header: "Buku",
      render: (books) => (
        <ul className="list-disc pl-4">
          {books.map((book) => (
            <li key={book.id_buku} className="mb-1">
              {book.judul_buku}
              <span className="ml-2 text-sm text-gray-600">
                ({book.lama_pinjam})
              </span>
              <span
                className={`ml-2 px-2 py-1 rounded text-xs ${
                  book.status_pengembalian
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {book.status_pengembalian ? "Returned" : "Borrowed"}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: limit,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== "")
        ),
      });

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/history?${queryParams}`
      );

      if (response.data.status === 0) {
        setHistory(response.data.data);
        setTotalPages(response.data.metadata.totalPage);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [currentPage, limit, filters]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  return (
    <div className="layout">
      <div className="mb-8"></div>
      <div className="text-3xl px-4 mb-2">History Buku</div>

      <div className="px-4 mb-4 grid grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="nim"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            NIM (Student ID)
          </label>
          <input
            id="nim"
            type="text"
            name="nim"
            placeholder="Enter NIM"
            value={filters.nim}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="nama_mahasiswa"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nama Mahasiswa (Student Name)
          </label>
          <input
            id="nama_mahasiswa"
            type="text"
            name="nama_mahasiswa"
            placeholder="Enter Student Name"
            value={filters.nama_mahasiswa}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="id_buku"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ID Buku (Book ID)
          </label>
          <input
            id="id_buku"
            type="text"
            name="id_buku"
            placeholder="Enter Book ID"
            value={filters.id_buku}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="judul_buku"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Judul Buku (Book Title)
          </label>
          <input
            id="judul_buku"
            type="text"
            name="judul_buku"
            placeholder="Enter Book Title"
            value={filters.judul_buku}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="tanggal_peminjaman"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tanggal Peminjaman (Start Date)
          </label>
          <input
            id="tanggal_peminjaman"
            type="date"
            name="tanggal_peminjaman"
            value={filters.tanggal_peminjaman}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="tanggal_kembali"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tanggal Kembali (End Date)
          </label>
          <input
            id="tanggal_kembali"
            type="date"
            name="tanggal_kembali"
            value={filters.tanggal_kembali}
            onChange={handleFilterChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      </div>

      <div className="flex justify-between items-center px-4 mb-4">
        <div className="flex items-center space-x-2">
          <span>Show</span>
          <select
            value={limit}
            onChange={handleLimitChange}
            className="border rounded px-2 py-1"
          >
            {[5, 10, 20, 50, 100].map((limitOption) => (
              <option key={limitOption} value={limitOption}>
                {limitOption}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>
      </div>

      <DynamicTable
        columns={tableColumns}
        data={history}
        keyField="id_history"
        loading={loading}
      />

      <div className="mt-4 flex justify-center items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1 px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="mx-4 py-2">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="mx-1 px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HistoryPages;
