import { Trophy, Star, Award, Gift, Sparkles, Zap } from "lucide-react";

export default function Prizes() {
  return (
    <div className="bg-[#F3F4F6] text-slate-900 min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-black fill-yellow-400" />
            <h1 className="text-5xl md:text-6xl font-black">
              Prizes & Rewards
            </h1>
          </div>
          <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto">
            Compete for amazing rewards, tech gear, and recognition. 
          </p>
        </div>

        {/* Main Prize Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-end">
          
          {/* 2nd Place */}
          <div className="relative group order-2 md:order-1">
            <div className="relative p-8 bg-gray-100 border-2 border-black rounded-3xl hover:-translate-y-2 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-300 text-black border-2 border-black px-6 py-2 rounded-lg text-sm font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                🥈 SILVER
              </div>
              
              <div className="mt-6 text-center">
                <Star className="w-16 h-16 text-black fill-gray-300 mx-auto mb-4" />
                <h2 className="text-3xl font-black mb-4">2nd Place</h2>
                
                <div className="space-y-3 text-left bg-white p-4 rounded-xl border-2 border-black">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <p className="font-bold text-slate-700">Prizes Not Decided Yet</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <p className="font-bold text-slate-700">Prizes Not Decided Yet</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <p className="font-bold text-slate-700">Swag</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 1st Place - Featured */}
          <div className="relative group order-1 md:order-2">
            <div className="relative p-8 bg-yellow-100 border-2 border-black rounded-3xl hover:-translate-y-2 transition-all duration-300 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] z-10">
              {/* Crown badge */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black border-2 border-black px-8 py-3 rounded-lg text-lg font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-2">
                🏆 CHAMPION
              </div>
              
              <div className="mt-8 text-center">
                <Trophy className="w-20 h-20 text-black fill-yellow-400 mx-auto mb-6 animate-bounce" />
                <h2 className="text-4xl font-black mb-6">1st Place</h2>
                
                <div className="space-y-4 text-left bg-white p-6 rounded-xl border-2 border-black">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0 fill-yellow-300" />
                    <p className="font-bold text-xl text-slate-900">Prizes Not Decided Yet</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                    <p className="font-bold text-slate-700">Prizes Not Decided Yet</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                    <p className="font-bold text-slate-700">Swag</p>
                  </div>
                   <div className="flex items-start gap-3">
                    <Sparkles className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                    <p className="font-bold text-slate-700">Gemini Themed Prizes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="relative group order-3">
            <div className="relative p-8 bg-orange-100 border-2 border-black rounded-3xl hover:-translate-y-2 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-orange-300 text-black border-2 border-black px-6 py-2 rounded-lg text-sm font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                🥉 BRONZE
              </div>
              
              <div className="mt-6 text-center">
                <Award className="w-16 h-16 text-black fill-orange-300 mx-auto mb-4" />
                <h2 className="text-3xl font-black mb-4">3rd Place</h2>
                
                <div className="space-y-3 text-left bg-white p-4 rounded-xl border-2 border-black">
                  <div className="flex items-start gap-3">
                    <Gift className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <p className="font-bold text-slate-700">Prizes Not Decided Yet</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Gift className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <p className="font-bold text-slate-700">Prizes Not Decided Yet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Additional Info Section */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-600 text-white border-2 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            <Sparkles className="w-8 h-8 text-yellow-300 fill-yellow-300 mx-auto mb-4" />
            <h3 className="text-3xl font-black mb-4">
              Everyone's a Winner!
            </h3>
            <p className="text-blue-100 text-lg leading-relaxed font-bold">
              All participants receive <span className="text-yellow-300 underline decoration-wavy">exclusive CyberWave swag</span>, 
              free food, networking opportunities, and the experience of building something amazing.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}