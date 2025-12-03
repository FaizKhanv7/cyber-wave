export default function Register() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6">
      <div className="max-w-4xl mx-auto text-center">

        {/* Title */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Register for CyberWave
        </h1>

        <p className="mt-4 text-gray-300 text-lg">
          Sign up below to participate! You’ll also find additional resources and important links.
        </p>

        {/* Google Form Button */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdGxYpSTpwWl4wgCWb2XkZN0uPAa1IFLmcA6vRGWzAvTQlFLA/viewform?usp=header"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 px-6 py-3 rounded-xl font-semibold
                     bg-gradient-to-r from-cyan-500 to-purple-500 text-black 
                     shadow-lg shadow-cyan-500/20 hover:opacity-90 transition"
        >
          Open Registration Form
        </a>

        {/* Additional Links */}
        <div className="mt-10 text-left space-y-4">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Additional Links
          </h2>

          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              <a 
                className="text-cyan-300 hover:text-cyan-200" 
                href="https://groupme.com/join_group/111216602/MUbueXZ3" 
                target="_blank"
              >
                GroupMe Join Link
              </a>
            </li>
            <li>
              <a 
                className="text-cyan-300 hover:text-cyan-200" 
                href="#"
              >
                Team Formation Guide
              </a>
            </li>
            <li>
              <a 
                className="text-cyan-300 hover:text-cyan-200" 
                href="#"
              >
                Parent/Guardian Permission Form
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
