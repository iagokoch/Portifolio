import Logo from "../assets/logo.svg";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 bg-black/80 backdrop-blur-sm border-b border-slate-800 z-50 cursor-pointer">
      <img src={Logo} alt="Logo" className="h-8" />
      <ul className="flex gap-8">
        <li className="text-slate-300 hover:text-blue-400 cursor-pointer transition-colors">
          Home
        </li>
        <li className="text-slate-300 hover:text-blue-400 cursor-pointer transition-colors">
          Projects
        </li>
        <li className="text-slate-300 hover:text-blue-400 cursor-pointer transition-colors">
          Skills
        </li>
        <li className="text-slate-300 hover:text-blue-400 cursor-pointer transition-colors">
          About
        </li>
        <li className="text-slate-300 hover:text-blue-400 cursor-pointer transition-colors">
          Contact
        </li>
      </ul>

      {/* toggle idioma */}
      <button className="text-slate-300 hover:text-blue-400 transition-colors border border-slate-700 px-3 py-1 rounded-full text-sm">
        PT | EN
      </button>
    </nav>
  );
}

export default Navbar;
