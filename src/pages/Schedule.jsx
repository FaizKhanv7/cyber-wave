import { Clock, Calendar, Zap } from "lucide-react";

export default function Schedule() {
  const schedule = [
    { time: "9:00 AM", event: "Check-in & Breakfast" },
    { time: "10:00 AM", event: "Opening Ceremony" },
    { time: "10:30 AM", event: "Team Formation / Icebreakers" },
    { time: "11:00 AM", event: "Hacking Begins" },
    { time: "1:00 PM", event: "Lunch Served" },
    { time: "4:00 PM", event: "Technical Workshop" },
    { time: "7:00 PM", event: "Dinner & Social Activity" },
    { time: "11:00 PM", event: "Midnight Snack" },
    { time: "8:00 AM", event: "Breakfast" },
    { time: "10:00 AM", event: "Hacking Ends" },
    { time: "10:30 AM", event: "Project Presentations" },
    { time: "12:00 PM", event: "Awards & Closing Ceremony" },
  ];

  return (
    <div className="bg-black text-white min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-10">Event Schedule</h1>
        <p className="text-center text-gray-300 mb-16 text-lg">
          A full 12 hours of innovation, teamwork, and fun.
        </p>

        {/* Timeline */}
        <div className="relative border-l border-white/20 pl-8 space-y-12">
          {schedule.map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-4 top-1 w-3 h-3 bg-yellow-400 rounded-full" />

              <h3 className="text-xl font-semibold">{item.time}</h3>
              <p className="text-gray-300">{item.event}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
