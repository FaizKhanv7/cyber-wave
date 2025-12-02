import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-yellow-500/20 bg-black/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/Logo.png" 
              alt="CyberWave Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              CyberWave
            </span>
          </Link>

          {/* Menu */}
          <div className="hidden md:flex gap-8 text-sm">
            <Link to="/schedule" className="hover:text-yellow-400 transition-colors">Schedule</Link>
            <Link to="/prizes" className="hover:text-yellow-400 transition-colors">Prizes</Link>
            <Link to="/faq" className="hover:text-yellow-400 transition-colors">FAQ</Link>
          </div>

          {/* CTA */}
            <Link 
            to="/register"
            className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
            Register
            </Link>
        </div>
      </div>
    </nav>
  );
}
