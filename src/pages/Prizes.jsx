import { Trophy, Star, Award, Gift, Sparkles, Zap } from "lucide-react";

export default function Prizes() {
  return (
    <div className="bg-black text-white min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-yellow-400" />
            <h1 className="text-5xl font-extrabold text-white">
              Prizes & Rewards
            </h1>
            <Trophy className="w-10 h-10 text-yellow-400" />
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Compete for amazing rewards, tech gear, and recognition. Every team has a chance to win!
          </p>
        </div>

        {/* Main Prize Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* 1st Place - Featured */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-300" />
            
            <div className="relative p-8 bg-gradient-to-br from-yellow-900/40 to-orange-900/30 border-2 border-yellow-400/50 rounded-3xl hover:scale-105 transition-all duration-300 shadow-2xl">
              {/* Crown badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                🏆 CHAMPION
              </div>
              
              <div className="mt-6">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">1st Place</h2>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-200">
                      <span className="font-bold text-yellow-300">$500</span> cash prize
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-200">Certificate of achievement</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-200">Premium HackClub Swag</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-200">More Prizes Provided By MLH</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2nd Place */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-300" />
            
            <div className="relative p-8 bg-gradient-to-br from-gray-700/30 to-gray-800/30 border-2 border-gray-400/40 rounded-3xl hover:scale-105 transition-all duration-300 shadow-2xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-300 to-gray-400 text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                🥈 SILVER
              </div>
              
              <div className="mt-6">
                <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4 text-gray-300">2nd Place</h2>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-200">
                      <span className="font-bold text-gray-300">$250</span> cash prize
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-200">Certificate of achievement</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-200">Premium HackClub swag</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-orange-700 to-orange-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-300" />
            
            <div className="relative p-8 bg-gradient-to-br from-orange-900/30 to-orange-800/20 border-2 border-orange-600/40 rounded-3xl hover:scale-105 transition-all duration-300 shadow-2xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-black px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                🥉 BRONZE
              </div>
              
              <div className="mt-6">
                <Award className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4 text-orange-400">3rd Place</h2>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <Gift className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-200">
                      <span className="font-bold text-orange-300">$100</span> cash prize
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Gift className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-200">Certificate of achievement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Additional Info Section */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-3xl p-8 backdrop-blur-sm text-center">
            <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
              Everyone's a Winner!
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              All participants receive <span className="text-cyan-400 font-semibold">exclusive CyberWave swag</span>, 
              free food, networking opportunities, and the experience of building something amazing. 
              Plus, there may be special category awards announced at the event! 🎉
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}