import { ExternalLink, MessageSquare } from "lucide-react";

export default function Register() {
  return (
    <div className="relative min-h-screen bg-[#F3F4F6] text-slate-900 pt-32 px-6 pb-20 overflow-hidden">
      
      {/* Graph Paper Background */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Accent Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1e40af 2px, transparent 2px),
            linear-gradient(to bottom, #1e40af 2px, transparent 2px)
          `,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Page Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black mb-4 tracking-tight">
            Register for <span className="text-blue-600">CyberWave</span>
          </h1>
          <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto">
            Join us for an incredible hackathon experience! Sign up for our next event below.
          </p>
        </div>

        {/* Registration Card */}
        <div className="max-w-3xl mx-auto bg-white border-2 border-black rounded-3xl p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-16 relative">
          <div className="absolute -top-6 -right-6 bg-yellow-300 border-2 border-black px-4 py-2 rounded-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-12">
            🚀 SPOTS FILLING FAST!
          </div>

          <h2 className="text-4xl font-black text-center mb-6">
            Registration Form
          </h2>

          <p className="text-slate-600 text-center text-lg font-medium mb-8">
            Ready to build something amazing? Sign up for our event on MLH to secure your spot.
          </p>

          <div className="text-center">
            <a
              href="https://events.mlh.io/events/13457-cyberwave-atlanta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-5 bg-blue-600 text-white border-2 border-black rounded-xl text-xl font-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Open Registration Form
              <ExternalLink className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Resources Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-8">
            Important Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 justify-items-center">
            <a
              href="https://groupme.com/join_group/111216602/MUbueXZ3"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-sm p-6 bg-blue-100 border-2 border-black rounded-2xl hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500 border-2 border-black p-2 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black">GroupMe</h3>
              </div>

              <p className="text-slate-700 font-bold text-sm">
                Join our community chat to connect with other participants.
              </p>

              <div className="mt-4 flex items-center gap-2 text-blue-600 text-sm font-black uppercase tracking-wide">
                Join Now <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>

        {/* Footer Info */}
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-slate-200 border-2 border-black rounded-2xl text-center">
          <p className="text-slate-700 font-bold">
            <span className="text-black font-black bg-yellow-300 px-1 border border-black mr-1">
              Need help?
            </span>
            Contact us at{" "}
            <a
              href="mailto:cyberwavehackathon@gmail.com"
              className="underline hover:text-blue-600"
            >
              cyberwavehackathon@gmail.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
