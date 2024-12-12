import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionForm = ({ onSubmit, onClose }) => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    id_mahasiswa: "",
    books: [],
    tanggal_peminjaman: "",
    tanggal_kembali: "",
  });

  useEffect(() => {
    const fetchMahasiswa = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/master/mahasiswa`
        );
        setMahasiswa(response.data.data);
      } catch (error) {
        console.error("Error fetching mahasiswa:", error);
      }
    };

    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/master/buku`
        );
        setBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchMahasiswa();
    fetchBooks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleBookSelection = (id) => {
    const bookId = parseInt(id);
    setFormData((prev) => ({
      ...prev,
      books: prev.books.includes(bookId)
        ? prev.books.filter((b) => b !== bookId)
        : [...prev.books, bookId],
    }));
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Mahasiswa</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.id_mahasiswa}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  id_mahasiswa: parseInt(e.target.value),
                })
              }
              required
            >
              <option value="">Select Mahasiswa</option>
              {mahasiswa.map((m) => (
                <option key={m.id_mahasiswa} value={m.id_mahasiswa}>
                  {m.nama_mahasiswa} - {m.nim}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Tanggal Peminjaman</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={formData.tanggal_peminjaman}
              onChange={(e) =>
                setFormData({ ...formData, tanggal_peminjaman: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block mb-2">Tanggal Kembali</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={formData.tanggal_kembali}
              onChange={(e) =>
                setFormData({ ...formData, tanggal_kembali: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-2">Select Books</label>
          <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
            {books.map((book) => (
              <div key={book.id_buku} className="flex items-center">
                <input
                  type="checkbox"
                  id={`book-${book.id_buku}`}
                  checked={formData.books.includes(book.id_buku)}
                  onChange={() => handleBookSelection(book.id_buku)}
                  className="mr-2"
                />
                <label htmlFor={`book-${book.id_buku}`}>
                  {book.judul_buku}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
