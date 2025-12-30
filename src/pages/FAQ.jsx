import { ChevronDown, HelpCircle, Zap } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  const faqs = [
    {
      q: "What is CyberWave Hackathon?",
      a: "CyberWave is a 12-hour hackathon where students collaborate to build innovative projects using technology.",
      color: "cyan"
    },
    {
      q: "Do I need prior experience?",
      a: "No! Beginners are absolutely welcome. We will have mentors and workshops to help you build your first project.",
      color: "purple"
    },
    {
      q: "Is the event free?",
      a: "Yes, completely free! We provide all resources, food, and workspace at no cost.",
      color: "blue"
    },
    {
      q: "What should I bring?",
      a: "Bring your laptop, charger, and anything else you need to code comfortably.",
      color: "cyan"
    },
    {
      q: "Can I register without a team?",
      a: "Yes — you can register solo and form a team at the event during team formation time.",
      color: "purple"
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      cyan:  "bg-cyan-100 hover:bg-cyan-200",
      purple: "bg-purple-100 hover:bg-purple-200",
      blue:   "bg-blue-100 hover:bg-blue-200"
    };
    return colors[color];
  };

  return (
    <div className="bg-[#F3F4F6] text-slate-900 min-h-screen pt-32 px-6 pb-20 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Frequently Asked <span className="text-blue-600 underline decoration-wavy decoration-4 underline-offset-4">Questions</span>
          </h1>
          <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto">
            Got questions? We've got answers! Everything you need to know about CyberWave.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          {faqs.map((item, i) => {
            const bgClass = getColorClasses(item.color);
            const isOpen = open === i;
            
            return (
              <div
                key={i}
                className={`${bgClass} border-2 border-black rounded-xl overflow-hidden transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${isOpen ? 'translate-x-[2px] translate-y-[2px] shadow-none' : 'hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'}`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center text-left p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white border-2 border-black p-2 rounded-lg">
                        <Zap className={`w-6 h-6 text-black ${isOpen ? 'fill-yellow-400' : ''}`} />
                    </div>
                    <span className="text-xl font-bold text-slate-900">
                      {item.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-8 h-8 text-black transition-transform duration-300 border-2 border-black rounded bg-white ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pl-[5.5rem]">
                    <p className="text-slate-800 text-lg font-medium leading-relaxed border-l-4 border-black pl-4">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white border-2 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <HelpCircle className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-black mb-2">
              Still have questions?
            </h3>
            <p className="text-slate-600 mb-6 font-medium">
              Join our GroupMe community or reach out to us directly.
            </p>
            <a
              href="https://groupme.com/join_group/111216602/MUbueXZ3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-yellow-300 text-black border-2 border-black rounded-xl font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Join Our Community
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}