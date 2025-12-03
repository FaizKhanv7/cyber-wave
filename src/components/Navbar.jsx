import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-cyan-500/20 bg-black/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/Logo.png"
            alt="CyberWave Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
            CyberWave
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm items-center">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <Link to="/schedule" className="hover:text-cyan-400 transition-colors">Schedule</Link>
          <Link to="/prizes" className="hover:text-cyan-400 transition-colors">Prizes</Link>
          <Link to="/faq" className="hover:text-cyan-400 transition-colors">FAQ</Link>
        </div>

        {/* CTA */}
        <Link
          to="/register"
          className="hidden md:block bg-cyan-500 text-black px-5 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition"
        >
          Register
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 border-t border-cyan-500/20 px-6 py-4 space-y-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-gray-200 hover:text-cyan-400 transition"
          >
            Home
          </Link>

          <Link
            to="/schedule"
            onClick={() => setIsOpen(false)}
            className="block text-gray-200 hover:text-cyan-400 transition"
          >
            Schedule
          </Link>

          <Link
            to="/prizes"
            onClick={() => setIsOpen(false)}
            className="block text-gray-200 hover:text-cyan-400 transition"
          >
            Prizes
          </Link>

          <Link
            to="/faq"
            onClick={() => setIsOpen(false)}
            className="block text-gray-200 hover:text-cyan-400 transition"
          >
            FAQ
          </Link>

          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="block bg-cyan-500 text-black px-4 py-2 mt-2 rounded-lg font-semibold hover:bg-cyan-400 transition"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
