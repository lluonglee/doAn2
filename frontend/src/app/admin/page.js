import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Content from "./content";

export default function Home() {
  return (
    <div className="main-container flex flex-row">
      <Sidebar />
      <div className="main-content w-full flex flex-col  relative">
        {/* Navbar */}
        <Navbar />
        <div className="mt-16">
          {" "}
          {/* Adjust 'mt-16' according to your Navbar height */}
          <Content />
        </div>
      </div>
    </div>
  );
}
