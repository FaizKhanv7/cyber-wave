import { Link } from "react-router-dom";
import { Zap, Calendar, MapPin, Users, Code, Trophy } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">      

      {/* HERO SECTION */}
      <section className="pt-32 pb-32 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover opacity-20"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />

        <div className="relative max-w-5xl mx-auto text-center px-6">
          <h1 className="text-6xl font-extrabold mb-6 leading-tight">
            Build <span className="text-yellow-400">Something Amazing</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Join CyberWave Hackathon, a 12-hour coding event where creativity, skill,
            and teamwork collide to shape the future.
          </p>

        <Link 
        to="/register"
        className="bg-yellow-500 text-black px-6 py-3 rounded-xl text-lg font-semibold hover:bg-yellow-400 transition"
        >
        Register Now
        </Link>

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Why CyberWave?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition">
              <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
              <p className="text-gray-300">
                Work with passionate builders and launch ideas together.
              </p>
            </div>

            <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition">
              <Code className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Create</h3>
              <p className="text-gray-300">
                Build projects using any language, framework, or tool you love.
              </p>
            </div>

            <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compete</h3>
              <p className="text-gray-300">
                Win prizes, gain recognition, and show off your innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT INFO SECTION */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <Calendar className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
            <h4 className="text-xl font-semibold mb-1">Date</h4>
            <p className="text-gray-300">January 25–26, 2026</p>
          </div>

          <div>
            <MapPin className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
            <h4 className="text-xl font-semibold mb-1">Location</h4>
            <p className="text-gray-300">Cumming, GA</p>
          </div>

          <div>
            <Zap className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
            <h4 className="text-xl font-semibold mb-1">Duration</h4>
            <p className="text-gray-300">12 Hours</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-400">
        © {new Date().getFullYear()} CyberWave Hackathon. All rights reserved.
      </footer>
    </div>
  );
}
