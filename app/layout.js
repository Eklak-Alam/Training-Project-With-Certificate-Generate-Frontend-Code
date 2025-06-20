import Navbar from "@/components/Navbar";
import "./globals.css";
import { ApiProvider } from "@/context/api-context";
import Footer from "@/components/Fotter";

export const metadata = {
  title: "Student Management System",
  description: "Admin portal for managing student records",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApiProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ApiProvider>
      </body>
    </html>
  );
}