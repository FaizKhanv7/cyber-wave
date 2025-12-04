import { Clock, Calendar, Zap, Coffee, Users, Code, Presentation, Award, Utensils, Moon, Podcast } from "lucide-react";

export default function Schedule() {
  const schedule = [
    { time: "8:00 AM", event: "Check-in & Breakfast", icon: Coffee, color: "cyan" },
    { time: "9:00 AM", event: "Opening Ceremony", icon: Zap, color: "purple" },
    { time: "9:30 AM", event: "Team Formation / Icebreakers", icon: Users, color: "blue" },
    { time: "9:45 AM", event: "Hacking Begins", icon: Code, color: "cyan" },
    { time: "1:00 PM", event: "Lunch Served", icon: Utensils, color: "purple" },
    { time: "3:00 PM", event: "Technical Workshop", icon: Code, color: "blue" },
    { time: "4:00 PM", event: "Guest Speaker", icon: Podcast, color: "blue" },
    { time: "6:30 PM", event: "Dinner", icon: Utensils, color: "cyan" },
    { time: "8:00 PM", event: "Awards & Closing Ceremony", icon: Award, color: "blue" },
  ];

  const getColorClasses = (color) => {
    const colors = {
      cyan: {
        bg: "from-cyan-900/30 to-cyan-800/20",
        border: "border-cyan-500/30 hover:border-cyan-500/50",
        dot: "bg-cyan-400",
        icon: "text-cyan-400",
        glow: "shadow-cyan-500/20"
      },
      purple: {
        bg: "from-purple-900/30 to-purple-800/20",
        border: "border-purple-500/30 hover:border-purple-500/50",
        dot: "bg-purple-400",
        icon: "text-purple-400",
        glow: "shadow-purple-500/20"
      },
      blue: {
        bg: "from-blue-900/30 to-blue-800/20",
        border: "border-blue-500/30 hover:border-blue-500/50",
        dot: "bg-blue-400",
        icon: "text-blue-400",
        glow: "shadow-blue-500/20"
      }
    };
    return colors[color];
  };

  return (
    <div className="bg-black text-white min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-5xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-10 h-10 text-cyan-400" />
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Event Schedule
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            What's CyberWave GameJam '26 looking like?
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500 opacity-30" />

          <div className="space-y-6">
            {schedule.map((item, i) => {
              const Icon = item.icon;
              const colors = getColorClasses(item.color);
              
              return (
                <div 
                  key={i} 
                  className={`relative pl-20 group`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-6 top-6 w-5 h-5 ${colors.dot} rounded-full shadow-lg ${colors.glow} transform group-hover:scale-125 transition-transform duration-300`}>
                    <div className={`absolute inset-0 ${colors.dot} rounded-full animate-ping opacity-75`} />
                  </div>

                  {/* Event Card */}
                  <div className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-2xl p-6 transition-all duration-300 hover:translate-x-2 shadow-lg ${colors.glow}`}>
                    <div className="flex items-start gap-4">
                      <div className={`${colors.icon} mt-1 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className={`w-4 h-4 ${colors.icon}`} />
                          <h3 className="text-xl font-bold text-white">{item.time}</h3>
                        </div>
                        <p className="text-gray-300 text-lg">{item.event}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm">
            <p className="text-gray-300 mb-4 text-lg">
              <span className="text-cyan-400 font-semibold">Pro Tip:</span> Arrive early to get settled, meet other participants, and fuel up for an amazing day of building!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}