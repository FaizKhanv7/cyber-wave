import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  const faqs = [
    {
      q: "What is CyberWave Hackathon?",
      a: "CyberWave is a 12-hour hackathon where students collaborate to build innovative projects using technology."
    },
    {
      q: "Do I need prior experience?",
      a: "No! Beginners are absolutely welcome. We will have mentors and workshops to help you build your first project."
    },
    {
      q: "Is the event free?",
      a: "Yes, completely free! We provide all resources, food, and workspace at no cost."
    },
    {
      q: "What should I bring?",
      a: "Bring your laptop, charger, and anything else you need to code comfortably."
    },
    {
      q: "Can I register without a team?",
      a: "Yes — you can register solo and form a team at the event during team formation time."
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">Frequently Asked Questions</h1>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="border border-white/10 rounded-xl p-4 bg-white/5 hover:bg-white/10 transition"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-lg font-semibold">{item.q}</span>
                <ChevronDown
                  className={`w-6 h-6 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === i && (
                <p classname="text-gray-300 mt-3">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
