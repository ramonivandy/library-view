import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import DashboardPages from "./pages/DashboardPages";
import MasterBukuPages from "./pages/MasterBukuPages";
import MasterMahasiswaPages from "./pages/MasterMahasiswaPages";
import TransaksiPages from "./pages/TransaksiPages";
import StokPages from "./pages/StokPages";
import HistoryPages from "./pages/HistoryPages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPages />} />
        <Route path="/master/buku" element={<MasterBukuPages />} />
        <Route path="/master/mahasiswa" element={<MasterMahasiswaPages />} />
        <Route path="/transaksi" element={<TransaksiPages />} />
        <Route path="/stok" element={<StokPages />} />
        <Route path="/history" element={<HistoryPages />} />
      </Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
