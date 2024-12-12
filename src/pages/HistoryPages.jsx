import React, { useState, useEffect } from "react";
import DynamicTable from "../components/DynamicTable";
import axios from "axios";
import "./Pages.css";

const HistoryPages = () => {
  const [history, setHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(2);
  const [loading, setLoading] = useState(false);

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
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/history?page=${currentPage}&limit=${limit}`
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
  }, [currentPage]);

  return (
    <div className="layout">
      <div className="mb-8"></div>
      <div className="text-3xl px-4 mb-2">History Buku</div>

      <DynamicTable
        columns={tableColumns}
        data={history}
        keyField="id_history"
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

export default HistoryPages;
