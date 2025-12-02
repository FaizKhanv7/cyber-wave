import { Trophy, Star, Award } from "lucide-react";

export default function Prizes() {
  return (
    <div className="bg-black text-white min-h-screen pt-32 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-10">Prizes</h1>
        <p className="text-gray-300 mb-16 text-lg">
          Compete for amazing rewards, tech gear, and recognition.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 1st Place */}
          <div className="p-8 border border-yellow-400/50 bg-yellow-400/10 rounded-3xl shadow-xl hover:scale-[1.02] transition">
            <Trophy className="w-14 h-14 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">1st Place</h2>
            <p className="text-gray-300">
              $500 cash prize, custom trophy, premium tech gear bundle, and exclusive winner badges.
            </p>
          </div>

          {/* 2nd Place */}
          <div className="p-8 border border-white/10 bg-white/5 rounded-3xl shadow-xl hover:scale-[1.02] transition">
            <Star className="w-14 h-14 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">2nd Place</h2>
            <p className="text-gray-300">
              $250 cash prize, high-value peripherals, and silver-tier recognition badges.
            </p>
          </div>

          {/* 3rd Place */}
          <div className="p-8 border border-white/10 bg-white/5 rounded-3xl shadow-xl hover:scale-[1.02] transition">
            <Award className="w-14 h-14 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">3rd Place</h2>
            <p className="text-gray-300">
              $100 cash prize, mechanical keyboard, and bronze recognition badges.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
