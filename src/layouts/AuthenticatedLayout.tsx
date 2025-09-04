import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { mockUser } from "../mockData";

export function AuthenticatedLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header user={mockUser} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
