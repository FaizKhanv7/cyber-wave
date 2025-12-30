import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b-2 border-black bg-white">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="bg-black rounded-lg p-1 border-2 border-black shadow-sm group-hover:scale-105 transition-transform">
          <img
            src="/Logo.png"
            alt="CyberWave Logo"
            className="w-10 h-10 object-contain group-hover:rotate-12 transition-transform"
          />
        </div>
        <span className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors">
          CYBERWAVE_
        </span>
      </Link>


        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-bold items-center text-slate-600">
          {["Home", "Schedule", "Prizes", "FAQ"].map((item) => (
            <Link 
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
              className="hover:text-blue-600 hover:underline decoration-wavy decoration-2 underline-offset-4 transition-all"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/register"
          className="hidden md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:shadow-none transition-all"
        >
          Register
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden text-black p-1 border-2 border-transparent hover:border-black rounded hover:bg-slate-100 transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t-2 border-black px-6 py-6 space-y-4 shadow-xl">
          {["Home", "Schedule", "Prizes", "FAQ"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="block text-xl font-bold text-slate-900 hover:text-blue-600 transition"
            >
              {item}
            </Link>
          ))}
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-blue-600 text-white px-4 py-3 mt-4 rounded-lg font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Register Now
          </Link>
        </div>
      )}
    </nav>
  );
}