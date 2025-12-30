import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="pt-28"> {/* Adds space below fixed navbar */}
        {children}
      </div>
    </div>
  );
}
