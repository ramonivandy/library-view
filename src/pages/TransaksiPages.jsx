import React, { useState, useEffect } from "react";
import DynamicTable from "../components/DynamicTable";
import TransactionForm from "../components/TransactionForm";
import axios from "axios";
import "./Pages.css";

const TransaksiPages = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(2);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

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

  const tableActions = [
    {
      type: "return",
      label: "Return Books",
      className: "bg-blue-500 text-white rounded",
      condition: (item) => item.books.some((book) => !book.status_pengembalian),
    },
  ];

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/transaksi?page=${currentPage}&limit=${limit}`
      );
      if (response.data.status === 0) {
        setTransactions(response.data.data);
        setTotalPages(response.data.metadata.totalPage);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const handleReturn = async (id) => {
    try {
      const transaction = transactions.find((t) => t.id_transaksi === id);
      const unreturnedBooks = transaction.books
        .filter((book) => !book.status_pengembalian)
        .map((book) => book.id_buku);

      if (unreturnedBooks.length === 0) {
        alert("No books to return");
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/transaksi/${id}/return`,
        { book_ids: unreturnedBooks }
      );

      if (response.data.status === 0) {
        alert(response.data.message);
        fetchTransactions();
      }
    } catch (error) {
      console.error("Error returning books:", error);
      alert("Error returning books");
    }
  };

  const handleTableAction = (type, id) => {
    if (type === "return") {
      handleReturn(id);
    }
  };

  const handleCreateTransaction = async (formData) => {
    try {
      console.log(formData);
      const response = await axios.post(
        "${import.meta.env.VITE_API_URL}/transaksi",
        formData
      );
      if (response.data.status === 0) {
        alert(response.data.message);
        setShowForm(false);
        fetchTransactions();
      }
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="layout">
      <div className="mb-8"></div>
      <div className="text-3xl px-4 mb-2">Transaksi Buku</div>

      <div className="px-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowForm(true)}
        >
          Tambah Transaksi
        </button>
      </div>

      {showForm && (
        <TransactionForm
          onSubmit={handleCreateTransaction}
          onClose={() => setShowForm(false)}
        />
      )}

      <DynamicTable
        columns={tableColumns}
        data={transactions}
        actions={tableActions}
        onAction={handleTableAction}
        keyField="id_transaksi"
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

export default TransaksiPages;
