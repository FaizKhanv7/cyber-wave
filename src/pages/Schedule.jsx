import { Clock, Calendar, Zap, Coffee, Users, Code, Presentation, Award, Utensils, Moon, Podcast } from "lucide-react";

export default function Schedule() {
  const schedule = [
    { time: "8:00 AM", event: "Check-in", icon: Coffee, color: "orange" },
    { time: "9:00 AM", event: "Opening Ceremony", icon: Zap, color: "purple" },
    { time: "9:30 AM", event: "Team Formation", icon: Users, color: "blue" },
    { time: "9:45 AM", event: "Hacking Begins", icon: Code, color: "green" },
    { time: "1:00 PM", event: "Lunch Served", icon: Utensils, color: "orange" },
    { time: "3:00 PM", event: "Technical Workshop", icon: Code, color: "blue" },
    { time: "4:00 PM", event: "Guest Speaker", icon: Podcast, color: "blue" },
    { time: "6:30 PM", event: "Dinner", icon: Utensils, color: "orange" },
    { time: "8:00 PM", event: "Awards & Closing", icon: Award, color: "purple" },
  ];

  const getColorClasses = (color) => {
    const colors = {
      orange: { bg: "bg-orange-100", border: "border-black", iconBg: "bg-orange-400" },
      purple: { bg: "bg-purple-100", border: "border-black", iconBg: "bg-purple-400" },
      blue:   { bg: "bg-blue-100",   border: "border-black", iconBg: "bg-blue-400" },
      green:  { bg: "bg-green-100",  border: "border-black", iconBg: "bg-green-400" },
    };
    return colors[color];
  };

  return (
    <div className="bg-[#F3F4F6] text-slate-900 min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-4xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-10 h-10 text-black" />
            <h1 className="text-5xl md:text-6xl font-black">
              Event Schedule
            </h1>
          </div>
          <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto">
            What's CyberWave Hackday '26 looking like?
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-9 top-0 bottom-0 w-1 bg-slate-300 border-l-2 border-r-2 border-black" />

          <div className="space-y-8">
            {schedule.map((item, i) => {
              const Icon = item.icon;
              const colors = getColorClasses(item.color);
              
              return (
                <div key={i} className="relative pl-24 group">
                  
                  {/* Timeline Dot/Icon */}
                  <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-20 h-20 flex items-center justify-center z-10`}>
                     <div className={`w-14 h-14 ${colors.iconBg} border-2 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                     </div>
                  </div>

                  {/* Event Card */}
                  <div className={`${colors.bg} border-2 border-black rounded-2xl p-6 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                    <div>
                        <h3 className="text-2xl font-black text-slate-900">{item.event}</h3>
                    </div>
                    <div className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-lg shadow-sm">
                      <Clock className="w-5 h-5 text-slate-900" />
                      <span className="text-lg font-bold text-slate-900">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white border-2 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1 hover:rotate-0 transition-transform">
            <p className="text-slate-700 text-lg font-bold">
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded border border-black mr-2">Pro Tip:</span> 
              Arrive early to get settled, meet other participants, and fuel up!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}