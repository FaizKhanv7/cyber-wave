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
      cyan: {
        border: "border-cyan-500/30 hover:border-cyan-500/60",
        bg: "from-cyan-900/20 to-cyan-800/10",
        icon: "text-cyan-400",
        activeBg: "bg-cyan-500/10"
      },
      purple: {
        border: "border-purple-500/30 hover:border-purple-500/60",
        bg: "from-purple-900/20 to-purple-800/10",
        icon: "text-purple-400",
        activeBg: "bg-purple-500/10"
      },
      blue: {
        border: "border-blue-500/30 hover:border-blue-500/60",
        bg: "from-blue-900/20 to-blue-800/10",
        icon: "text-blue-400",
        activeBg: "bg-blue-500/10"
      }
    };
    return colors[color];
  };

  return (
    <div className="bg-black text-white min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Got questions? We've got answers! Find everything you need to know about CyberWave.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((item, i) => {
            const colors = getColorClasses(item.color);
            const isOpen = open === i;
            
            return (
              <div
                key={i}
                className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg ${isOpen ? colors.activeBg : ''}`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center text-left p-6 group"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <Zap className={`w-6 h-6 ${colors.icon} mt-1 flex-shrink-0 ${isOpen ? 'animate-pulse' : ''}`} />
                    <span className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {item.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 ${colors.icon} transition-transform duration-300 flex-shrink-0 ml-4 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 animate-in">
                    <div className="pl-10 pt-2">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm">
            <HelpCircle className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-4">
              Join our GroupMe community or reach out to us directly. We're here to help!
            </p>
            <a
              href="https://groupme.com/join_group/111216602/MUbueXZ3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 text-white rounded-xl font-semibold"
            >
              Join Our Community
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}