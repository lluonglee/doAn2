"use client";
import { usePathname } from "next/navigation";
import NavBar from "./home/navbar/page";
import Sidebar from "./home/sidebar/page";
import Footer from "./home/footer/page";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const excludedPaths = ["/login", "/admin"];
  const isExcludedPage = excludedPaths.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render NavBar */}
      {!isExcludedPage && (
        <header className="z-20">
          <NavBar />
        </header>
      )}

      <div className="flex flex-1">
        {/* Conditionally render Sidebar */}
        {!isExcludedPage && (
          <aside className="z-10">
            <Sidebar />
          </aside>
        )}

        <main className="flex-grow w-full">
          {/* Main content */}
          <div className={!isExcludedPage ? "mt-16 flex-grow" : "flex-grow"}>
            {children}
          </div>
        </main>
      </div>

      {/* Always render the Footer at the bottom */}
      {!isExcludedPage && (
        <footer className="w-full mt-auto z-20">
          <Footer />
        </footer>
      )}
    </div>
  );
}
