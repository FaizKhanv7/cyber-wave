import { ExternalLink, Users, FileText, MessageSquare, Zap } from "lucide-react";

export default function Register() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6 pb-20">
      <div className="max-w-5xl mx-auto">

        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Register for CyberWave
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Join us for an incredible hackathon experience! Sign up below and get access to all the resources you need.
          </p>
        </div>

        {/* Main Registration Card */}
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-3xl p-10 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 shadow-2xl mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-cyan-400" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Registration Form
            </h2>
          </div>

          <p className="text-gray-300 text-center mb-8">
            Ready to build something amazing? Fill out our registration form to secure your spot!
          </p>

          <div className="text-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdGxYpSTpwWl4wgCWb2XkZN0uPAa1IFLmcA6vRGWzAvTQlFLA/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 text-white rounded-xl text-lg font-bold shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
            >
              Open Registration Form
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Additional Resources Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Important Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* GroupMe Link */}
            <a
              href="https://groupme.com/join_group/111216602/MUbueXZ3"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-2xl hover:border-cyan-500/50 hover:bg-cyan-900/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-cyan-300">GroupMe</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Join our community chat to connect with other participants and get updates.
              </p>
              <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm font-semibold">
                Join Now
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>

            {/* Team Formation Guide */}
            <a
              href="#"
              className="p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl hover:border-purple-500/50 hover:bg-purple-900/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-purple-300">Team Guide</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Learn how to form teams, find teammates, and collaborate effectively.
              </p>
              <div className="mt-4 flex items-center gap-2 text-purple-400 text-sm font-semibold">
                View Guide
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>

            {/* Permission Form */}
            <a
              href="#"
              className="p-6 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/30 rounded-2xl hover:border-blue-500/50 hover:bg-blue-900/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-blue-300">Permission Form</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Parent/Guardian consent form required for participants under 18.
              </p>
              <div className="mt-4 flex items-center gap-2 text-blue-400 text-sm font-semibold">
                Download Form
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>

          </div>
        </div>

        {/* Additional Info */}
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-gray-300 text-center text-sm">
            <span className="text-cyan-400 font-semibold">Need help?</span> If you have any questions about registration or the event, 
            feel free to reach out through our GroupMe or contact us directly at: <span className="text-cyan-400 font-semibold">cyberwavehackathon@gmail.com</span>
          </p>
        </div>

      </div>
    </div>
  );
}