import { Link } from "react-router-dom";
import { Zap, Calendar, MapPin, Users, Code, Trophy, Waves, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [typewriterText, setTypewriterText] = useState("");
  const fullText = "Making the world a better place, one line of code at a time :)";

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Speed of typing (50ms per character)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">

      {/* HERO */}
      <section className="pt-32 pb-32 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover opacity-20"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />

        <div className="relative max-w-5xl mx-auto text-center px-6">
          <h1 className="text-6xl font-extrabold mb-6 leading-tight">
            Ride the <span className="text-cyan-400">CyberWave</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 h-8">
            {typewriterText}
            <span className="animate-pulse">|</span>
          </p>

          <Link
            to="/register"
            className="bg-cyan-500 text-black px-6 py-3 rounded-xl text-lg font-semibold hover:bg-cyan-400 transition"
          >
            Join the Next Event
          </Link>
        </div>
      </section>

      {/* WHAT IS CYBERWAVE */}
      <section className="py-24 bg-gradient-to-b from-black to-[#0a0a1a] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 text-cyan-300">What is CyberWave?</h2>

          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed mb-12">
            CyberWave is a student-led tech initiative dedicated to sparking creativity,
            building hands-on skills, and bringing people together through coding events,
            workshops, and hackathons. We believe every idea—wild, small, or world-changing—
            deserves a place to take shape.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 border border-cyan-500/20 rounded-2xl hover:bg-white/5 transition">
              <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-300">
                A growing network of passionate builders, designers, and innovators.
              </p>
            </div>

            <div className="p-8 border border-cyan-500/20 rounded-2xl hover:bg-white/5 transition">
              <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Learning</h3>
              <p className="text-gray-300">
                Hands-on workshops, mentorship, and opportunities to sharpen your craft.
              </p>
            </div>

            <div className="p-8 border border-cyan-500/20 rounded-2xl hover:bg-white/5 transition">
              <Waves className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Impact</h3>
              <p className="text-gray-300">
                Build projects that solve real problems and inspire others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING HACKATHON */}
      <section className="py-24 border-t border-white/10 bg-black/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-purple-300">
            Upcoming Hackathon(s)
          </h2>

          {/* Box-style event card */}
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-3xl p-10 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-cyan-400" />
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                CyberWave GameJam 2026
              </h3>
            </div>

            <div className="space-y-4 text-left max-w-2xl mx-auto">
              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <Calendar className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-cyan-300 mb-1">Date</h4>
                  <p className="text-gray-300">January 24th, 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <MapPin className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-1">Location</h4>
                  <p className="text-gray-300">Cumming, GA</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <Zap className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-blue-300 mb-1">Duration</h4>
                  <p className="text-gray-300">12 Hours of non-stop building</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                <Trophy className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-yellow-300 mb-1">Prizes</h4>
                  <p className="text-gray-300">Amazing prizes for top teams + swag for all participants!</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/register"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 transition-all duration-300 text-white rounded-xl text-lg font-bold shadow-lg hover:shadow-purple-500/50 transform hover:scale-105"
              >
                Register Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CYBERWAVE */}
      <section className="py-24 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-blue-300">Why Join?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 border border-blue-400/20 rounded-2xl hover:bg-white/5 transition">
              <Users className="w-12 h-12 text-cyan-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
              <p className="text-gray-300">
                Work with passionate builders and launch ideas together.
              </p>
            </div>

            <div className="p-8 border border-blue-400/20 rounded-2xl hover:bg-white/5 transition">
              <Code className="w-12 h-12 text-cyan-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Create</h3>
              <p className="text-gray-300">
                Build projects using any language, framework, or tool you love.
              </p>
            </div>

            <div className="p-8 border border-blue-400/20 rounded-2xl hover:bg-white/5 transition">
              <Trophy className="w-12 h-12 text-cyan-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compete</h3>
              <p className="text-gray-300">
                Win prizes, gain recognition, and show off your innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-400 space-y-2">
        <p>© {new Date().getFullYear()} CyberWave. All rights reserved.</p>
        <p className="text-gray-500">Website made with no sleep by Faiz K 😴</p>
      </footer>
    </div>
  );
}