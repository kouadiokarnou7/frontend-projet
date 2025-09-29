import { Outlet } from "react-router-dom";
import Header from "../../header";
import Sidebar from "../../sidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col md:ml-64">
        <Header />
        <main className="p-6">
          {/* Les vues vont s’afficher ici */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
