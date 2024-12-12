import React, { useState, useEffect } from "react";
import DynamicTable from "../components/DynamicTable";
import axios from "axios";
import "./Pages.css";

const StokPages = () => {
  const [stok, setStok] = useState([]);
  const [loading, setLoading] = useState(false);

  // New state for pagination
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5); // Default limit of 10

  const tableColumns = [
    { key: "judul_buku", header: "Judul Buku" },
    {
      key: "jumlah_stok",
      header: "Jumlah Stok",
      render: (stok) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            stok > 50
              ? "bg-green-100 text-green-800"
              : stok > 10
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {stok}
        </span>
      ),
    },
    {
      key: "lokasi",
      header: "Lokasi Rak",
      render: (lokasi) => (
        <span className="font-semibold text-gray-700">{lokasi}</span>
      ),
    },
  ];

  const fetchStok = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/stok?page=${currentPage}&limit=${limit}`
      );
      if (response.data.status === 0) {
        setStok(response.data.data);
        setTotalPages(response.data.metadata.totalPage);
      }
    } catch (error) {
      console.error("Error fetching stok:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStok();
  }, [currentPage, limit]);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle limit change
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setLimit(newLimit);
    setCurrentPage(1); // Reset to first page when changing limit
  };

  return (
    <div className="layout">
      <div className="mb-8"></div>
      <div className="text-3xl px-4 mb-2">Stok Buku</div>

      {/* Pagination and Limit Controls */}
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
        data={stok}
        keyField="id_stok"
        loading={loading}
      />

      {/* Pagination */}
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

export default StokPages;
