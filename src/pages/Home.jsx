import { Link } from "react-router-dom";
import { Zap, Calendar, MapPin, Users, Code, Trophy, ArrowRight, Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Changing the world, one line of code at a time.";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-900 font-sans selection:bg-blue-300 selection:text-blue-900">
      

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Graph Paper Background */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ 
          backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `, 
          backgroundSize: '40px 40px' 
        }}></div>
        {/* Accent lines for graph paper effect */}
        <div className="absolute inset-0 opacity-[0.25]" style={{ 
          backgroundImage: `
            linear-gradient(to right, #1e40af 2px, transparent 2px),
            linear-gradient(to bottom, #1e40af 2px, transparent 2px)
          `, 
          backgroundSize: '200px 200px' 
        }}></div>
        
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[0.9]">
            Ride the <br />
            <span className="text-blue-600 text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-cyan-500" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.1)' }}>
              CyberWave
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed min-h-[4rem]">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-blue-600 text-white text-xl font-black rounded-xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 group"
            >
              Start Building
            </Link>
            
          </div>
        </div>
      </section>

      {/* CARDS SECTION (Modeled after Screenshot) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center md:text-left">
            What we do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#FFEFD5] rounded-xl border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1">
              <div className="bg-orange-400 w-12 h-12 rounded-lg border-2 border-black flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Users className="text-white w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black mb-2">Community First</h3>
              <p className="text-slate-700 font-medium">
                We're a growing network of builders. Find your team, find your mentor, or just find new friends.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#E0F2FE] rounded-xl border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1">
               <div className="bg-blue-500 w-12 h-12 rounded-lg border-2 border-black flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Code className="text-white w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black mb-2">Hands-on Code</h3>
              <p className="text-slate-700 font-medium">
                No boring lectures. We host workshops, game jams, and build sessions where you actually ship code.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F3E8FF] rounded-xl border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1">
               <div className="bg-purple-500 w-12 h-12 rounded-lg border-2 border-black flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Trophy className="text-white w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black mb-2">Epic Hackathons</h3>
              <p className="text-slate-700 font-medium">
                Compete for prizes, eat free pizza, and build a project from scratch in 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED EVENT (Ticket Style) */}
      <section className="py-24 px-6 bg-[#F3F4F6]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-2 border-black rounded-3xl p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(37,99,235,1)] relative overflow-hidden">
            
            <div className="absolute top-0 right-0 bg-yellow-300 text-black font-black px-6 py-2 border-l-2 border-b-2 border-black transform translate-x-4 -translate-y-2 rotate-2">
              UPCOMING
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-blue-600 mb-4">
                  GameJam 2026
                </h2>
                <div className="space-y-3 text-lg font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-black" /> Jan 31st, 2026
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-black" /> Georgia Tech, Atlanta, GA
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-black" /> Awsome Prizes
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto">
                 <Link
                  to="/register"
                  className="block w-full text-center px-8 py-4 bg-black text-white text-xl font-bold rounded-xl border-2 border-black hover:bg-slate-800 transition-all shadow-[4px_4px_0px_0px_rgba(100,100,100,1)]"
                >
                  Register Now <ArrowRight className="inline ml-2" />
                </Link>
                <p className="text-center mt-3 text-sm font-bold text-slate-500">
                  Limited spots available!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-12 border-t-4 border-blue-600">
        <div className="max-w-6xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-2xl font-black italic mb-2">CYBERWAVE_</h3>
            <p className="text-gray-400">© {new Date().getFullYear()} CyberWave Organization.</p>
          </div>
          <div className="mt-8 md:mt-0 flex flex-col items-center md:items-end">
            <p className="flex items-center gap-2 font-medium">
              Made by Faiz K
            </p>
            <p className="text-sm text-gray-500 mt-2">Go build something awesome.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}