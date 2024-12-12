import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="bg-indigo-700 border-b border-indigo-500">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              {/* <!-- Logo --> */}
              <Link className="flex flex-shrink-0 items-center mr-4" to="/">
                <img className="h-10 w-auto" src={logo} alt="Library" />
                <span className="hidden md:block text-white text-2xl font-bold ml-2">
                  Library
                </span>
              </Link>
              <div className="md:ml-auto">
                <div className="flex space-x-2">
                  <Link
                    to="/master/buku"
                    className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >
                    Master Data Buku
                  </Link>
                  <Link
                    to="/master/mahasiswa"
                    className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >
                    Master Data Mahasiswa
                  </Link>
                  <Link
                    to="/transaksi"
                    className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >
                    Transaksi
                  </Link>
                  <Link
                    to="/stok"
                    className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >
                    Stok Buku
                  </Link>
                  <Link
                    to="/history"
                    className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >
                    History
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
